// system constants
import {
  SYSTEM_PROJECT_NAME,
  SYSTEM_NAME,
  CP_2020,
  DOCUMENT_TYPES
} from '@constants'

import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from './utils/handlebars'

// document classes
import { Cp2020Actor, Cp2020Item } from '@documents';

// data model classes
import {
  Edgerunner,
  Cyberdeck,
  Cyberware,
  Outfit,
  Program,
  Skill,
  Vehicle,
  Weapon,
  Upgrade
} from '@models';

// sheet classes.
import {
  CyberwareSheet,
  EdgerunnerSheet,
  OutfitSheet,
  WeaponSheet
} from '@sheets';

// helpers/utilities
import {
  createHotbarMacro,
  createItemRollMacro,
  createChatRollMacro,
  systemLog
} from '@utils';
import{
  initSocketListeners
} from '@utils/sockets';
import { ITEM_DOCUMENT_TYPES } from './constants/item-types';

console.log('LOADED')

Hooks.on('init', function () {
  systemLog(`> Initializing ${SYSTEM_PROJECT_NAME}`)
  registerHandlebarsHelpers(game.i18n)
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.gibbitzinterlockcp2020 = {
    Cp2020Actor,
    Cp2020Item,
    createItemRollMacro,
    createChatRollMacro
  };

  // Add custom constants for configuration.
  CONFIG.CP_2020 = CP_2020;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d10x + @stats.ref.total',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = Cp2020Actor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    Edgerunner
  }
  CONFIG.Item.documentClass = Cp2020Item;
  CONFIG.Item.dataModels = {
    Cyberdeck,
    Cyberware,
    Outfit,
    Program,
    Skill,
    Upgrade,
    Vehicle,
    Weapon,
  }

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // setup sockets
  initSocketListeners()

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet(SYSTEM_PROJECT_NAME, EdgerunnerSheet, {
    makeDefault: true,
    label: `${SYSTEM_NAME}.SheetLabels.Actor`,
  });
  const registerItemSheets = () => {
    const { WEAPON, CYBERWARE, AMMUNITION, CURRENCY, ...ITEM_TYPES} = ITEM_DOCUMENT_TYPES
    Items.unregisterSheet('core', ItemSheet);
    Items.registerSheet(SYSTEM_PROJECT_NAME, WeaponSheet, {
      types: [WEAPON],
      label: `${SYSTEM_NAME}.SheetLabels.Weapon`,
    });
    Items.registerSheet(SYSTEM_PROJECT_NAME, CyberwareSheet, {
      types: [CYBERWARE],
      label: `${SYSTEM_NAME}.SheetLabels.Cyberware`,
    });
    Items.registerSheet(SYSTEM_PROJECT_NAME, OutfitSheet, {
      types: ITEM_TYPES,
      label: `${SYSTEM_NAME}.SheetLabels.Item`,
    });
  }
  registerItemSheets()

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

// TODO: trigger this on Actor drops
Hooks.on('dropSharedItemSheetData', (actor, item, data) => {
  debugger
  return true
})

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready
  Hooks.on('hotbarDrop', (_bar, data, slot) => createHotbarMacro(data, slot));
});
