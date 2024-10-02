// Import necessary modules
const fs = require('fs').promises;
const fastGlob = require('fast-glob');

const isFigmaLink = (match) => {
  return match.startsWith('https://www.figma.com/design/')
}

const findMatches = async (regexPattern, files) => {
  const matches = await Promise.all(
    files.map(async (filePath) => {
      // read file content
      const content = await fs.readFile(filePath, { encoding: 'utf8' })
      // try to find all matches in the file content
      const matches = [...content.matchAll(regexPattern)]
      // for each match, return the first group
      return matches.map((match) => match[1]).filter(isFigmaLink);
    })
  )
  //
  return matches.flat()
}

const run = async () => {
  // get arguments
  const [fileGlob] = process.argv.slice(2)
  if(!fileGlob) {
    console.error('❌ Please provide a file glob as the argument. It needs to be wrapped in quotes.')
    return
  }
  // get all files that match the file glob
  const files = await fastGlob([fileGlob])
  // define the regex pattern to search
  const pattern = /<FigmaImage\s+[^>]*src="([^"]+)"[^>]*>/g
  // find matches in find
  const matches = await findMatches(pattern, files)
  // output result
  console.log(JSON.stringify(matches, null, 2))

}

run()