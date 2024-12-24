import {
  notify
} from './notify'
import {
  measureWorldDistanceBetweenTokens,
} from './measureWorldDistanceBetweenTokens'
import {
  getUserIdFromTokenId
} from './getUserIdFromTokenId'


/**
 * basic info to retrieve target token and user and evaluate DV by range
 * @typedef TargetInfo
 * @property {string} name
 * @property {string} tokenId
 * @property {string} userId
 * @property {number} range
*
 */


/**
 * Object composed of of TargetInfo by ActorId
 *
 * @typedef TargetInfoByActor
 * @property {TargetInfo} [actorId] actorId
 */

/**
 * creates simple object of TargetInfo keyed on actorId
 * @param {Array<Actor>} targets iterable target collection or array from user.targets
 * @returns {TargetInfoByActor}
 */
const collectTargetInfo = (targets) => {
  return targets.reduce(
    (col, { id: tokenId, document: { actorId, name }, x, y }) => {
      const range = measureWorldDistanceBetweenTokens(
        game.combat.combatant.token,
        { x, y }
      )
      const userId = getUserIdFromTokenId(tokenId)
      return ({ ...col, [actorId]: { name, tokenId, range, userId } })
    },
    {}
  )
}

/**
 * Object of character name keys to actorId values
 *
 * @typedef TargetOptions
 * @property {string} [characterName] actorId
 */

/**
 * Creates an Object for use as select options for selecting the recipient of an action
 *
 * @param {Array<Actor>} targets iterable target collection or array from user.targets
 * @returns {TargetOptions}
 */
const generateTargetOptions = (targets) =>
  targets.reduce(
    (col, { document: { actorId, name } }) => ({ ...col, [name]: actorId }),
    {}
  )

/**
 * @typedef TargetData
 * @property {TargetInfoByActor} targetInfo
 * @property {string} targetActorId the targetId of a single targeted actor
 * @property {TargetOptions} targetOptions
 * @property {boolean} multipleTargets true if there are multiple targets selected
 */

/**
 * collects information about targets and returns sorted data
 *
 * @returns {TargetData}
 */
export const determineTargetData = () => {
  const { targets } = game.user
  if (!targets?.size) {
    notify('Pick a target, Punk.')
    return false
  }
  const targetOptions = generateTargetOptions(targets)
  const multipleTargets = targets.size > 1
  return {
    targetInfo: collectTargetInfo(targets),
    targetActorId: !multipleTargets
      ? targetOptions[Object.keys(targetOptions)[0]]
      : undefined,
    targetOptions,
    multipleTargets
  }
}