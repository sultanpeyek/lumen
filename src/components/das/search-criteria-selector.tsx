import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {searchCriteria} from '@/config/site'
import {cn} from '@/lib/utils'
import Link from 'next/link'
import * as React from 'react'

interface SearchCriteriaSelectorProps {
  selectedCriteriaDefaultValue: string
}

export function SearchCriteriaSelector({
  selectedCriteriaDefaultValue,
}: SearchCriteriaSelectorProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>NFT Search Criteria</CardTitle>
          <CardDescription>
            Select your preferred criteria to explore NFT collections.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-3 gap-4">
            {searchCriteria.map(criteria => (
              <Link href={`${criteria.searchUrlPath}`} key={criteria.value}>
                <Label
                  htmlFor={criteria.value}
                  className={cn(
                    'flex flex-col items-center justify-between h-full text-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                    {
                      'border-primary':
                        criteria.value === selectedCriteriaDefaultValue,
                    },
                  )}
                >
                  {criteria.icon}
                  {criteria.label}
                </Label>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
