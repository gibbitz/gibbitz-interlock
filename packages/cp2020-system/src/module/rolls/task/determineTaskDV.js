import { createCheckDvDialog } from '@sheets/dialogs/task'
import { emitError } from '@utils/sockets'
import { systemLog, replaceStringTokens } from '@utils'
import { emitResolveCheck } from '@utils/sockets/emitters'

/**
 * function to envoke the Task DV Dialog for the Ref then emit a request to
 * complete the task check
 * @param {*} taskData
 */
export const determineTaskDV = async (taskData) => {
  systemLog('UNOPPOSED SKILL |', taskData)
  const { check: { rollData }, recipient } = taskData
  createCheckDvDialog(rollData)
    .then( async (data) => {
      emitResolveCheck({
        ...taskData,
        dv: data
      })
      return data
    })
    .catch(error => {
      emitError({ defense: { error: error.message }, taskData })
    })
}
