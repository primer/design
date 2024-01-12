import React from 'react'
import {ActionList, ActionMenu} from '@primer/react'
import {navigate} from 'gatsby'
import {sentenceCase} from 'change-case'
import {sortStatuses} from '../status-utils'

export default function StatusMenu({currentStatus, statuses, parentPath}) {
  statuses = sortStatuses(statuses).reverse()

  return (
    <ActionMenu>
      <ActionMenu.Button><strong>Status: </strong>{sentenceCase(currentStatus)}</ActionMenu.Button>
      <ActionMenu.Overlay width="medium">
        <ActionList selectionVariant="single">
          {statuses.map((status) => {
            return(
              <ActionList.Item selected={currentStatus === status} onSelect={() => navigate(`${parentPath}/${status}`)}>
                {sentenceCase(status)}
              </ActionList.Item>
            )
          })}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}
