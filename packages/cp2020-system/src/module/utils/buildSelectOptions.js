import { translateObjectKeysFromValues } from './i18n/translateObjectKeysFromValues'
import { translateObjectValuesFromKeys } from './i18n/translateObjectValuesFromKeys'
import {
  CORE_STATS,
  HIT_LOCATIONS,
  HIT_LOCATION_I18N_BASE,
  ITEM_AVAILABILITIES,
  ITEM_AVAILABILITY_I18N_BASE,
  ITEM_DOCUMENT_TYPES,
  ITEM_I18N_BASE,
  MODIFIER_TYPES,
  CYBERWEAR_MODIFIER_TYPE_I18N_BASE,
  RELATIVE_AGE_I18N_BASE,
  RELATIVE_AGE_KEYS,
  RELATIVE_AGE_VALUES,
  STATS_I18N_BASE,
  WEAPON_CONCEALABILITIES,
  WEAPON_CONCEALABILITY_I18N_BASE,
  WEAPON_TYPES,
  WEAPON_TYPE_I18N_BASE
} from '@constants'

/**
 * builds key value pairs of the localized sibling relative age (younger|older|twin)
 * for use as select <option/>s
 * @param {Localization} i18n the i18n class that provides the localize function
 * @returns {Object} key -> value pairs like `{ Younger: 1 }`
 */
export const buildRelativeAgeSelectOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    RELATIVE_AGE_VALUES,
    (_val, index) => `${RELATIVE_AGE_I18N_BASE}.${RELATIVE_AGE_KEYS[index]}`
  )

/**
 * builds key value pairs of the localized availabilities (common, poor, rare, etc.)
 * for use as select <option/>s
 * @param {Localization} i18n the i18n class that provides the localize function
 * @returns {Object} key -> value pairs like `{ C: 'Common' }`
 */
export const buildAvailabilitiesSelectOptions = (i18n) =>
  translateObjectValuesFromKeys(
    i18n,
    ITEM_AVAILABILITIES,
    (val) => `${ITEM_AVAILABILITY_I18N_BASE}.${val}.long`
  )

/**
 * builds key value pairs of the localized concealability (pocket, long coat, etc.)
 * for use as select <option/>s
 * @param {Localization} i18n the i18n class that provides the localize function
 * @returns {Object} key -> value pairs like `{ longCoat: 'Long Coat' }`
 */
export const buildConcealabilitySelectOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    WEAPON_CONCEALABILITIES,
    (val) => `${WEAPON_CONCEALABILITY_I18N_BASE}.${val}.long`
  )

/**
 * builds key value pairs of the localized modifier type name and the internal name
 * for use as select <option/>s
 * @param {Localization} i18n the internationalization class from Foundry that provides the localize function
 * @returns {Object} key -> value pairs of localized name and internal name
 */
export const buildCyberwearModifierOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    MODIFIER_TYPES,
    (val) => `${CYBERWEAR_MODIFIER_TYPE_I18N_BASE}.${val}`
  )

/**
 * builds key value pairs of the localized Hit Location name and the internal Hit Location subpath
 * for use as select <option/>s
 * @param {Localization} i18n the internationalization class from Foundry that provides the localize function
 * @returns {Object} key -> value pairs of name and abbreviation
 */
export const buildLocationOptions = (i18n) =>
  translateObjectValuesFromKeys(
    i18n,
    HIT_LOCATIONS,
    (val) => `${HIT_LOCATION_I18N_BASE}.${val}`
  )

/**
 * builds key value pairs of the localized Core Stat name and the internal Stat abbreviation
 * for use as select <option/>s
 * @param {Localization} i18n the internationalization class from Foundry that provides the localize function
 * @returns {Object} key -> value pairs of name and abbreviation
 */
export const buildStatSelectOptions = (i18n) =>
  translateObjectValuesFromKeys(
    i18n,
    CORE_STATS,
    (val) => `${STATS_I18N_BASE}.${val}.long`
  )

/**
 * builds key value pairs of the localized weaponTypes (handgun, melee, etc.)
 * for use as select <option/>s
 * @param {Localization} i18n the i18n class that provides the localize function
 * @returns {Object} key -> value pairs like `{ heavyWeapons: 'Heavy Weapons' }`
 */
export const buildWeaponTypeSelectOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    WEAPON_TYPES,
    (val) => `${WEAPON_TYPE_I18N_BASE}.${val}.long`
  )
/**
 * builds key value pairs of the localized Item Document Types (Outfit, Weapon, Cyberware, etc.)
 * for use as select <option/>s
 * @param {Localization} i18n the i18n class that provides the localize function
 * @returns {Object} key -> value pairs like `{ heavyWeapons: 'Heavy Weapons' }`
 */
export const buildItemTypeSelectOptions = (i18n) =>
  translateObjectKeysFromValues(
    i18n,
    Object.values(ITEM_DOCUMENT_TYPES),
    (val) => `${ITEM_I18N_BASE}.${(val?.toLowerCase())}.label`
  )
