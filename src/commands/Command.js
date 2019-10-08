const Client = require('../Client');
const IRCSocket = require('../IRCSocket');

/**
 * Represents a valid IRC command that can be sent.
 * This class may not be used directly, but rather
 * through implementations of it.
 *
 * @protected
 */
class Command {
	/**
	 * Compiles a valid IRC string that can be directly send to
	 * server. \r\n is NOT appended though.
	 *
	 * @abstract
	 * @returns {string} String to be sent to server
	 */
	toString() {
		return null;
	}

	/**
	 * @param  {Client|IRCSocket} pipe The client or socket to send the command to
	 * @returns {Promise}
	 * @throws {TypeError} If invalid pipe is provided
	 *
	 * @async
	 * @example
	 * const nick = new Commands.Nick('happylittlecat');
	 * nick.sendTo(client);
	 */
	sendTo(pipe) {
		if (pipe instanceof Client) {
			return pipe.send(this.toString());
		} else if (pipe instanceof IRCSocket) {
			return pipe.write(`${this.toString()}\r\n`);
		} else {
			throw new TypeError('Invalid parameter passed to Command#sendTo');
		}
	}
}

module.exports = Command;
