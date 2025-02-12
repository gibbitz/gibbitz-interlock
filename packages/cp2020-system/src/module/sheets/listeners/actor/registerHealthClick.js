import { createDamageDialog } from '@sheets/dialogs/actor'

export const registerHealthClick = (edgerunnerSheet) => async (_event) => {
  createDamageDialog(edgerunnerSheet.actor).then((app) => {
    console.log(app)
  }).catch((err) => {
    console.error(err)
  })
  // use current target and target to determine the number of wounds to create or remove
  // determine heal or wound
  // determine wound type
  // await edgerunnerSheet.actor.wound()
  // await edgerunnerSheet.actor.heal()
  // edgerunnerSheet.render(true)
}