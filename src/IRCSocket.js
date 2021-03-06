const EventEmitter = require('events');
const tls = require('tls');
const net = require('net');

const ircMessage = require('irc-message');

/**
 * A wrapper class designed for sockets to IRC servers.
 * Internally it creates a TLS/SSL or a normal socket,
 * based on `options` and pipes output to `irc-message`.
 *
 * @protected
 * @see https://github.com/sigkell/irc-message
 *
 * @emits IRCSocket#connect
 * @emits IRCSocket#disconnect
 * @emits IRCSocket#timeout
 * @emits IRCSocket#error
 * @emits IRCSocket#message
 */
class IRCSocket extends EventEmitter {
	/**
	 * @param {ClientOptions} options IRC client options
	 */
	constructor(options) {
		super();

		if (options.tls) {
			this.socket = tls.connect({
				host: options.host,
				port: options.port,
			});
		} else {
			this.socket = new net.Socket();
			this.socket.connect(options.port, options.host);
		}

		this.socket.on('ready', () => {
			this.emit('connect');
		});

		this.socket.on('close', hadError => {
			if (!hadError)
				this.emit('disconnect');
		});

		this.socket.on('error', error => {
			this.emit('error', error);
		});

		this.socket.on('timeout', () => {
			this.emit('timeout');
		});

		this.socket
			.pipe(ircMessage.createStream())
			.on('data', parsed => {
				this.emit('message', parsed);
			});
	}
}


module.exports = IRCSocket;