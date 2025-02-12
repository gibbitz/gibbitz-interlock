import { createDvDialog } from '@sheets/dialogs/combat'
import { emitError, emitDefend } from '@utils/sockets'
import { TO_HIT_DV, SYSTEM_NAME } from '@constants'
import { systemLog, replaceStringTokens } from '@utils'

/**
 * function to envoke the Attack DV Dialog for the Ref then emit a request to
 * complete the combat turn
 * @param {*} attackPayload
 */
export const determineAttackDV = async (attackPayload) => {
  const {attack: {dvData, rollData, targetRange}} = attackPayload

  const defaultDV = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.dv.defaultDv`),
    dvData.dv,
    (Math.round(targetRange*100)/100),
    dvData.name
  )

  const DvOptions = Object.keys(TO_HIT_DV)
    .reduce((output, key, index) => ({
      ...output,
      [replaceStringTokens(
        game.i18n.localize(key),
        rollData.rangeDVs[index].range
      )]: TO_HIT_DV[key]
    }), {})
  const overrideDvOptions = {
    [game.i18n.localize(`${SYSTEM_NAME}.dialogs.dv.overridePrompt`)]: '',
    ...DvOptions
  }

  systemLog('DETERMINE_ATTACK_DV | ', attackPayload, overrideDvOptions)

  createDvDialog({
    attackPayload,
    overrideDvOptions,
    defaultDV,
    dvData
  })
    .then(async (data) => {
      const { modifier, otherModifier, overrideRange } = data
      // finalize the turn
      emitDefend({
        ...attackPayload,
        dv: {
          ...data
        }
      })
      return data
    })
    .catch((error) => {
      emitError({ defense: { error: error.message }, attackPayload })
    })
}