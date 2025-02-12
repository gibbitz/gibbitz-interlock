import { systemLog } from '@utils'
import { evaluateRoll } from '@utils/roll/evaluateRoll'

export const determineCheckResult = async (payload) => {
  systemLog(' CHECK RESULT | ', payload)
  // roll check
  const { check, dv, contest } = payload
  systemLog('TASK META | ', check)
  const checkRoll = await evaluateRoll(check.rollData)

  if (checkRoll.isFumble) {
    ChatMessage.create({
      // TODO: use rolltable to determine fumble string
      content: 'you fumbled dawg'
    })

  } else {

    // determine inbound roll (opposed or unopposed)
    // pull dv if unopposed
    if (dv) {
      systemLog('DV META | ', dv)
      const dvRoll = await evaluateRoll(dv.rollData)
      ChatMessage.create({
        flavor: dv.rollData.flavor || `${check.rollData.actor.name} must beat : `,
        rolls: [dvRoll.rollInfo]
      })
    }

    // roll dv if opposed
    if (contest) {
      systemLog('DEFENSE META | ', contest)
      const contestRoll = await evaluateRoll(contest.rollData)
      if (contestRoll.isFumble) {
        ChatMessage.create({
          // TODO: use rolltable to determine fumble string
          content: 'you fumbled dawg'
        })

      } else {
        ChatMessage.create({
          flavor: contest.rollData.flavor || `${contest.name} defends with : `,
          rolls: [contestRoll.rollInfo]
        })
      }
    }

    // chat check
    ChatMessage.create({
      flavor: check.rollData.flavor || `${check.rollData.actor.name} attacks with ${check.rollData.name} for : `,
      rolls: [checkRoll.rollInfo]
    })
  }
}
