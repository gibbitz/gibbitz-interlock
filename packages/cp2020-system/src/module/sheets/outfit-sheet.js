import { GET_HBS_ITEM_TEMPLATE_PATH, DRAG_SELECTOR } from '@constants'
import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '@effects'
import {
  appendSystemConstants,
  validateDrop,
  systemLog
} from '@utils'
import { registerArrayManipulationClicks } from '@itemListeners/registerArrayManipulationClicks'


/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class OutfitSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['gibbitz-interlock-cp2020', 'sheet', 'item'],
      width: 520,
      height: 480,
      dragDrop: [{ dragSelector: DRAG_SELECTOR, dropSelector: null }],
      tabs: [
        {
          navSelector: '[data-selector="primary-tabs"]',
          contentSelector: '[data-selector="primary-tab-body"]',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    systemLog(' Loading template for : ', this.item.type)
    return GET_HBS_ITEM_TEMPLATE_PATH(this.item.type)
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    const { data: { system, flags } = {} } = context;

    // Retrieve the roll data for TinyMCE editors.
    const rollData = this.item.getRollData();


    // Prepare active effects for easier access
    const effects = prepareActiveEffectCategories(this.item.effects);

    return appendSystemConstants({
      ...context,
      rollData,
      system,
      flags,
      effects
    }, game.i18n)
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _onDrop(event) {
    const data = TextEditor.getDragEventData(event);

    if (!validateDrop(event, this)) return;

    // Handle different data types
    switch (data.type) {
      case "ActiveEffect":
        return this._onDropActiveEffect(event, data);
      case "Item":
        return this._onDropItem(event, data);
      case "Folder":
        return this._onDropFolder(event, data);
    }
  }

  _onDropActiveEffect(event, data) {
    systemLog('OUTFIT ACTIVE EFFECT DROP | ', event, data)
  }

  async _onDropItem(event, data) {
    systemLog('OUTFIT UPGRADE DROP |', event, data)
    const { uuid } = data
    await this.item.update({
      ['system.upgradeIds']: [
        ...this.item.system.upgradeIds,
        uuid?.split('Item.')[1]
      ]
    }, { render: true })
  }

  _onDropFolder(event, data) {
    systemLog('OUTFIT FOLDER DROP |', event, data)
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    const { add, remove } = registerArrayManipulationClicks(this, html)
    html.find('[data-action="add-row"]').click(add)
    html.find('[data-action="delete-row"]').click(remove)

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );
  }
}
