import {DataTable} from '@/components/das/data-table'
import {FetchTimeSpentText} from '@/components/das/fetch-time-spent-text'
import {extractData} from '@/lib/extract-data'
import {getAssetsByAuthority} from '@/lib/get-assets-by-authority'

interface PageProps {
  params: {
    authorityAddress: string
  }
}

export const revalidate = 600

export default async function Page({params}: PageProps) {
  const {authorityAddress} = params

  const startTime = Date.now()

  let result = await getAssetsByAuthority(authorityAddress)

  const endTime = Date.now()
  const timeSpentInMs = endTime - startTime
  console.log(`getAssetsByAuthority: ${timeSpentInMs}ms`)

  const extractedData = extractData(result.items)

  return (
    <>
      <DataTable data={extractedData} />
      <FetchTimeSpentText
        timeSpentInMs={timeSpentInMs}
        methodType="getAssetsByAuthority"
      />
    </>
  )
}
