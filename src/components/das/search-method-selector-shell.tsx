import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {Skeleton} from '@/components/ui/skeleton'
import {searchMethods} from '@/config/site'
import {cn} from '@/lib/utils'

export function SearchMethodSelectorShell() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-full max-w-[140px] h-[18px] rounded-full" />
        <Skeleton className="w-full max-w-[360px] h-[18px] rounded-full" />
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-3 gap-4">
          {searchMethods.map(criteria => (
            <div
              key={criteria.value}
              className={cn(
                'flex flex-col items-center justify-between rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
              )}
            >
              <Skeleton className="w-full h-[50px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
