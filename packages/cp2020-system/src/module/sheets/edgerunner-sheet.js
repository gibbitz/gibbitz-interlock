import {
  DRAG_SELECTOR,
  GRAPHIC_ASSETS_IMPORT_BASE_PATH,
  HBS_ACTOR_TEMPLATE_PATH
} from '@constants';
import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '@effects';
import {
  appendSystemConstants,
  systemLog,
  fetchMannequinGraphic
} from '@utils';
import {
  registerItemDeleteClick,
  registerItemEditClick,
  registerAddLifepathRowClick,
  registerAddSiblingClick,
  registerFormFieldChange,
  registerActorOnDrag
} from './listeners/actor';
import {
  registerArrayManipulationClicks
} from './listeners/item/registerArrayManipulationClicks';
import { registerRollFormulaClick } from './listeners/registerRollFormulaClick';
import { registerRollClick } from './listeners/registerRollClick';
import { registerHealthClick } from '@actorListeners';


/**
 * Chrome out the basic Actor sheet.
 * @extends {ActorSheet}
 */
export class EdgerunnerSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['cp2020', 'sheet', 'edgerunner'],
      width: 1100,
      height: 800,
      dragDrop: [{ dragSelector: DRAG_SELECTOR, dropSelector: null }],
      tabs: [
        {
          navSelector: '[data-selector="background-tabs"]',
          contentSelector: '[data-selector="background-tab-body"]',
          initial: 'history',
        },
        {
          navSelector: '[data-selector="action-tabs"]',
          contentSelector: '[data-selector="action-tab-body"]',
          initial: 'skills',
        },
        {
          navSelector: '[data-selector="item-tabs"]',
          contentSelector: '[data-selector="item-tab-body"]',
          initial: 'outfit',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return HBS_ACTOR_TEMPLATE_PATH
  }

  /* ------------------------ ? MALE : FEMALE-------------------- */

  /** @override */
  async getData() {
    const context = super.getData();

    // Add the actor's data to context.data for easier access, as well as flags.
    const { data: { system, flags } = {} } = context;
    // separate stats to display in different places in the UI
    const { stats: {
      int,
      ref,
      tech,
      cl,
      attr,
      luck,
      ma,
      body,
      emp,
      rep,
      hum,
      run,
      leap,
      ca,
      lift,
      thro,
      btm,
      dam
    }} = system
    const coreStats = {
      int,
      ref,
      tech,
      cl,
      attr,
      luck,
      ma,
      body,
      emp
    }
    const backgroundStats = {
      rep
    }
    const combatStats = {
      btm,
      dam,
      run,
      leap,
      thro
    }
    const taskStats = {
      run,
      leap,
      ca,
      lift,
      thro
    }
    const inventoryStats = {
      ca,
      lift,
    }
    const cyberwareStats = {
      emp,
      hum,
    }
    // Add roll data for TinyMCE editors.
    const rollData = context.actor.getRollData();

    // TODO: deal with active effects
    // Prepare active effects
    const effects = prepareActiveEffectCategories(
      // A generator that returns all effects & items stored on the actor
      this.actor.allApplicableEffects()
    );

    // create graphic svg string for armor/health diplay based on Gender
    const graphic = await fetchMannequinGraphic(system.identity.gender)

    // TODO: Determine if this is better than the document for derived stats
    const sheetData = appendSystemConstants({
      ...context,
      graphic,
      system,
      flags,
      rollData,
      effects,
      coreStats,
      backgroundStats,
      combatStats,
      taskStats,
      inventoryStats,
      cyberwareStats
    }, game.i18n)
    systemLog(' EDGERUNNER SHEET: getData ', sheetData)
    return sheetData
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html)
    const { registerDraggableElement } = registerActorOnDrag(this, super._onDragStart)

    // Delete Inventory Item
    html.find('[data-selector="item-delete"]')
      .click(
        registerItemDeleteClick(this)
      )

    // Render the detailed sheet for non-inline viewing/editing.
    html.find('[data-selector="item-edit"]')
      .click(
        registerItemEditClick(this)
      )

    // Add lifepath events
    html.find('[data-action="add-lifepath-row"]')
      .click(
        registerAddLifepathRowClick(this)
      )

    // Add siblings
    html.find('[data-action="add-sibling"]')
      .click(
        registerAddSiblingClick(this)
      )

    // manage array fields
    const { add, remove } = registerArrayManipulationClicks(this, html)
    html.find('[data-action="add-row"]').click(add)
    html.find('[data-action="delete-row"]').click(remove)

    // handle inline item editing
    html.find('[data-selector="actor.item"]')
      .change(
        registerFormFieldChange(this)
      )

    // handle inline item rolling
    html.find('[data-roll-formula]')
      .click(
        registerRollFormulaClick(this)
      )

    html.find('[data-roll]')
      .click(
        registerRollClick(this)
      )

    html.find('[data-health]')
      .click(
        registerHealthClick(this)
      )

    // TODO: deal with this....

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Drag events for macros.
    if (this.actor.isOwner || game.user.isGM) {
      html.find('li.item:not(.inventory-header)')
        .each((_i, li) => registerDraggableElement(li))
      html.find('[data-selector="stat-roll"]')
        .each((_i, stat) => registerDraggableElement(stat))
    }
  }

  /**
   * Handle Drag-n-drop start.
   * @param {Event} event   The originating drag event
   * @override
   */
  _onDragStart(event) {
    const { dragStart } = registerActorOnDrag(this, super._onDragStart)
    dragStart(event)
  }
}
