import {FetchTimeSpentText} from '@/components/das/fetch-time-spent-text'
import {NftDetailsCard} from '@/components/das/nft-details-card'
import {NftDetailsCardShell} from '@/components/das/nft-details-card-shell'
import {SearchNftsByIdInput} from '@/components/das/search-nfts-by-id-input'
import {extractData} from '@/lib/extract-data'
import {getAsset} from '@/lib/get-asset'
import {notFound} from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

export const revalidate = 600

export default async function Page({params}: PageProps) {
  const {id} = params

  const startTime = Date.now()

  const result = await getAsset(id)

  const endTime = Date.now()
  const timeSpentInMs = endTime - startTime
  console.log(`getAsset: ${timeSpentInMs}ms`)

  const extractedData = extractData([result])

  if (!extractedData || extractedData.length === 0) {
    notFound()
  }

  return (
    <>
      <SearchNftsByIdInput defaultValue={id} />
      <NftDetailsCard data={result} />
      <FetchTimeSpentText timeSpentInMs={timeSpentInMs} methodType="getAsset" />
    </>
  )
}
