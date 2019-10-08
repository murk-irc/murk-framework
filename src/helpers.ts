/**
 * @param {ClientOptions} options IRC client options.
 *
 * @protected
 * @throws {TypeError} If any of the options are invalid.
 */
function validateOptions(options: Partial<ClientOptions>) {
	if (!options.host)
		throw new TypeError('Host must be provided');
	if (!options.port)
		throw new TypeError('Port must be provided');
	/*if (typeof options.port !== 'number' || parseInt(options.port, 10) !== options.port)
		throw new TypeError('Invalid port');*/

	if (typeof options.tls !== 'boolean')
		throw new TypeError('TLS option can be either true or false');

	if (!options.nick)
		throw new TypeError('Nickname must be provided');
	if (typeof options.nick !== 'string')
		throw new TypeError('Nickname is invalid');

	if (!options.username)
		throw new TypeError('Username must be provided');
	if (typeof options.username !== 'string')
		throw new TypeError('Username is invalid');
}

export {
	validateOptions,
};
