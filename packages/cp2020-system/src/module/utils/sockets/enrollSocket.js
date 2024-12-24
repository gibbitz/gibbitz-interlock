import {
  SYSTEM_PROJECT_NAME
} from '@constants'

/**
 * @name cp2020Sockets
 * FoundryVTT uses socket.io for socket communications
 * Socket.io has the limitation that emitted events are not heard from
 * the broadcaster.
 * To allow this behavior handler callbacks for listeners need to be called from
 * the code that emits
 * The code below registers handlers and wraps emissions to enable handlers to run
 * for the local emitter as well as the remote listeners
 */

/**
 * @typedef SocketPayload
 * @property {string} recipient the userId of the user to recieve the event
 * @property {string} sender the sender's userId
 */

/**
 * @typedef SocketHandlerOptions
 * @property {string} type the current system socket event type
 * @property {SocketPayload} payload the communication event payload object
 */

/**
 * callback function to handle socket events where the actual event type is always
 * the system name
 * @callback SocketHandler
 * @param {SocketHandlerOptions} options socket event options
 */

/**
 * factory to create socket handlers
 * @param {string} eventType the string that identifies the event within the system
 * @param {function} callback the function to call if the event is relevant
 * @returns {SocketHandler} the handler for the socket event
 */

const createSocketHandler = (eventType, callback) => ({ type, payload }) => {
  if (
    eventType === type
    && payload.recipient === game.userId
  ) {
    callback(payload)
  }
}

/**
 * function that emits a socket event and fires the local handler in case it
 * is intended for the emitter
 * @param {string} type the current system socket event type
 * @param {object} payload the communication event payload object
 * @param {SocketHandler} callback
 */
const emit = (type, payload, callback) => {
  callback({ type, payload })
  game.socket.emit(
    `system.${SYSTEM_PROJECT_NAME}`,
    {
      type,
      payload: {
        ...payload,
        sender: game.userId
      }
    }
  )
}

/**
 * function to register socketio listeners
 * @param {string} eventType the system socket event type name
 * @param {function} callback a function to process relevant socket payloads
 */
const addSocketListener = (eventType, callback) => {
  const systemEvent = `system.${SYSTEM_PROJECT_NAME}`
  const handler = createSocketHandler(eventType, callback)
  game.socket.on(systemEvent, handler)
}

/**
 * function that enrolls a listener for and returns an emission function for
 * a socket event type
 * @param {string} eventType the system socket event type name
 * @param {function} callback a function to process relevant socket payloads
 * @returns
 */

export const enrollSocket = (eventType, callback) => {
  addSocketListener(eventType, callback)
  return (payload) => emit(
    eventType,
    payload,
    createSocketHandler(eventType, callback)
  )
}
