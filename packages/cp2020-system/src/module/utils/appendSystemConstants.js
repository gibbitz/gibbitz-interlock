import {
  SYSTEM_NAME,
  SKILL_DV,
  TO_HIT_DV,
  AUTO_FIRE_OPTIONS,
  MARTIAL_ARTS_MOVES_OPTIONS,
  TO_HIT_MODIFIERS,
  SKILL_MODIFIERS,
  ACCURACY_ICON,
  AVAILABILITY_ICON,
  BLAST_RADIUS_ICON,
  CARTRIDGE_ICON,
  CHIPPED_ICON,
  CONCEALABILITY_ICON,
  COST_ICON,
  DAMAGE_ICON,
  MAGAZINE_ICON,
  RANGE_ICON,
  RELIABILITY_ICON,
  RATE_OF_FIRE_ICON,
  WEAPON_TYPE_ICON,
  WEIGHT_ICON
} from "@constants"
import {
  buildAvailabilitiesSelectOptions,
  buildConcealabilitySelectOptions,
  buildCyberwearModifierOptions,
  buildLocationOptions,
  buildRelativeAgeSelectOptions,
  buildStatSelectOptions,
  buildWeaponTypeSelectOptions,
  buildItemTypeSelectOptions,
  buildWoundTypeOptions,
  buildHealthActionTypeOptions,
  buildReliabilitySelectOptions
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
export const appendSystemConstants = (context, i18n) => {
  // mutation of instance to work-around prototype limitation config of HBS
  context.constants =  {
    SYSTEM_NAME,
    ICONS: {
      ACCURACY : ACCURACY_ICON,
      AVAILABILITY : AVAILABILITY_ICON,
      BLAST_RADIUS : BLAST_RADIUS_ICON,
      CARTRIDGE : CARTRIDGE_ICON,
      CHIPPED : CHIPPED_ICON,
      CONCEALABILITY : CONCEALABILITY_ICON,
      COST : COST_ICON,
      DAMAGE : DAMAGE_ICON,
      MAGAZINE : MAGAZINE_ICON,
      RANGE : RANGE_ICON,
      RELIABILITY : RELIABILITY_ICON,
      RATE_OF_FIRE : RATE_OF_FIRE_ICON,
      WEAPON_TYPE : WEAPON_TYPE_ICON,
      WEIGHT : WEIGHT_ICON
    },
    MARTIAL_ARTS_MOVES_SELECT_OPTIONS: translateObjectKeys(i18n, MARTIAL_ARTS_MOVES_OPTIONS),
    AUTO_FIRE_SELECT_OPTIONS: translateObjectKeys(i18n, AUTO_FIRE_OPTIONS),
    ITEM_AVAILABILITIES_SELECT_OPTIONS: buildAvailabilitiesSelectOptions(i18n),
    WEAPON_CONCEALABILITY_SELECT_OPTIONS: buildConcealabilitySelectOptions(i18n),
    WEAPON_RELIABILITY_SELECT_OPTIONS: buildReliabilitySelectOptions(i18n),
    WEAPON_TYPE_SELECT_OPTIONS: buildWeaponTypeSelectOptions(i18n),
    CYBERWEAR_MODIFIER_TYPE_SELECT_OPTIONS: buildCyberwearModifierOptions(i18n),
    LOCATION_SELECT_OPTIONS: buildLocationOptions(i18n),
    WOUND_TYPE_SELECT_OPTIONS: buildWoundTypeOptions(i18n),
    STAT_SELECT_OPTIONS: buildStatSelectOptions(i18n),
    RELATIVE_AGE_SELECT_OPTIONS: buildRelativeAgeSelectOptions(i18n),
    ITEM_TYPES_SELECT_OPTIONS: buildItemTypeSelectOptions(i18n),
    SKILL_DV_SELECT_OPTIONS: translateObjectKeys(i18n, SKILL_DV),
    SKILL_MODIFIER_SELECT_OPTIONS: translateObjectKeys(i18n, SKILL_MODIFIERS),
    TO_HIT_DV_SELECT_OPTIONS: translateObjectKeys(i18n, TO_HIT_DV),
    TO_HIT_MODIFIERS_SELECT_OPTIONS: translateObjectKeys(i18n, TO_HIT_MODIFIERS),
    HEALTH_ACTION_SELECT_OPTIONS: buildHealthActionTypeOptions(i18n)
  }
  return context
}
