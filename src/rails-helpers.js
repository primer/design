const statusOrder = [
  'deprecated',
  'experimental',
  'alpha',
  'beta',
  'stable'
]

const latestStatusFrom = (statuses) => {
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

module.exports.latestStatusFrom = latestStatusFrom
