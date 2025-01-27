import { SYSTEM_NAME } from './system'

export const SKILL_DV = {
  [`${SYSTEM_NAME}.selects.skillDifficulties.easy`] : 10,
  [`${SYSTEM_NAME}.selects.skillDifficulties.average`] : 15,
  [`${SYSTEM_NAME}.selects.skillDifficulties.difficult`] : 20,
  [`${SYSTEM_NAME}.selects.skillDifficulties.veryDifficult`] : 25,
  [`${SYSTEM_NAME}.selects.skillDifficulties.nearlyImpossible`] : 30
}
export const TO_HIT_DV = {
  [`${SYSTEM_NAME}.selects.ranges.pointBlank`] : 10,
  [`${SYSTEM_NAME}.selects.ranges.close`] : 15,
  [`${SYSTEM_NAME}.selects.ranges.medium`] : 20,
  [`${SYSTEM_NAME}.selects.ranges.long`] : 25,
  [`${SYSTEM_NAME}.selects.ranges.extreme`] : 30,
}
export const RANGE_MULTIPLIERS = [0, 0.25, 0.5, 1, 2]

const BASE_SELECT_TO_HIT_I18N = `${SYSTEM_NAME}.selects.modifiers.toHit`
// modifiers are applied to DV, not roll
export const TO_HIT_MODIFIERS ={
  [`${BASE_SELECT_TO_HIT_I18N}.prompt`]: 0,
  [`${BASE_SELECT_TO_HIT_I18N}.immoble`]: -4,
  [`${BASE_SELECT_TO_HIT_I18N}.largeTarget`]: -4,
  [`${BASE_SELECT_TO_HIT_I18N}.smallTarget`]: 4,
  [`${BASE_SELECT_TO_HIT_I18N}.noTurret`]: 4,
  [`${BASE_SELECT_TO_HIT_I18N}.movingTarget10`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.movingTarget12`]: 4,
  [`${BASE_SELECT_TO_HIT_I18N}.movingTarget14`]: 5,
  [`${BASE_SELECT_TO_HIT_I18N}.fastDraw`]: 3,
  [`${BASE_SELECT_TO_HIT_I18N}.ambush`]: -5,
  [`${BASE_SELECT_TO_HIT_I18N}.calledShot`]: 4,
  [`${BASE_SELECT_TO_HIT_I18N}.indirectFire`]: 5,
  [`${BASE_SELECT_TO_HIT_I18N}.blinded`]: 3,
  [`${BASE_SELECT_TO_HIT_I18N}.silhouetted`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.turning`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.akimbo`]: 3,
  [`${BASE_SELECT_TO_HIT_I18N}.running`]: 3,
  [`${BASE_SELECT_TO_HIT_I18N}.oneHanded`]: 2,
  [`${BASE_SELECT_TO_HIT_I18N}.turret`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.tinyTarget`]: 6,
  [`${BASE_SELECT_TO_HIT_I18N}.aiming1`]: -1,
  [`${BASE_SELECT_TO_HIT_I18N}.aiming2`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.aiming3`]: -3,
  [`${BASE_SELECT_TO_HIT_I18N}.laserSight`]: -1,
  [`${BASE_SELECT_TO_HIT_I18N}.teleSightExt`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.teleSightMed`]: -1,
  [`${BASE_SELECT_TO_HIT_I18N}.ironSights`]: -1,
  [`${BASE_SELECT_TO_HIT_I18N}.smartgun`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.smartgoggles`]: -2,
  [`${BASE_SELECT_TO_HIT_I18N}.3rndBurst`]: -3,
  [`${BASE_SELECT_TO_HIT_I18N}.fullAutoClose`]: -1,
  [`${BASE_SELECT_TO_HIT_I18N}.fullAutoOther`]: 1
}
const BASE_SELECT_DIFF_I18N = `${SYSTEM_NAME}.selects.modifiers.difficulty`
export const SKILL_MODIFIERS = {
  [`${BASE_SELECT_DIFF_I18N}.prompt`]: undefined,
  [`${BASE_SELECT_DIFF_I18N}.complexRepair`]: 2,
  [`${BASE_SELECT_DIFF_I18N}.veryComplex`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.neverDone`]: 6,
  [`${BASE_SELECT_DIFF_I18N}.wrongParts`]: 2,
  [`${BASE_SELECT_DIFF_I18N}.wrongTools`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.unfamiliar`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.stress`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.attack`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.siege`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.wounded1`]: 2,
  [`${BASE_SELECT_DIFF_I18N}.wounded2`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.wounded3`]: 6,
  [`${BASE_SELECT_DIFF_I18N}.drunk`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.hostile`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.veryHostile`]: 6,
  [`${BASE_SELECT_DIFF_I18N}.noInstructions`]: 2,
  [`${BASE_SELECT_DIFF_I18N}.kibbitzing`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.haveNotDone`]: 1,
  [`${BASE_SELECT_DIFF_I18N}.difficultAcrobatics`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.veryDifficultAcrobatics`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.impossibleAcrobatics`]: 5,
  [`${BASE_SELECT_DIFF_I18N}.hiddenInfo`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.wellHiddenItem`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.complexProgram`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.veryComplexProgram`]: 5,
  [`${BASE_SELECT_DIFF_I18N}.complexLock`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.veryComplexLock`]: 5,
  [`${BASE_SELECT_DIFF_I18N}.targetOnGuard`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.hiLight`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.lowLight`]: 3,
  [`${BASE_SELECT_DIFF_I18N}.pitchDark`]: 4,
  [`${BASE_SELECT_DIFF_I18N}.observed`]: 4
}
