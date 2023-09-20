import {Skeleton} from '@/components/ui/skeleton'

export function NftDetailsCardShell() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div>
          <Skeleton className="text-lg w-1/4 h-4" />
          <Skeleton className="truncate text-sm w-2/4 h-4 mt-2" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-start justify-start mt-4">
          <Skeleton className="w-full h-[300px] rounded-md" />

          <div>
            <Skeleton className="text-2xl w-1/2 h-6 mt-2" />
            <Skeleton className="w-3/4 h-4 mt-2" />
            <div className="mt-4">
              <Skeleton className="text-xl w-1/3 h-6" />
              <Skeleton className="mt-2 w-full h-4" />
            </div>
            <div className="mt-4">
              <Skeleton className="text-xl w-1/3 h-6" />
              <Skeleton className="mt-2 w-full h-4" />
            </div>
            <div className="mt-4">
              <Skeleton className="text-xl w-1/3 h-6" />
              <Skeleton className="mt-2 w-full h-4" />
            </div>
          </div>
        </div>

        <div className="flex mt-6 space-x-4">
          <Skeleton className="w-40 h-9 rounded-md" />
          <Skeleton className="w-48 h-9 rounded-md" />
        </div>
      </div>
    </div>
  )
}
