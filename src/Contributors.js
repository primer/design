import React, {useEffect, useState} from 'react'
import {Link, Text, Avatar, Box} from '@primer/components'

function generateContributors(authors) {
  return authors.map((author, i) =>
    <Text>
      <Link href={author.url}>
        {author.login}
      </Link>
      {authors.length > 1 && (authors.length - 1 !== i) && ', '}
    </Text>
  )
}

function generateLastEdited(authors) {
  if (authors.length > 0) {
    const lastAuthor = authors[0]
    const day = lastAuthor.time.getDate()
    const month = lastAuthor.time.getMonth()
    const year = lastAuthor.time.getFullYear()
    return (
      <span>
        <Avatar src={lastAuthor.avatar}/>
        <Link href={lastAuthor.url}> {lastAuthor.login}</Link> on <Link color='gray.5' href={lastAuthor.commit_url}>{`${month + 1}-${day}-${year}`}</Link>
      </span>
    )
  }
}

const Contributors = ({filePath, repoPath}) => {
  const [authors, setAuthors] = useState([])
  useEffect(() => {
    const url = `https://api.github.com/repos/${repoPath}/commits?path=${filePath}`
    fetch(url)
      .then(response => response.json())
      .then(commits => {
        const commitData = [];
        const ids = []
        for (var i = 0; i < commits.length; i++) {
          if (!ids.includes(commits[i].author.id)) {
            commitData.push({
              login: commits[i].author.login,
              url: commits[i].author.html_url,
              avatar: commits[i].author.avatar_url,
              time: new Date(commits[i].commit.author.date),
              commit_url: commits[i].html_url
            });
            ids.push(commits[i].author.id)
          }
        }
        setAuthors(commitData)
      })
  }, [filePath])

  return (
    <Text fontSize={1}>
      <Box>
        <Text fontWeight='bold'>Contributors: </Text>
        {generateContributors(authors)}
      </Box>
      <Box>
        <Text fontWeight='bold'>Last edited by: </Text>
        {generateLastEdited(authors)}
      </Box>
    </Text>
  )
}

export default Contributors
