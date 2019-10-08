import Command from './Command';

/**
 * NICK command is used to change nickname.
 *
 * @public
 * @example
 * client.send(new Commands.Nick('somedude'))
 */
class Nick extends Command {
	nick: string;
	/**
	 * @param  {string} nick Nickname to be set
	 * @public
	 *
	 * @throws {TypeError} If passed invalid command parameters
	 */
	constructor(nick: string) {
		super();

		if (!nick || typeof nick !== 'string')
			throw new TypeError('Nick must be a valid string');

		this.nick = nick;
	}

	/**
	 * @return {string}
	 * @public
	 */
	toString(): string {
		return `NICK ${this.nick}`;
	}
}

export default Nick;