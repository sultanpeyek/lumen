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

interface SearchNftsByAuthorityInputProps {
  defaultValue: string
}

export function SearchNftsByAuthorityInput({
  defaultValue,
}: SearchNftsByAuthorityInputProps) {
  const router = useRouter()

  const [input, setInput] = React.useState(defaultValue ?? '')
  const inputLength = input.trim().length

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    router.push(`/assets/authority/${input}`, {scroll: false})
  }

  const [isLoading, setIsLoading] = React.useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  const setSampleAuthorityAddress = () => {
    setInput('HVQTKbAmQYBpxSE5sXRNgMtuhDQ7t1ewFpvAGwzAUmFM')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search NFT by Authority</CardTitle>
        <CardDescription>
          Enter an Authority address to begin your search or{' '}
          <span
            className="text-primary cursor-pointer"
            onClick={setSampleAuthorityAddress}
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
            id="authorityAddress"
            placeholder="Enter Authority address..."
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
