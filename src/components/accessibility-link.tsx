import React from 'react'
import {IssueOpenedIcon} from '@primer/octicons-react'
import {Link, StyledOcticon} from '@primer/react'

export function AccessibilityLink({label}){
    return (
        <Link href={`https://github.com/github/primer/issues?q=is%3Aopen+is%3Aissue+label%3A%22component%3A+${label}%22+label%3Aaccessibility`}>
            <StyledOcticon icon={IssueOpenedIcon} sx={{mr: 2}} />
            View open accessibility issues related to this component
        </Link>
    )
}
