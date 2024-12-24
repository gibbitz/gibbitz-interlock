import { SYSTEM_NAME } from './system'

export const HIT_LOCATION_I18N_BASE = `${SYSTEM_NAME}.hitLocations`

// TODO: should this be a rolltable?
export const WEIGHTED_HIT_LOCATIONS = {
  ['skull']: [1, 2, 3],
  ['right.eye']: [4],
  ['left.eye']: [5],
  ['face']: [6, 7, 8],
  ['neck']: [9, 10],
  ['right.chest']: [11, 12, 13, 14, 15, 16, 17],
  ['left.chest']: [18, 19, 20, 21, 22, 23, 24],
  ['right.stomach']: [25, 26, 27, 28],
  ['left.stomach']: [29, 30, 31, 32],
  ['right.hipBone']: [33, 34, 35],
  ['left.hipBone']: [36, 37, 38],
  ['right.shoulder']: [39, 40],
  ['right.upperArm']: [41, 42, 43],
  ['right.elbow']: [44],
  ['right.forearm']: [45, 46, 47],
  ['right.hand']: [48, 49],
  ['left.shoulder']: [50, 51],
  ['left.upperArm']: [52, 53, 54],
  ['left.elbow']: [55],
  ['left.forearm']: [56, 57, 58],
  ['left.hand']: [59, 60],
  ['right.groin']: [61, 62],
  ['right.hipJoint']: [63, 64],
  ['right.thigh']: [65, 66, 67, 68, 69, 70, 71, 72],
  ['right.knee']: [73, 74],
  ['right.shin']: [75, 76, 77, 78],
  ['right.foot']: [79, 80],
  ['left.groin']: [81, 82],
  ['left.hipJoint']: [83, 84],
  ['left.thigh']: [85, 86, 87, 88, 89, 90, 91, 92],
  ['left.knee']: [93, 94],
  ['left.shin']: [95, 96, 97, 98],
  ['left.foot']: [99, 100]
}

export const HIT_LOCATIONS = Object.keys(WEIGHTED_HIT_LOCATIONS)
export const WOUND_TYPES = ['bruise', 'penetrating']
export const WOUND_STATUSES = [
  'light',
  'serious',
  'criical',
  'mortal_0',
  'mortal_1',
  'mortal_2',
  'mortal_3',
  'mortal_4'
]
