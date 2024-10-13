// Import necessary modules
import fs from 'fs/promises'
import fastGlob from 'fast-glob'
import {config} from 'dotenv'
import figmaImages from '@primer/figma-images'

config()

const fileGlob = '**/*.mdx'
const outputDir = 'public/images/figma/'

const isFigmaLink = match => {
  return match.startsWith('https://www.figma.com/design/')
}

const findMatches = async (regexPattern, files) => {
  const matches = await Promise.all(
    files.map(async filePath => {
      // read file content
      const content = await fs.readFile(filePath, {encoding: 'utf8'})
      // try to find all matches in the file content
      const matches = [...content.matchAll(regexPattern)]
      // for each match, return the first group
      return matches.map(match => match[1]).filter(isFigmaLink)
    }),
  )
  //
  return matches.flat()
}

const run = async () => {
  // check for Figma API token before proceeding
  if (!process.env.FIGMA_API_TOKEN) {
    console.warn('⚠️ No Figma API token provided. Skipping image download from Figma.')
    console.log('To get a Figma API token, visit https://www.figma.com/developers/api#access-tokens')
    console.log('Then, add the token to an .env file in the root of the project with: FIGMA_API_TOKEN=your-token-here')
    return
  }

  // get all files that match the file glob
  const files = await fastGlob([fileGlob])

  // define the regex pattern to search
  const pattern = /<FigmaImage\s+[^>]*src="([^"]+)"[^>]*>/g

  // find matches in find
  const nodeURLs = await findMatches(pattern, files)

  // fetch and download images
  await figmaImages(process.env.FIGMA_API_TOKEN, {
    nodeURLs,
    outputDir,
    missingImagesLogLevel: 'warn',
  })
}

run()
