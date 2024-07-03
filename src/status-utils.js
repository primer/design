/** Status order: later elements have higher precedence. */
const statusOrder = [
  'deprecated',
  'draft',
  'experimental',
  'alpha',
  'beta',
  'stable'
]

/**
 * Get the latest status, based on the order of precedence
 *
 * @param {readonly string[]} statuses list of status to pick from
 * @returns {string | null} latest status if valid, `null` otherwise
 */
export const latestStatusFrom = (statuses) => {
  return statuses
      .filter(status => statusOrder.includes(status))
      .sort(compareStatuses)
      .at(-1) || null
}

/**
 * Sort a list of statuses based on the order of precedence.
 *
 * @param {readonly string[]} statuses list of statuses
 * @returns {string[]} the given statuses, sorted by precedence
 */
export const sortStatuses = (statuses) => {
  return statuses.sort(compareStatuses)
}

/**
 * Compare function, which is compatible with #Array.sort.
 *
 * @param {string} first
 * @param {string} second
 * @returns {1 | 0 | -1} sorting order
 */
export const compareStatuses = (first, second) => {
  const firstRank = statusOrder.indexOf(first)
  const secondRank = statusOrder.indexOf(second)

  if (firstRank > secondRank) {
    return 1
  } else if (firstRank < secondRank) {
    return -1
  } else {
    return 0
  }
}
