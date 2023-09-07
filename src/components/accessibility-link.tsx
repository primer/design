import React from 'react'
import {IssueOpenedIcon} from '@primer/octicons-react'
import {Link} from '@primer/react'

export function AccessibilityLink({label}){
    return <><IssueOpenedIcon /><Link href={`https://github.com/github/primer/issues?q=is%3Aopen+is%3Aissue+label%3A%22component%3A+${label}%22+label%3Aaccessibility`}> View open accessibility issues related to this component</Link></>
}
