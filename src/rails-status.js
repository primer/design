const statusOrder = [
  'deprecated',
  'experimental',
  'alpha',
  'beta',
  'stable'
]

export const latestStatusFrom = (statuses) => {
  let highestRank = -1
  let latestStatus = null

  for (const status of statuses) {
    const rank = statusOrder.indexOf(status)

    if (rank > highestRank) {
      highestRank = rank
      latestStatus = status
    }
  }

  return latestStatus
}

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
