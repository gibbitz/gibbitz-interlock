import {
  SYSTEM_NAME,
  EMIT_OPPOSED_ATTACK,
  EMIT_REQUEST_ATTACK_DV,
  EMIT_DEFENSE,
  EMIT_ERROR,
  EMIT_CHECK
} from '@constants'

import { enrollSocket } from './enrollSocket'
import { systemLog, notify } from '@utils'
import { determineOpposedRollResult, rollWeaponDefense, determineAttackDV } from '@rolls'

let emitOpposedAttack
let emitDefend
let emitError
let emitSkillChallenge
let emitRequestAttackDv

export const makeResponse = (payload) => ({
  ...payload,
  recipient: payload.sender,
  sender: payload.recipient
})

export const initSocketListeners = () => {

  emitOpposedAttack = enrollSocket(
    EMIT_OPPOSED_ATTACK,
    async (payload) => {
      await rollWeaponDefense(payload)
    }
  )

  emitRequestAttackDv = enrollSocket(
    EMIT_REQUEST_ATTACK_DV,
    determineAttackDV
  )

  emitDefend = enrollSocket(
    EMIT_DEFENSE,
    async (payload) => {
      determineOpposedRollResult(makeResponse(payload))
    }
  )

  emitError = enrollSocket(
    EMIT_ERROR,
    async (payload) => {
      const sender = game.users.get(makeResponse(payload).sender).name
      notify(game.i18n.localize(`${SYSTEM_NAME}.errors.communication`), sender, payload.defense.error)
    }
  )

  emitSkillChallenge = enrollSocket(
    EMIT_CHECK,
    async (payload) => {
      systemLog('OPPOSED SKILL |', payload)
    }
  )
}
export const emitters = {
  emitSkillChallenge: (...args) => emitSkillChallenge(...args),
  emitDefend: (...args) => emitDefend(...args),
  emitError: (...args) => emitError(...args),
  emitOpposedAttack: (...args) => emitOpposedAttack(...args),
  emitRequestAttackDv: (...args) => emitRequestAttackDv(...args)
}
