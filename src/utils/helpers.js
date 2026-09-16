/**
 * Combines conditional class names into a single clean string.
 * @param  {...(string|boolean|null|undefined)} classes 
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Truncate a string to a given length and append ellipsis.
 * @param {string} str 
 * @param {number} length 
 * @returns {string}
 */
export function truncate(str, length = 100) {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
}
