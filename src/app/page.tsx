import {DataTable} from '@/components/das/data-table'
import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchInputNFTsByOwner} from '@/components/das/search-nfts-input-by-owner'

export default function Page() {
  return (
    <div className="px-4">
      <div className="max-w-screen-xl mx-auto space-y-6">
        <h1 className="my-10 text-4xl font-bold text-center">
          Lumen — NFT Collection Explorer
        </h1>
        <SearchCriteriaSelector />
        <SearchInputNFTsByOwner />
        <DataTable />
      </div>
    </div>
  )
}
