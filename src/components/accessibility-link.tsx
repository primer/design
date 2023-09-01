import React from 'react'
import {IssueOpenedIcon} from '@primer/octicons-react'

export function AccessibilityLink({label}){
    return <><IssueOpenedIcon /> <a target="_blank" href={`https://github.com/github/primer/issues?q=is%3Aopen+is%3Aissue+label%3A%22component%3A+${label}%22+label%3Aaccessibility`}> View open accessibility issues related to this component</a></>
}
