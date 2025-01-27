import { systemLog } from '@utils'

export const determineOpposedRollResult = (payload) => {
  systemLog('OPPOSED ROLL DATA | ', payload)
  // determine inbound roll (opposed or unopposed)
  // pull dv if unopposed
  // roll dv if opposed
  systemLog('OPPOSED ROLL DV | ', payload.dv.roll)
  // roll attack
  // compare attack and dv
  // create chat message with result
  // rollFormulaToChat()
}