import {DataTable} from '@/components/das/data-table'
import {DataTableShell} from '@/components/das/data-table-shell'
import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByOwnerInput} from '@/components/das/search-nfts-by-owner-input'
import {extractData} from '@/lib/extract-data'
import {getAssetsByOwner} from '@/lib/get-assets-by-owner'
import * as React from 'react'

interface PageProps {
  params: {
    ownerAddress: string
  }
}
export const revalidate = 600

export default async function Page({params}: PageProps) {
  const {ownerAddress} = params
  const result = await getAssetsByOwner(ownerAddress)

  const extractedData = extractData(result.items)

  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="owner" />
      <SearchNftsByOwnerInput defaultValue={ownerAddress} />
      <DataTable data={extractedData} />
      <div>{result?.timeSpent}</div>
    </>
  )
}
