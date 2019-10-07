/**
 * @typedef {object} ClientOptions
 * @property {object} options IRC client options
 * @property {string} options.host IRC server host
 * @property {number} options.port IRC server port
 * @property {nick} options.string Initial nickname
 * @property {username} options.string Initial username
 */

/**
 * @typedef {object} IRCMessage
 *
 * @property {string} raw Raw IRC string received from server
 * @property {object} tags IRCv3 message tags
 * @property {string} prefix Message prefix and/or source
 * @property {string} command IRC command/verb
 * @property {array} params Array of middle and trailing parameters
 */

/**
 * Socket connected successfully.
 *
 * @event IRCSocket#connect
 */

/**
 * Socket disconnected gracefully (without errors).
 * For example when user simply /quit the server.
 *
 * @event IRCSocket#disconnect
 */

/**
 * Socket errored.
 * Connection reset by host, etc.
 *
 * @event IRCSocket#error
 */

/**
 * Socket didn't receive data for a while (iirc 120s).
 * Note that this doesn't necessarily mean socket disconnected,
 * but within this framework we do periodic pings, thus, when
 * this occurs, the connection likely dropped.
 *
 * @summary Connection dropped
 *
 * @event IRCSocket#timeout
 */

/**
 * Received data from server.
 *
 * @event IRCSocket#message
 * @type {IRCMessage}
 */