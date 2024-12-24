import { HBS_TEMPLATES } from '@constants';

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async () => loadTemplates(HBS_TEMPLATES)

