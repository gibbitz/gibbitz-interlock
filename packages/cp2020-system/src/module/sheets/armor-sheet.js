import { GET_HBS_ITEM_TEMPLATE_PATH, SYSTEM_NAME } from '@constants'
import { OutfitSheet } from './outfit-sheet';
import { registerMannequinInteraction } from './listeners/item/registerMannequinInteraction'
import {
  appendSystemConstants,
  systemLog
} from '@utils'

const handleMannequinClick = (data, event) => {
  const { type, target } = event
  console.log(data, type, target)
}

/**
 * Extend the OutfitSheet with some armor speciic modifications
 * @extends {OutfitSheet}
 */
export class ArmorSheet extends OutfitSheet {
/** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_NAME, 'sheet', 'armor'],
      width: 570,
      height: 830,
    });
  }
/** @override */
  get template() {
    // return generateSheetPath('armor', 'Items')
    systemLog(' Loading Armor template ')
    return GET_HBS_ITEM_TEMPLATE_PATH(this.item.type)
  }

  async getData() {
    const armorData = super.getData()

    const gender = Math.round(Math.random()) ? 'male' : 'female'
    const svgData = await fetch(`/systems/cp2020-system/assets/graphics/${gender}.svg`)
    const graphic = await svgData.text()
    const locationClasses = armorData.item.system.locations.map(item => item.replace('.', '-')).join(' ')
    return appendSystemConstants({
      graphic,
      locationClasses,
      ...armorData
    }, game.i18n)
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html)
    registerMannequinInteraction(html[0])({
      click: handleMannequinClick
    })
  }
}
