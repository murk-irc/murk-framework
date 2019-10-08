import EventEmitter from 'events';
import tls from 'tls';
import net from 'net';
import util from 'util';

import ircMessage, { IRCMessage } from 'irc-message';

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
	socket: net.Socket | tls.TLSSocket;
	/**
	 * @param {ClientOptions} options IRC client options
	 */
	constructor(options: ClientOptions) {
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
			.on('data', (parsed: IRCMessage) => {
				this.emit('message', parsed);
			});

	}

	/**
	 * @param  {Buffer|string} Data to write to socket
	 * @param  {string} Data encoding, defaults to UTF-8
	 * @return {Promise}
	 *
	 * @async
	 * @example
	 * socket.write('NICK happylittlecat');
	 */
	async write(data: Buffer | string, encoding = 'utf8') {
		console.log(`sending ${data}`);
		// Let's promisify some things
		const socketWrite = util.promisify<string | Buffer, string>(this.socket.write);
		return socketWrite(data, encoding);
	}
}


export default IRCSocket;