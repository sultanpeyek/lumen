import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {CONFIG} from '@/config/site'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import * as React from 'react'

export function SearchMethodSelector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT Search Method</CardTitle>
        <CardDescription>
          Select your preferred method to explore NFT collections.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(CONFIG.searchMethods).map(([key, method]) => (
            <Link href={`${method.searchUrlPath}`} key={key}>
              <Label
                htmlFor={key}
                className={cn(
                  'flex flex-col items-center justify-between h-full text-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer active:border-primary',
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
  )
}
