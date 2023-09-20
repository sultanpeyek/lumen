import {DataTable} from '@/components/das/data-table'
import {FetchTimeSpentText} from '@/components/das/fetch-time-spent-text'
import {SearchNftsByIdInput} from '@/components/das/search-nfts-by-id-input'
import {extractData} from '@/lib/extract-data'
import {getAsset} from '@/lib/get-asset'

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

  return (
    <>
      <SearchNftsByIdInput defaultValue={id} />
      <DataTable data={extractedData} />
      <FetchTimeSpentText timeSpentInMs={timeSpentInMs} methodType="getAsset" />
    </>
  )
}
