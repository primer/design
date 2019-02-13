import React, {useEffect, useState} from 'react'
import {Link, Text, Avatar, Box, Flex} from '@primer/components'

function generateContributors(authors) {
  return authors.map((author, i) =>
    <div>
      <Text fontWeight='bold' lineHeight={2}>Contributors: </Text>
      <Link href={author.url}>
        {author.login}
      </Link>
      {authors.length > 1 && (authors.length - 1 !== i) && ', '}
    </div>
  )
}

function generateLastEdited(authors) {
  if (authors.length > 0) {
    const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
    const lastAuthor = authors[0]
    const day = lastAuthor.time.getDate()
    const month = months[lastAuthor.time.getMonth()]
    const year = lastAuthor.time.getFullYear()
    return (
        <Flex alignItems='center'>
          <Text fontWeight='bold' lineHeight={2} mr={1}>Last edited by: </Text>
          <Avatar src={lastAuthor.avatar} mr={1}/>
          <Text>
            <Link href={lastAuthor.url}> {lastAuthor.login}</Link> on <Link color='gray.5' href={lastAuthor.commit_url}>{`${month} ${day}, ${year}`}</Link>
          </Text>
        </Flex>
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
      {generateContributors(authors)}
      {generateLastEdited(authors)}
    </Text>
  )
}

export default Contributors
