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
import {useRouter} from 'next/navigation'
import * as React from 'react'
import {FaSearch} from 'react-icons/fa'

interface SearchNftsByCreatorInputProps {
  defaultValue: string
}

export function SearchNftsByCreatorInput({
  defaultValue,
}: SearchNftsByCreatorInputProps) {
  const router = useRouter()

  const [input, setInput] = React.useState(defaultValue ?? '')
  const inputLength = input.trim().length

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/assets/creator/verified/${input}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search NFT by Creator</CardTitle>
        <CardDescription>
          Enter a Creator address to begin your search.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form
          onSubmit={handleFormSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="walletAddress"
            placeholder="Enter Creator address..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            <FaSearch className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
