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
import {Label} from '@/components/ui/label'
import {Switch} from '@/components/ui/switch'
import {useRouter} from 'next/navigation'
import * as React from 'react'
import {FaSearch} from 'react-icons/fa'

interface SearchNftsByCreatorInputProps {
  defaultValue: string
  onlyVerified?: boolean
}

export function SearchNftsByCreatorInput({
  defaultValue,
  onlyVerified,
}: SearchNftsByCreatorInputProps) {
  const router = useRouter()

  const [input, setInput] = React.useState(defaultValue ?? '')
  const inputLength = input.trim().length

  const [isOnlyVerified, setIsOnlyVerified] = React.useState(
    onlyVerified ?? false,
  )

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const url = `/assets/creator/${
      isOnlyVerified ? 'verified' : 'all'
    }/${input}`
    router.push(url, {scroll: false})
  }

  const setSampleCreatorAddress = () => {
    setInput('FEg3mmpcrcRsVTuc2n3oghHpRvAtEJJau4KWjaPpLKcA')
    setIsOnlyVerified(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search NFT by Creator</CardTitle>
        <CardDescription>
          Enter a Creator address to begin your search or{' '}
          <span
            className="text-primary cursor-pointer"
            onClick={setSampleCreatorAddress}
          >
            use a sample address
          </span>{' '}
          to see how it works.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              id="creatorAddress"
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
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="only-verified"
              checked={isOnlyVerified}
              onCheckedChange={checked => setIsOnlyVerified(checked)}
            />
            <Label htmlFor="only-verified">
              Only show NFTs verified by the entered creator
            </Label>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
