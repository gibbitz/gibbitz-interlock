import { replaceStringTokens } from '@utils/replaceStringTokens'
import { XFER_KEY } from '@constants/system'

/**
 * function that makes elements draggable and registers dragStart as the dragStart handler
 * @callback registerDraggableElement
 * @param {HTMLElement} element the item intended to be draggable
 *

/**
 * handler for onDragStart that doubles as the ActorSheet _onDragStart method
 * @callback dragStart
 * @param {Event} event DOM event
 */

/**
 * @typedef {object} OnDragHandlers
 * @property {dragStart} dragStart
 * @property {registerDraggableElement} registerDraggableElement
 */

/**
 * Factory to generate functions used to manage drag-n-drop in EdgerunnerSheets
 *
 * @param {ActorSheet} edgerunnerSheet
 * @param {Function} fallback super._onDragStart function passed in for modularity
 * @returns {OnDragHandlers}
 */
export const registerActorOnDrag = (edgerunnerSheet, fallback) => {

  const dragStart = (event) => {
    const { target } = event
    const { rollFormula, flavor, key, selector } = target.dataset
    if (selector !== 'stat-roll') {
      return fallback?.bind(edgerunnerSheet)(event)
    }
    // stat drops pass the stat's roll formula and flavor
    // to the hotbar
    const dragData = {
      type: 'Stat',
      formula: rollFormula,
      flavor: replaceStringTokens(flavor, key),
      uuid: edgerunnerSheet.actor._id
    }
    event.dataTransfer.setData(XFER_KEY, JSON.stringify(dragData))
  }

  const registerDraggableElement = (element) => {
    element.setAttribute('draggable', true)
    element.addEventListener('dragstart', dragStart, false)
  }

  return ({
    dragStart,
    registerDraggableElement
  })
}