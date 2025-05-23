/**
 * proportionalArmor is an Array whose indexes reprersent differences between
 * layered armor SPs and values represent the bonus of layering
 * @example
 *  proportionalArmor[Math.max(tShirtSp, armorJackSp) - Math.min(tShirtSp, armorJackSp)]
 * */
export const proportionalArmor = new Array(28)
  .fill(undefined)
  .map((_nill, index) => {
    if (index < 5) {
      return 5
    }
    if (index < 9) {
      return 4
    }
    if (index < 15) {
      return 3
    }
    if (index < 21) {
      return 2
    }
    if (index < 27) {
      return 1
    }
  }
)
