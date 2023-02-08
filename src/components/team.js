import {Box, Heading, Link, Text} from '@primer/react'
import React from 'react'
import teamContent from '../data/team'
import MemberContainer from './member-container'

const shapes = ['hexagon', 'square', 'circle', 'diamond']
const alumni = teamContent.filter(member => member.alumni)
const currentMembers = teamContent.filter(member => !member.alumni)

export function Team() {
  return (
    <Box display="flex" flexDirection="column">
      <Box mb={10}>
        <Text as="p" sx={{m: 0, fontSize: 3}}>
          The GitHub Design Infrastructure and Design Engineering teams build and maintain Primer — this includes our
          CSS framework, style guide documentation, Octicons, numerous tools and libraries that support design and
          front-end, and component libraries.
        </Text>

        <Text as="p" sx={{fontSize: 3}}>
          Our team officially formed in early 2016 with just two team members, and keeps on growing, with opportunities
          for apprenticeships and internships in the future. Keep an eye on the GitHub&nbsp;
          <Link href="https://github.com/about/careers">careers page</Link> if you’re interested in new openings on our
          team.
        </Text>
      </Box>

      {getMemberContent(currentMembers)}
      <Heading sx={{color: 'severe.fg', fontSize: 5, lineHeight: 1.25, mb: 7, pb: 3}}>Team alumni</Heading>
      {getMemberContent(alumni)}
    </Box>
  )
}

const getMemberContent = teamMembers => {
  return teamMembers.map((member, i) => (
    <MemberContainer key={member.name} shape={shapes[i % shapes.length]} isOdd={i % 2 === 0} member={member} />
  ))
}
