import { proportionalArmor } from '@constants/proportionalArmor';
import { armorTypes } from '@constants/armorTypes';

/**
 * calculates armor stopping power from two layered SPs
 * @param { number } sp1 SP value one
 * @param { number } sp2 SP value two
 * @returns { number } resulting SP of layered values
 */

export const calculateLayeredArmorSp = (sp1, sp2) =>
  Math.max(sp1, sp2) + (proportionalArmor[Math.max(sp1, sp2) - Math.min(sp1, sp2)] || 1)

export const calculateLayeredArmorEv = (armorArray) => {
  let totalEV = 0
  const [ HARD, SOFT, COMP ] = armorTypes
  armorArray.forEach(armor => {

  });
}