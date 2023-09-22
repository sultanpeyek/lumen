'use client'

import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import * as React from 'react'
import {FaSearch, FaSpinner} from 'react-icons/fa'

interface SearchNftsByIdInputProps {
  defaultValue: string
}

export function SearchNftsByIdInput({defaultValue}: SearchNftsByIdInputProps) {
  const router = useRouter()

  const [input, setInput] = React.useState(defaultValue ?? '')
  const inputLength = input.trim().length

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    router.push(`/assets/id/${input}`, {scroll: false})
  }

  const [isLoading, setIsLoading] = React.useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  const setSampleMintAddress = () => {
    setInput('HL9Uadka3nHM6gHYQmBAopBwU79tviorkSYocCJAW1Da')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search NFT by ID (Mint)</CardTitle>
        <CardDescription>
          Enter a Mint address to begin your search or{' '}
          <span
            className="text-primary cursor-pointer"
            onClick={setSampleMintAddress}
          >
            use a sample address
          </span>{' '}
          to see how it works.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form
          onSubmit={handleFormSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="mintAddress"
            placeholder="Enter Mint address..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            {isLoading ? (
              <FaSpinner className="h-4 w-4 animate-spin" />
            ) : (
              <FaSearch className="h-4 w-4" />
            )}
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
