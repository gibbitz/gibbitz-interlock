import { SAVE_TYPES } from '@constants'

export const determineWoundStatus = (param) => {
  const damage = param.system
    ? param.system.health.damage.length
    : param
  return WOUND_STATUSES[Math.ceil(damage / 4)]
}

export const determineHealthSave = (saveType, edgerunner, points) => {
  const damage = points || edgerunner.system.health.damage.length
  let bodyOffset = Math.ceil(damage / 4)
  if (saveType === SAVE_TYPES.DEATH) {
    bodyOffset = bodyOffset > 4
      ? (bodyOffset - 4)
      : 0
  } else {
    bodyOffset = bodyOffset >= 1
      ? (bodyOffset - 1)
      : 0
  }
  const body = edgerunner.system.stats.body.total
  return body - bodyOffset
}
