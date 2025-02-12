import { CHECK_DIALOG_PATH } from '@constants/handlebars'
import { SYSTEM_NAME, STYLE_HIDDEN } from '@constants'
import {
  createFormDialog,
  systemLog,
  replaceStringTokens
} from '@utils'
import { appendModifier } from '@utils/roll'

const NO_TARGET = ''

export const createCheckDialog = async context => new Promise(resolve => {
  systemLog(' CHECK DIALOG | ', context)
  const {name:skillName, actor: { name: actorName }} = context
  const title = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.title`),
    actorName,
    skillName
  )

  const label = replaceStringTokens(
    game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.action`),
    skillName
  )

  // TODO: generate items to modify here
  // outfit/cyberware that provides bonuses
  const modifiers = {}

  // create a list to choose subjects from
  let targets = {
    [game.i18n.localize(`${SYSTEM_NAME}.dialogs.task.noTarget`)]: NO_TARGET
  }
  game.actors.forEach(({ name, id }) => {
    if (name !== actorName) {
      targets[name] = id
    }
  })

  const render = dialog => {
    // likely to need this for interaction with modifiers
  }

  const onSubmit = ({ targetActorId, modifier}) => {
    const { rollFormula: baseRollFormula } = context
    const rollFormula = `${baseRollFormula}${appendModifier(modifier)}`
    const isOpposedRoll = NO_TARGET !== targetActorId
    const output = { isOpposedRoll, targetActorId, rollFormula }
    resolve(output)
    return output
  }

  createFormDialog({
    context: { action: label, targets, modifiers, ...context },
    template: CHECK_DIALOG_PATH,
    title,
    label,
    onSubmit,
    render,
    closeOnSubmit: true,
    resizeable: true
  })
})
