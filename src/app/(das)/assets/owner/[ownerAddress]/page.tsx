import {DataTable} from '@/components/das/data-table'
import {FetchTimeSpentText} from '@/components/das/fetch-time-spent-text'
import {SearchNftsByOwnerInput} from '@/components/das/search-nfts-by-owner-input'
import {extractData} from '@/lib/extract-data'
import {getAssetsByOwner} from '@/lib/get-assets-by-owner'
import * as React from 'react'

interface PageProps {
  params: {
    ownerAddress: string
  }
}

export const revalidate = 60

export default async function Page({params}: PageProps) {
  const {ownerAddress} = params

  const startTime = Date.now()

  const result = await getAssetsByOwner(ownerAddress)

  const endTime = Date.now()
  const timeSpentInMs = endTime - startTime
  console.log(`getAssetsByOwner: ${timeSpentInMs}ms`)

  const extractedData = extractData(result.items)

  return (
    <>
      <SearchNftsByOwnerInput defaultValue={ownerAddress} />
      <DataTable data={extractedData} />
      <FetchTimeSpentText
        timeSpentInMs={timeSpentInMs}
        methodType="getAssetsByOwner"
      />
    </>
  )
}
