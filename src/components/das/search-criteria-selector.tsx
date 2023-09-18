import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {FrameIcon} from '@radix-ui/react-icons'

export function SearchCriteriaSelector() {
  const searchCriteria = [
    {value: 'owner', label: 'By Owner'},
    {value: 'mints', label: 'By Mints'},
    {value: 'group', label: 'By Group (Collection)'},
    {value: 'authority', label: 'By Authority'},
    {value: 'creator', label: 'By Creator'},
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT Search Criteria</CardTitle>
        <CardDescription>
          Select your preferred criteria to explore NFT collections.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="owner" className="grid grid-cols-3 gap-4">
          {searchCriteria.map(criteria => (
            <div key={criteria.value}>
              <RadioGroupItem
                value={criteria.value}
                id={criteria.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={criteria.value}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <FrameIcon className="mb-3 h-6 w-6" />
                {criteria.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
