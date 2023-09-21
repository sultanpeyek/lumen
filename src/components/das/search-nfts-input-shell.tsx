import {Card, CardContent, CardHeader} from '@/components/ui/card'
import {Skeleton} from '@/components/ui/skeleton'

export function SearchNftsInputShell() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-full max-w-[140px] h-[18px] rounded-full" />
        <Skeleton className="w-full max-w-[360px] h-[18px] rounded-full" />
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex w-full items-center space-x-2">
          <div className="flex-1 h-9 rounded-md border border-muted bg-popover py-2 px-3">
            <Skeleton className="h-4 max-w-[240px] w-full" />
          </div>
          <Skeleton className="h-9 w-9" />
        </div>
      </CardContent>
    </Card>
  )
}
