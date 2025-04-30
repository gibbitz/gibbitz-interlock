import { GET_HBS_ITEM_TEMPLATE_PATH, SYSTEM_NAME } from '@constants'
import { OutfitSheet } from './outfit-sheet';
import { registerMannequinInteraction } from './listeners/item/registerMannequinInteraction'
import {
  appendSystemConstants,
  systemLog
} from '@utils'

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
    const locationClasses = armorData.item.system.locations?.map(({ location }) => location.replace('.', '-')).join(' ')
    return appendSystemConstants({
      graphic,
      locationClasses,
      ...armorData
    }, game.i18n)
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html)
    const domRoot = html[0]

    const mannequin = domRoot.querySelector('.mannequin__graphic svg')
    this.item.system.locations?.forEach(({
      location: id,
      sp,
      ablation
    }) => {
      const lvlClass = `level-${Math.round(((sp - ablation) / sp) * 10)}`
      mannequin.getElementById(id)?.classList?.add(lvlClass)
    })

    const handleRemoveLocation = (event) => {
      const { target } = event
      const {key} = target.dataset
      this.item.system.locations.splice(key, 1)
      this.render(true)
    }

    const handleMannequinClick = (data, event) => {
      const { type, target } = event
      const { id, classname } = data
      const { item: { system: { locations } } } = this
      if (
        locations.filter(({location}) => (location === id)).length
      ) {
        return
      }
      locations.push({
        location: id,
        sp: 0,
        ablation: 0
      })
      this.render(true)
    }

    registerMannequinInteraction(domRoot)({
      click: handleMannequinClick
    })
    // live listene needs to be removed when closed
    domRoot.addEventListener('click', (event) => {
      const { target } = event
      if(target.dataset.action === 'delete-location') {
        handleRemoveLocation(event)
      }
    })
  }
}
