import {DataTable} from '@/components/das/data-table'
import {extractData} from '@/lib/extract-data'
import {getAssetsByOwner} from '@/lib/get-assets-by-owner'

interface PageProps {
  params: {
    ownerAddress: string
  }
}
export const revalidate = 3600

export default async function Page({params}: PageProps) {
  const {ownerAddress} = params
  let result = await getAssetsByOwner(ownerAddress)

  const extractedData = extractData(result.items)

  return (
    <div>
      By Owner: {ownerAddress}
      <DataTable data={extractedData} />
      <div>{result?.timeSpent}</div>
    </div>
  )
}
