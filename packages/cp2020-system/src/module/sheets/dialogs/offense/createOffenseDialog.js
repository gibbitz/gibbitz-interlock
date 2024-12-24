import { OFFENSE_DIALOG_PATH } from '@constants/handlebars'
import {
  createFormDialog,
  systemLog,
  replaceStringTokens,
  determineWeaponRanges
} from '@utils'

export const createOffenseDialog = async (context) => {

  const title = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.offense.title'),
    context.actor.name,
    Object.keys(context.targetOptions)[0],
    context.name
  )

  const label = replaceStringTokens(
    game.i18n.localize('cp2020.dialogs.offense.action'),
    Object.keys(context.targetOptions)[0]
  )

  const render = (_dialog, DOM) => {
    systemLog('offense render |', context, DOM)
    const firezoneSelector = DOM.querySelector('[data-selector="fireZone"]')
    DOM.querySelector('[data-selector="autoFireType"]')
      .addEventListener('change', (event) => {
        Array.from(
          DOM.querySelectorAll('.field-box')
        )
          .filter(node => node.contains(firezoneSelector))[0]
          .classList.toggle('cp2020-hidden')
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
    return output
  }

  return createFormDialog({
    context,
    template: OFFENSE_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render,
    resizeable: true
  })
}