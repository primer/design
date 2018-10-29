import React from 'react'
import {Box, Heading} from '@primer/components'

const IndexHero = () => (
  <Box bg="black">
    <Box maxWidth={1012} py={6} mb={3} mx="auto" px={6}>
      <Box mt={4} mb={4}>
        <Heading color="blue.4" fontSize={7} pb={3}>
          Primer Design
        </Heading>
      </Box>
      <Box mb={6}>
        <Heading fontFamily="mono">FPO</Heading>
      </Box>
    </Box>
  </Box>
)

export default IndexHero
