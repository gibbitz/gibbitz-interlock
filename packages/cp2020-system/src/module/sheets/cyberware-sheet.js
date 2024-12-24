import { systemLog } from '@utils';
import { OutfitSheet } from './outfit-sheet';

/**
 * Extend the basic OutfitSheet with some modifications specific to Cyberware
 * @extends {OutfitSheet}
 */
export class CyberwareSheet extends OutfitSheet {
  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData()
    systemLog(' CYBERWARE SHEET | ', context)
    return context
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }
}