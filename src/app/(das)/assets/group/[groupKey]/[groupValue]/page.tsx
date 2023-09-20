import {DataTable} from '@/components/das/data-table'
import {FetchTimeSpentText} from '@/components/das/fetch-time-spent-text'
import {SearchNftsByGroupCollectionInput} from '@/components/das/search-nfts-by-group-collection-input'
import {extractData} from '@/lib/extract-data'
import {getAssetsByGroup} from '@/lib/get-assets-by-group'

interface PageProps {
  params: {
    groupKey: string
    groupValue: string
  }
}

export const revalidate = 600

export default async function Page({params}: PageProps) {
  const {groupKey, groupValue} = params

  const startTime = Date.now()

  const result = await getAssetsByGroup({
    groupKey,
    groupValue,
  })

  const endTime = Date.now()
  const timeSpentInMs = endTime - startTime
  console.log(`getAssetsByGroup: ${timeSpentInMs}ms`)

  const extractedData = extractData(result.items)

  return (
    <>
      <SearchNftsByGroupCollectionInput defaultValue={groupValue} />
      <DataTable data={extractedData} />
      <FetchTimeSpentText
        timeSpentInMs={timeSpentInMs}
        methodType="getAssetsByGroup"
      />
    </>
  )
}
