import { ATTACK_DIALOG_PATH } from '@constants/handlebars'
import { SYSTEM_NAME, STYLE_HIDDEN } from '@constants'
import {
  createFormDialog,
  systemLog,
  replaceStringTokens,
} from '@utils'
import { getParentFieldBox } from '@utils/dialogs'

// return a promise here to simulate the wait function on v1 Dialog
export const createAttackDialog = async (context) => new Promise((resolve) => {
  const targetName = Object.keys(context.targetOptions)[0]

  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.offense.title`),
    context.actor.name,
    targetName,
    context.name
  )

  const label = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.offense.action`),
    Object.keys(context.targetOptions)[0]
  )

  const render = (dialog) => {
    systemLog('offense render |', context, dialog)


    const roundsFiredSelector = dialog.querySelector('[data-selector="roundsFired"]')
    const autoFireSelector = dialog.querySelector('[data-selector="autoFireType"]')
    const firezoneSelector = dialog.querySelector('[data-selector="fireZone"]')
    roundsFiredSelector
      .addEventListener('change', (event) => {
        if (event.target.value > 2) {
          getParentFieldBox(autoFireSelector, dialog)
            .classList.remove(STYLE_HIDDEN)
        } else {
          getParentFieldBox(autoFireSelector, dialog)
            .classList.add(STYLE_HIDDEN)
        }
      })
    autoFireSelector
      .addEventListener('change', (_event) => {
        getParentFieldBox(firezoneSelector, dialog)
          .classList.toggle(STYLE_HIDDEN)
      })
  }

  const getDVDataByRange = (targetRange, rangeDVs) => {
    const DVLevel = rangeDVs.reduce((level, { range }, index) => (
      targetRange > range
        ? index + 1
        : level
    ), 0) || rangeDVs.length - 1
    return rangeDVs[DVLevel]
  }

  const onSubmit = data => {
    const { isMelee, targetInfo, rangeDVs } = context
    const { targetActorId } = data
    const targetRange = targetInfo[targetActorId].range
    const isOpposedRoll = isMelee || targetRange <= 2
    const dvData = isOpposedRoll
      ? rangeDVs[0]
      : getDVDataByRange(targetRange, rangeDVs)
    const output = { isOpposedRoll, dvData, targetRange, ...data }
    systemLog('OFFENSE SUBMITS | ', output)
    resolve(output)
    return output
  }

  createFormDialog({
    context: { targetName, ...context },
    template: ATTACK_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render,
    closeOnSubmit: true,
    resizeable: true
  })
})
