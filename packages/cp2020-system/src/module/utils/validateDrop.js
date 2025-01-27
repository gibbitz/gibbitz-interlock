import { XFER_KEY, SYSTEM_NAME } from '@constants'
import { notify } from './notify'

export const validateDrop = (event, sheet) => {
  const { actor, item: { name: targetName, type: targetType } } = sheet

  if (!event.dataTransfer) {
    notify(`${SYSTEM_NAME}.dialogs.upgrade.missingUpgrade`)
    return false
  }
  if (!actor) {
    notify(`${SYSTEM_NAME}.dialogs.upgrade.unownedItem`, targetName)
    return false
  }

  const { type, uuid } = JSON.parse(
    event.dataTransfer.getData(XFER_KEY) || '{}'
  )

  if (type === 'Actor' ) {
    const { name } = game.actors.get(uuid.split('Actor.')[1])
    notify(`${SYSTEM_NAME}.dialogs.upgrade.slavery`, name)
    return false
  }

  const droppedItem = actor.items.get(uuid?.split('Item.')[1])
  if (!droppedItem) {
    const { name } = game.items.get(uuid?.split('Item.')[1]) || {}
    notify(`${SYSTEM_NAME}.dialogs.upgrade.unownedUpgrade`, name)
    return false
  }

  const { system: { recipient }, name } = droppedItem
  if (recipient !== targetType) {
    notify(`${SYSTEM_NAME}.dialogs.upgrade.mismatch`, name, targetName)
    return false
  }
  return true
}