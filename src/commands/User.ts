import Command from './Command';

/**
 * USER command is used during connection initialization.
 *
 * @public
 * @example
 * client.send(new Commands.User('somedude', 'someREALdude'))
 */
class User extends Command {
	username: string;
	realname: string;
	/**
	 * @param  {string} username Username to be set
	 * @param  {string} realname Real name to be set
	 * @public
	 *
	 * @throws {TypeError} If passed invalid command parameters
	 */
	constructor(username: string, realname: string) {
		super();

		if (!username || typeof username !== 'string')
			throw new TypeError('Username must be a valid string');

		if (!realname || typeof realname !== 'string')
			throw new TypeError('Username must be a valid string');

		this.username = username;
		this.realname = realname;
	}

	/**
	 * @return {string}
	 * @public
	 */
	toString(): string {
		return `USER ${this.username} 0 * :${this.realname}`;
	}
}

export default User;