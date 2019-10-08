const Command = require('./Command');

/**
 * USER command is used during connection initialization.
 *
 * @public
 * @example
 * client.send(new Commands.User('somedude', 'someREALdude'))
 */
class User extends Command {
	/**
	 * @param  {string} username Username to be set
	 * @param  {string} realname Real name to be set
	 * @public
	 *
	 * @throws {TypeError} If passed invalid command parameters
	 */
	constructor(username, realname) {
		super();

		if (!username || typeof username !== 'string')
			throw new TypeError('Username must be a valid string');

		if (!realname || typeof realname !== 'string')
			throw new TypeError('Username must be a valid string');

		this.username = username;
		this.realname = realname;
	}

	/**
	 * @returns {string}
	 * @public
	 */
	toString() {
		return `USER ${this.username} 0 * :${this.realname}`;
	}
}

module.exports = User;