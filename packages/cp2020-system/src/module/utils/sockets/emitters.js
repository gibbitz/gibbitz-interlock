import {
  SYSTEM_NAME,
  EMIT_OPPOSED_ATTACK,
  EMIT_REQUEST_ATTACK_DV,
  EMIT_DEFENSE,
  EMIT_ERROR,
  EMIT_CHECK,
  EMIT_REQUEST_TASK_DV,
  EMIT_OPPOSED_TASK
} from '@constants'

import { enrollSocket } from './enrollSocket'
import { systemLog, notify } from '@utils'
import {
  determineTurnResult,
  rollWeaponDefense,
  determineAttackDV
} from '@rolls/combat'
import {
  determineTaskDV,
  rollTaskOpposition,
  determineCheckResult
} from '@rolls/task'

let _emitOpposedAttack
let _emitDefend
let _emitError
let _emitSkillChallenge
let _emitRequestAttackDv
let _emitRequestTaskDv
let _emitResolveCheck

export const makeResponse = (payload) => ({
  ...payload,
  recipient: payload.sender,
  sender: payload.recipient
})

export const initSocketListeners = () => {

  _emitOpposedAttack = enrollSocket(
    EMIT_OPPOSED_ATTACK,
    async (payload) => {
      await rollWeaponDefense(payload)
    }
  )

  _emitRequestAttackDv = enrollSocket(
    EMIT_REQUEST_ATTACK_DV,
    determineAttackDV
  )

  _emitDefend = enrollSocket(
    EMIT_DEFENSE,
    async (payload) => {
      determineTurnResult(makeResponse(payload))
    }
  )

  _emitError = enrollSocket(
    EMIT_ERROR,
    async (payload) => {
      const sender = game.users.get(makeResponse(payload).sender).name
      notify(game.i18n.localize(`${SYSTEM_NAME}.errors.communication`), sender, payload.defense.error)
    }
  )

  _emitSkillChallenge = enrollSocket(
    EMIT_OPPOSED_TASK,
    rollTaskOpposition
  )

  _emitRequestTaskDv = enrollSocket(
    EMIT_REQUEST_TASK_DV,
    determineTaskDV
  )

  _emitResolveCheck = enrollSocket(
    EMIT_CHECK,
    determineCheckResult
  )
}

export const emitSkillChallenge = (...args) => _emitSkillChallenge(...args)
export const emitDefend = (...args) => _emitDefend(...args)
export const emitError = (...args) => _emitError(...args)
export const emitOpposedAttack = (...args) => _emitOpposedAttack(...args)
export const emitRequestAttackDv = (...args) => _emitRequestAttackDv(...args)
export const emitRequestTaskDv = (...args) => _emitRequestTaskDv(...args)
export const emitResolveCheck = (...args) => _emitResolveCheck(...args)
