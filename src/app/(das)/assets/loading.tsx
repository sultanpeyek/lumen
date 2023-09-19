import {DataTableShell} from '@/components/das/data-table-shell'
import {SearchCriteriaSelectorShell} from '@/components/das/search-criteria-selector-shell'
import {SearchNftsInputShell} from '@/components/das/search-nfts-input-shell'

export default function Loading() {
  return (
    <>
      <SearchCriteriaSelectorShell />
      <SearchNftsInputShell />
      <DataTableShell />
    </>
  )
}