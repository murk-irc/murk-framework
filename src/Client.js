const EventEmitter = require('events');
const IRCSocket = require('./IRCSocket');

const helpers = require('./helpers');
const Commands = require('./commands');

/**
 * Create and maintain an IRC connection.
 * Emits custom events and is the main
 * class used for working with this framework.
 *
 * @summary Framework entry point
 *
 * @public
 *
 * @example
 * const MurkFramework = require('murk-framework');
 * const client = new MurkFramework.Client(options);
 *
 * @emits Client#receive
 */
class Client extends EventEmitter {
	/**
	 * @param {ClientOptions} options IRC client options
	 *
	 * @public
	 * @throws {TypeError} If invalid options are passed
	 */
	constructor(options) {
		super();

		if (!options || typeof options !== 'object')
			throw new TypeError('Invalid ClientOptions passed to Client constructor');

		const merged = {
			host: null,
			port: 6697,
			tls: true,

			nick: null,
			username: null,
			realname: null,

			...options,
		};

		if (!merged.realname)
			merged.realname = merged.username;

		helpers.validateOptions(merged);

		this.options = merged;
		this.socket = null;

		this.connected = false;
		this.channels = [];
	}

	/**
	 * Create and connect a socket to IRC server
	 *
	 * @public
	 * @throws {Error} If client is already connected
	 */
	connect() {
		if (this.socket && this.connected)
			throw new Error('Client is alredy connected');

		this.socket = new IRCSocket({
			host: this.options.host,
			port: this.options.port,
			tls: this.options.tls,
		});

		// Handle disconnections

		this.socket.on('disconnect', () => {
			this.emit('disconnect');
			this.connected = false;
			this.socket = null;
		});

		this.socket.on('timeout', () => {
			this.emit('socketTimeout');
			this.connected = false;
			this.socket = null;
		});

		this.socket.on('error', e => {
			this.emit('socketError', e);
			this.connected = false;
			this.socket = null;
		});

		// Handle other things

		this.socket.on('connect', () => {
			this.emit('connect');
			this.connected = true;

			this.send(new Commands.Nick(this.options.nick));
			this.send(new Commands.User(this.options.nick, this.options.realname));
		});

		this.socket.on('message', message => {
			this.emit('receive', message);
		});
	}

	/**
	 * Send string or command to IRC server.
	 * Strings are automatically appended by \r\n.
	 *
	 * @param  {string|Command} data Raw string or IRC command
	 * @return {Promise}
	 * @throws {Error} If sending while client is not connected.
	 *
	 * @public
	 * @async
	 * @example
	 * client.send('NICK happylittlecat');
	 * // or
	 * client.send(new Commands.Nick('happylittlecat'));
	 */
	send(data) {
		if (!this.socket)
			throw new Error('Client is not connected');

		return this.socket.write(`${data.toString()}\r\n`);
	}
}


module.exports = Client;