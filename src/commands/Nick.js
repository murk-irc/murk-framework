const Command = require('./Command');

/**
 * NICK command is used to change nickname.
 *
 * @public
 * @example
 * client.send(new Commands.Nick('somedude'))
 */
class Nick extends Command {
	/**
	 * @param  {string} nick Nickname to be set
	 * @public
	 *
	 * @throws {TypeError} If passed invalid command parameters
	 */
	constructor(nick) {
		super();

		if (!nick || typeof nick !== 'string')
			throw new TypeError('Nick must be a valid string');

		this.nick = nick;
	}

	/**
	 * @returns {string}
	 * @public
	 */
	toString() {
		return `NICK ${this.nick}`;
	}
}

module.exports = Nick;