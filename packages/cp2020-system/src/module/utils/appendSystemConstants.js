import {
  SYSTEM_NAME,
  SKILL_DV,
  TO_HIT_DV,
  AUTO_FIRE_OPTIONS,
  MARTIAL_ARTS_MOVES_OPTIONS,
  TO_HIT_MODIFIERS,
  SKILL_MODIFIERS
} from "@constants"
import {
  buildAvailabilitiesSelectOptions,
  buildConcealabilitySelectOptions,
  buildCyberwearModifierOptions,
  buildLocationOptions,
  buildRelativeAgeSelectOptions,
  buildStatSelectOptions,
  buildWeaponTypeSelectOptions,
  buildItemTypeSelectOptions
} from '@utils/buildSelectOptions'
import { translateObjectKeys } from './i18n/translateObjectKeys'

/**
 * Appends the system constants to the context passed to the function,
 * localizes the select options and returns the merged Object
 *
 * for use as the data passed from `getData()` in documents
 * to provide these constants to handlebars
 * @param {Object} context context to be extended with the system constants
 * @param {Localization} i18n the i18n class that provides the localize function
 * @returns {Object}
 */
export const appendSystemConstants = (context, i18n) => ({
  ...context,
  SYSTEM_NAME,
  MARTIAL_ARTS_MOVES_SELECT_OPTIONS: translateObjectKeys(i18n, MARTIAL_ARTS_MOVES_OPTIONS),
  AUTO_FIRE_SELECT_OPTIONS: translateObjectKeys(i18n, AUTO_FIRE_OPTIONS),
  ITEM_AVAILABILITIES_SELECT_OPTIONS: buildAvailabilitiesSelectOptions(i18n),
  WEAPON_CONCEALABILITY_SELECT_OPTIONS: buildConcealabilitySelectOptions(i18n),
  WEAPON_TYPE_SELECT_OPTIONS: buildWeaponTypeSelectOptions(i18n),
  CYBERWEAR_MODIFIER_TYPE_SELECT_OPTIONS: buildCyberwearModifierOptions(i18n),
  LOCATION_SELECT_OPTIONS: buildLocationOptions(i18n),
  STAT_SELECT_OPTIONS: buildStatSelectOptions(i18n),
  RELATIVE_AGE_SELECT_OPTIONS: buildRelativeAgeSelectOptions(i18n),
  ITEM_TYPES_SELECT_OPTIONS: buildItemTypeSelectOptions(i18n),
  SKILL_DV_SELECT_OPTIONS: translateObjectKeys(i18n, SKILL_DV),
  SKILL_MODIFIER_SELECT_OPTIONS: translateObjectKeys(i18n, SKILL_MODIFIERS),
  TO_HIT_DV_SELECT_OPTIONS: translateObjectKeys(i18n, TO_HIT_DV),
  TO_HIT_MODIFIERS_SELECT_OPTIONS: translateObjectKeys(i18n, TO_HIT_MODIFIERS)
})
