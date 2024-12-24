import { createAttackDvDialog } from '@sheets/dialogs/defense/createAttackDvDialog'
import { emitters } from '@utils/sockets'
import { TO_HIT_DV } from '@constants'
import { systemLog, replaceStringTokens } from '@utils'

const { emitError, emitDefend } = emitters

export const determineAttackDV = async (attackPayload) => {
  const {attack: {dvData, rollData, targetRange}} = attackPayload
  const defaultDV = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.dv.defaultDv'),
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
    [game.i18n.localize('cp2020.dialogs.dv.overridePrompt')]: '',
    ...DvOptions
  }
  systemLog('DETERMINE_ATTACK_DV | ', attackPayload, overrideDvOptions)
  createAttackDvDialog({
    attackPayload,
    overrideDvOptions,
    defaultDV,
    dvData
  }).then((data) => {
    emitDefend({
      ...attackPayload,
      dv: {
        ...data
      }
    })
  }).catch((error) => {
    emitError({ defense: { error: error.message }, attackPayload })
  })
}