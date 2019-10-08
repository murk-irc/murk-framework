import Client from '../Client';
import IRCSocket from '../IRCSocket';

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
	 * @return {string} String to be sent to server
	 */
	toString() {
		return null;
	}

	/**
	 * @param  {Client|IRCSocket} pipe The client or socket to send the command to
	 * @return {Promise}
	 * @throws {TypeError} If invalid pipe is provided
	 *
	 * @async
	 * @example
	 * const nick = new Commands.Nick('happylittlecat');
	 * nick.sendTo(client);
	 */
	sendTo(pipe) {
		if (pipe instanceof Client) {
			pipe.send(this.toString());
		} else if (pipe instanceof IRCSocket) {
			pipe.write(`${this.toString()}\r\n`);
		} else {
			throw new TypeError('Invalid parameter passed to Command#sendTo');
		}
	}
}

export default Command;
