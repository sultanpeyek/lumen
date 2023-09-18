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
import {FrameIcon} from '@radix-ui/react-icons'
import * as React from 'react'

export function SearchInputNFTsByOwner() {
  const [input, setInput] = React.useState('')
  const inputLength = input.trim().length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search NFT by Owner</CardTitle>
        <CardDescription>
          Enter a Solana wallet address to begin your search.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form
          onSubmit={event => {
            event.preventDefault()
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="walletAddress"
            placeholder="Enter Solana wallet address..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            <FrameIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
