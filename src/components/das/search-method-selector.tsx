'use client'

import {SearchNftsByAuthorityInput} from '@/components/das/search-nfts-by-authority-input'
import {SearchNftsByCreatorInput} from '@/components/das/search-nfts-by-creator-input'
import {SearchNftsByGroupCollectionInput} from '@/components/das/search-nfts-by-group-collection-input'
import {SearchNftsByIdInput} from '@/components/das/search-nfts-by-id-input'
import {SearchNftsByOwnerInput} from '@/components/das/search-nfts-by-owner-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {searchMethods} from '@/config/site'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import {notFound, useSelectedLayoutSegments} from 'next/navigation'
import * as React from 'react'

type SearchMethodValue = (typeof searchMethods)[number]['value']

export function SearchMethodSelector() {
  const segments = useSelectedLayoutSegments()

  const selectedMethod: SearchMethodValue | undefined = segments?.[1] // Get value after `/assets` and `/search`

  const isValidMethod = searchMethods.some(
    method => method.value === selectedMethod,
  )
  if (!isValidMethod) {
    notFound()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>NFT Search Method</CardTitle>
          <CardDescription>
            Select your preferred method to explore NFT collections.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-3 gap-4">
            {searchMethods.map(method => (
              <Link href={`${method.searchUrlPath}`} key={method.value}>
                <Label
                  htmlFor={method.value}
                  className={cn(
                    'flex flex-col items-center justify-between h-full text-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                    {
                      'border-primary': method.value === selectedMethod,
                    },
                  )}
                >
                  {method.icon}
                  {method.label}
                </Label>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedMethod === 'owner' && <SearchNftsByOwnerInput defaultValue="" />}

      {selectedMethod === 'id' && <SearchNftsByIdInput defaultValue="" />}

      {selectedMethod === 'group' && (
        <SearchNftsByGroupCollectionInput defaultValue="" />
      )}

      {selectedMethod === 'authority' && (
        <SearchNftsByAuthorityInput defaultValue="" />
      )}

      {selectedMethod === 'creator' && (
        <SearchNftsByCreatorInput defaultValue="" />
      )}
    </>
  )
}
