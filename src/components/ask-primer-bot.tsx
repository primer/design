import VisuallyHidden from '@primer/gatsby-theme-doctocat/src/components/visually-hidden'
import {TrashIcon} from '@primer/octicons-react'
import {Box, Button, Flash, Heading, Link, Spinner, Text, Textarea, ThemeProvider} from '@primer/react'
import React from 'react'

export function AskPrimerBot() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [responses, setResponses] = React.useState<{id: string; question: string; answer: string; sources: string[]}[]>(
    () => {
      // Load from localStorage
      if (typeof localStorage === 'undefined') return []
      const storedResponses = localStorage.getItem('responses')
      return storedResponses ? JSON.parse(storedResponses) : []
    },
  )

  return (
    // @ts-ignore ThemeProviderProps should include `children`
    <ThemeProvider>
      <Box sx={{display: 'grid', gap: 6}}>
        <Box
          as="form"
          sx={{display: 'flex', gap: 2, flexDirection: 'column'}}
          onSubmit={async event => {
            event.preventDefault()
            const formElement = event.currentTarget
            const formData = new FormData(event.currentTarget)
            const question = String(formData.get('question'))

            if (!question) return

            console.log(question)
            try {
              setIsLoading(true)

              // Ask the bot
              const response = await fetch(
                `https://app-50883.on-aptible.com/ask?question=${encodeURIComponent(question)}`,
              ).then(res => res.text())

              // Parse the response
              const [answer, sources] = response.split('SOURCES:')

              // Add the response to the list
              const newResponses = [
                {
                  id: crypto.randomUUID(),
                  question,
                  answer: answer.trim(),
                  sources:
                    sources
                      .split(',')
                      .map(s => s.trim())
                      .filter(s => s.startsWith('http')) || [],
                },
                ...responses,
              ]

              // Update state
              setResponses(newResponses)

              // Save to localStorage
              localStorage.setItem('responses', JSON.stringify(newResponses))

              // Reset the form
              formElement.reset()
            } catch (error) {
              console.error(error)
              setError(error)
            } finally {
              setIsLoading(false)
            }
          }}
        >
          <Textarea
            name="question"
            aria-label="Question"
            placeholder="e.g. Should I use a two column layout inside a dialog?"
            sx={{width: '100%'}}
            rows={3}
            onKeyDown={event => {
              // Submit the form when the user presses command + enter
              if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                event.currentTarget.form?.requestSubmit()
              }
            }}
          />
          <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <Button type="submit" sx={{alignSelf: 'start'}} disabled={isLoading}>
              Submit question
            </Button>
            {isLoading ? <Spinner size="small" /> : null}
          </Box>
        </Box>

        {error ? <Flash variant="danger">{error.message}</Flash> : null}

        <Box sx={{display: 'grid', gap: 4}}>
          {responses.map(({id, question, answer, sources}) => (
            <Box
              key={id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 2,
                p: 3,
                border: '1px solid',
                borderRadius: 2,
                borderColor: 'border.subtle',
                boxShadow: 'shadow.small',
              }}
            >
              <Heading as="h3" sx={{fontSize: 2}}>
                {question}
              </Heading>
              <Text as="p" sx={{m: 0, color: 'fg.muted'}}>
                {answer}
              </Text>
              <VisuallyHidden>
                <h4>Sources</h4>
              </VisuallyHidden>
              {sources.length > 0 ? (
                <Box as="ul" sx={{m: 0, '& li::marker': {color: 'fg.subtle'}}}>
                  {sources.map(source => (
                    <li key={source}>
                      {source.startsWith('http') ? (
                        <Link href={source} sx={{wordBreak: 'break-all'}}>
                          {source}
                        </Link>
                      ) : (
                        <Text sx={{color: 'fg.subtle'}}>{source}</Text>
                      )}
                    </li>
                  ))}
                </Box>
              ) : null}
              <Button
                sx={{mt: 2}}
                variant="invisible"
                leadingIcon={TrashIcon}
                onClick={() => {
                  const newResponses = responses.filter(r => r.id !== id)
                  setResponses(newResponses)
                  localStorage.setItem('responses', JSON.stringify(newResponses))
                }}
              >
                Clear answer
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
