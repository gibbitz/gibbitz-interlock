/**
 *
 * @param {HTMLElement}                           childNode       The child of
 *                                                                the fieldbox
 *                                                                sought
 * @param {HTMLElement|document|DocumentFragment} grandParentNode The outer
 *                                                                parent containing
 *                                                                the fieldbox
 * @returns {HTMLElement}                                         The fieldbox
 *                                                                containing the
 *                                                                childNode
 */
export const getParentFieldBox = (childNode, grandParentNode = document) =>
  Array.from(
    grandParentNode.querySelectorAll('.field-box')
  ).filter(node => node.contains(childNode))[0]
