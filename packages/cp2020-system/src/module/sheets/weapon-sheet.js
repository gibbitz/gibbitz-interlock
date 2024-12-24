import { systemLog } from '@utils';
import { OutfitSheet } from './outfit-sheet';

/**
 * Extend the basic OutfitSheet with some modifications specific to Weapons
 * @extends {OutfitSheet}
 */
export class WeaponSheet extends OutfitSheet {

  /** @override */
  getData() {
    const { actor } = this
    // Retrieve base data structure.
    const context = {
      ...super.getData()
    }
    context.system.upgradeIds.forEach(id => {
      context.item.system.upgrades[id] = actor?.items.get(id)
    })
    systemLog(' WEAPON SHEET | ', context)
    return context
  }

  _onDropActiveEffect(event, data){
    systemLog('WEAPON ACTIVE EFFECT DROP | ', event, data)
  }

   async _onDropItem(event, data) {
    systemLog('WEAPON UPGRADE DROP |', event, data)
    super._onDropItem(event, data)
  }

  _onDropFolder(event, data) {
    systemLog('WEAPON FOLDER DROP |', event, data)
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }
}