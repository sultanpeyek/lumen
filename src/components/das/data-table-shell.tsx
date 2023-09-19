import {Skeleton} from '@/components/ui/skeleton'

export function DataTableShell() {
  return (
    <div className="w-full max-w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 h-9 rounded-md border-2 border-muted bg-popover py-2 px-3 max-w-[384px]">
          <Skeleton className="h-4 max-w-[240px] w-full" />
        </div>
        <div className="flex-1 h-9 rounded-md border-2 border-muted bg-popover py-2 px-3 max-w-[116px]">
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="rounded-md border overflow-auto">
        <div className="p-2">
          <div className="h-[57px] py-4">
            <Skeleton className="w-full h-[20px] rounded-full" />
          </div>
          <div className="h-[57px] py-4">
            <Skeleton className="w-full h-[20px] rounded-full" />
          </div>
          <div className="h-[57px] py-4">
            <Skeleton className="w-full h-[20px] rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Skeleton className="w-full max-w-[160px] h-[18px] rounded-full" />
        <Skeleton className="w-full max-w-[137px] h-[18px] rounded-full" />
      </div>
    </div>
  )
}
