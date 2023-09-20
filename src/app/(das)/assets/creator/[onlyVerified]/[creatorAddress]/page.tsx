import {DataTable} from '@/components/das/data-table'
import {FetchTimeSpentText} from '@/components/das/fetch-time-spent-text'
import {SearchNftsByCreatorInput} from '@/components/das/search-nfts-by-creator-input'
import {extractData} from '@/lib/extract-data'
import {getAssetsByCreator} from '@/lib/get-assets-by-creator'

interface PageProps {
  params: {
    creatorAddress: string
    onlyVerified: 'verified' | 'all'
  }
}

export const revalidate = 600

export default async function Page({params}: PageProps) {
  const {onlyVerified, creatorAddress} = params

  const startTime = Date.now()

  let result = await getAssetsByCreator({
    creatorAddress,
    onlyVerified: onlyVerified === 'verified',
  })

  const endTime = Date.now()
  const timeSpentInMs = endTime - startTime
  console.log(`getAssetsByCreator: ${timeSpentInMs}ms`)

  const extractedData = extractData(result.items)

  return (
    <>
      <SearchNftsByCreatorInput
        defaultValue={creatorAddress}
        onlyVerified={onlyVerified === 'verified'}
      />
      <DataTable data={extractedData} />
      <FetchTimeSpentText
        timeSpentInMs={timeSpentInMs}
        methodType="getAssetsByCreator"
      />
    </>
  )
}
