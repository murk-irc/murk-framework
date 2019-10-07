const EventEmitter = require('events');
const IRCSocket = require('./IRCSocket');

const { validateOptions } = require('./helpers');

/**
 * Create and maintain an IRC connection.
 * Emits custom events and is the main
 * class used for working with this framework.
 *
 * @summary Framework entry-point
 *
 * @public
 *
 * @example
 * const MurkFramework = require('murk-framework');
 * const client = new MurkFramework.Client(options);
 *
 * @todo Document fired events.
 */
class Client extends EventEmitter {
	/**
	 * @param {ClientOptions} options IRC client options
	 */
	constructor(options) {
		super();

		const merged = {
			host: null,
			port: 6697,
			tls: true,

			nick: null,
			username: null,

			...options,
		};

		validateOptions(merged);

		this.options = merged;
		this.socket = null;

		this.connected = false;
		this.channels = [];
	}

	/**
	 * Create and connect a socket to IRC server
	 *
	 * @public
	 */
	connect() {
		this.socket = new IRCSocket({
			host: this.options.host,
			port: this.options.port,
			tls: this.options.tls,
		});

		this.socket.on('message', message => {
			this.emit('message', message);
		});
	}
}


module.exports = Client;