'use client'

import * as React from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  DownloadIcon,
} from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Input} from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {NftDetailsDialog} from '@/components/das/nft-details-dialog'
import {Asset} from '@/types/das'
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import {
  safeLocalStorageGetItem,
  safeLocalStorageSetItem,
} from '@/lib/safe-local-storage'
import {usePathname} from 'next/navigation'
import {useIsMounted} from '@/hooks/use-is-mounted'
import Image from 'next/image'
import {useToast} from '@/components/ui/use-toast'
import {CONFIG} from '@/config/api'
import {DAS} from 'helius-sdk'

interface DataTableProps {
  data: Asset[]
}

const columns: ColumnDef<Asset>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({row}) => (
      <NftDetailsDialog data={row.original}>
        <Avatar className="rounded-sm cursor-pointer">
          {row.original.imageFromCdn ? (
            <AvatarImage asChild src={row.original.imageFromCdn}>
              <Image
                src={row.original.imageFromCdn}
                alt="Image"
                width={40}
                height={40}
                className="object-cover"
              />
            </AvatarImage>
          ) : (
            <AvatarImage src={row.original.imageFromExternalUrl} />
          )}
          <AvatarFallback className="rounded-sm">
            {getInitials(row.getValue('name'))}
          </AvatarFallback>
        </Avatar>
      </NftDetailsDialog>
    ),
  },
  {
    accessorKey: 'name',
    header: ({column}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>NFT Name</span>
              {column.getIsSorted() === 'desc' ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    cell: ({row}) => (
      <div className="flex items-center gap-2">
        <div>{row.getValue('name') !== '' ? row.getValue('name') : '-'}</div>
      </div>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Mint Address',
    cell: ({row}) => (
      <NftDetailsDialog data={row.original}>
        <div className="hover:text-primary hover:underline cursor-pointer">
          {shortenAddress(row.getValue('id'))}
        </div>
      </NftDetailsDialog>
    ),
  },
  {
    accessorKey: 'collectionAddress',
    header: ({column}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Collection Address</span>
              {column.getIsSorted() === 'desc' ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    cell: ({row}) =>
      row.getValue('collectionAddress') ? (
        <Link
          href={`/assets/group/collection/${row.getValue('collectionAddress')}`}
          className="hover:text-primary hover:underline"
        >
          {shortenAddress(row.getValue('collectionAddress'))}
        </Link>
      ) : (
        '-'
      ),
  },
  {
    accessorKey: 'royaltyPercent',
    header: ({column}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>Royalty Percent</span>
              {column.getIsSorted() === 'desc' ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    cell: ({row}) => {
      const value = parseFloat(row.getValue('royaltyPercent')) * 100

      if (value % 1 === 0) {
        return `${value}%`
      }
      return `${value.toFixed(2)}%`
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({row}) => {
      const nft = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(nft.id)}
            >
              Copy Mint Address
            </DropdownMenuItem>
            {nft.collectionAddress && (
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(nft.collectionAddress ?? '')
                }
              >
                Copy Collection Address
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTable({data}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      royaltyPercent: false,
    })
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const pathname = usePathname()
  const localStorageKey = `tablePageIndex${pathname}`

  const isMounted = useIsMounted()
  const initialPageIndex = 0

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: initialPageIndex,
      },
    },
    autoResetPageIndex: false,
  })

  React.useEffect(() => {
    if (isMounted) {
      // 1. Calculate total number of pages
      const totalPages = Math.ceil(
        table.getFilteredRowModel().rows.length / rowsPerPage,
      )

      // 2. Check if current pageIndex exceeds total pages
      let currentPageIndex = parseInt(
        safeLocalStorageGetItem(localStorageKey) || '0',
        10,
      )
      if (currentPageIndex >= totalPages) {
        currentPageIndex = 0 // Reset to 0
      }
      table.setPageIndex(currentPageIndex)
      safeLocalStorageSetItem(localStorageKey, String(currentPageIndex))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    table.getFilteredRowModel().rows.length,
    isMounted,
    rowsPerPage,
  ])

  React.useEffect(() => {
    if (isMounted) {
      safeLocalStorageSetItem(
        localStorageKey,
        String(table.getState().pagination.pageIndex),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().pagination.pageIndex, isMounted])

  const {toast} = useToast()
  React.useEffect(() => {
    if (data.length >= CONFIG.HELIUS_MAX_LIMIT_PER_REQUEST) {
      toast({
        title: 'Demo Limitation',
        description: `The API results are capped at ${CONFIG.HELIUS_MAX_LIMIT_PER_REQUEST} items for demo purposes.`,
        duration: 5000,
      })
    }
  }, [data])

  function downloadIDs(data: Asset[]) {
    // Extract all IDs
    const ids = data.map(item => item.id) // Assuming your data items have an 'id' field

    // Convert the IDs array into a JSON string
    const json = JSON.stringify(ids, null, 2) // The '2' here is for pretty-printing

    // Create a Blob from the JSON string
    const blob = new Blob([json], {type: 'application/json'})
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element and trigger the download
    const a = document.createElement('a')
    a.href = url
    a.download = 'ids.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url)
  }

  function downloadSelectedIDs(data: Asset[], selectedRows: RowSelectionState) {
    // Extract IDs from selected rows using the indices (keys) in the selectedRows object
    const selectedIds = Object.keys(selectedRows).map(
      index => data[parseInt(index)].id,
    )

    // Convert the IDs array into a JSON string
    const json = JSON.stringify(selectedIds, null, 2)

    // Create a Blob from the JSON string
    const blob = new Blob([json], {type: 'application/json'})
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element and trigger the download
    const a = document.createElement('a')
    a.href = url
    a.download = 'selected_ids.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2">
        <div className="flex-auto space-y-1">
          <div className="text-sm text-muted-foreground">
            Showing{' '}
            {Math.min(rowsPerPage, table.getFilteredRowModel().rows.length)} of{' '}
            {table.getFilteredRowModel().rows.length} rows.
          </div>
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <Select
              onValueChange={value => {
                setRowsPerPage(parseInt(value))
                table.setPageSize(parseInt(value))
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={`${rowsPerPage} rows`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 rows</SelectItem>
                <SelectItem value="20">20 rows</SelectItem>
                <SelectItem value="50">50 rows</SelectItem>
                <SelectItem value="100">100 rows</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-x-2 whitespace-nowrap">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 max-w-[200px] sm:max-w-[600px] mx-auto">
        <Button onClick={() => downloadIDs(data)} className="w-full flex">
          <DownloadIcon className="mr-2" />
          <span>
            <span className="hidden md:inline">Download</span> IDs
          </span>
        </Button>
        <Button
          onClick={() => downloadSelectedIDs(data, rowSelection)}
          disabled={Object.keys(rowSelection).length === 0}
          className="w-full flex"
        >
          <DownloadIcon className="mr-2" />
          <span>
            <span className="hidden md:inline">Download</span> Selected IDs
          </span>
        </Button>
      </div>
    </div>
  )
}

function getInitials(name: string): string {
  const nameParts = name.split(' ')
  let initials = ''

  for (const part of nameParts) {
    const char = part.match(/[a-zA-Z]/)
    if (char) {
      initials += char[0].toUpperCase()
      if (initials.length === 2) {
        break
      }
    }
  }

  if (initials.length === 0) {
    return ''
  } else if (initials.length === 1 && nameParts.length > 1) {
    for (let i = 1; i < nameParts.length; i++) {
      const char = nameParts[i].match(/[a-zA-Z]/)
      if (char) {
        initials += char[0].toUpperCase()
        break
      }
    }
  }

  return initials
}

function shortenAddress(address: string) {
  if (address.length <= 8) {
    return address
  }
  return address.substring(0, 4) + '...' + address.substring(address.length - 4)
}
