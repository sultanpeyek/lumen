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
    cell: ({row}) => shortenAddress(row.getValue('id')),
  },
  {
    accessorKey: 'collectionAddress',
    header: 'Collection',
    cell: ({row}) =>
      row.getValue('collectionAddress')
        ? shortenAddress(row.getValue('collectionAddress'))
        : '-',
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
      },
    },
  })

  return (
    <div className="w-full max-w-full">
      <div className="flex items-center py-4">
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
      <div className="flex items-center justify-end space-x-2 py-4 flex-wrap gap-4">
        <div className="flex-auto flex gap-2">
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
        <div className="flex items-center space-x-2">
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
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
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

function getInitials(name: string) {
  const nameParts = name.split(' ')
  if (nameParts.length === 1) {
    return name[0].toUpperCase()
  } else {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
  }
}

function shortenAddress(address: string) {
  if (address.length <= 8) {
    return address
  }
  return address.substring(0, 4) + '...' + address.substring(address.length - 4)
}
