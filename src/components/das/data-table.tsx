'use client'

import * as React from 'react'
import {ChevronDownIcon, DotsHorizontalIcon} from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
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
          <AvatarImage src={row.getValue('image')} alt="Image" />
          <AvatarFallback className="rounded-sm">
            {getInitials(row.getValue('name'))}
          </AvatarFallback>
        </Avatar>
      </NftDetailsDialog>
    ),
  },
  {
    accessorKey: 'name',
    header: 'NFT Name',
    cell: ({row}) => (
      <div className="flex items-center gap-2">
        <div>{row.getValue('name')}</div>
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
    header: 'Collection',
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
    id: 'actions',
    enableHiding: false,
    cell: ({row}) => {
      const payment = row.original

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Mint Address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Download Image</DropdownMenuItem>
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
    React.useState<VisibilityState>({})
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

  return (
    <div className="w-full max-w-full">
      <div className="flex items-center justify-between py-4 space-x-2">
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
      <div className="flex flex-col sm:flex-row items-center py-4 space-y-2">
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
