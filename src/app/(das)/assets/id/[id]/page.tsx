import {DataTable} from '@/components/das/data-table'
import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByIdInput} from '@/components/das/search-nfts-by-id-input'
import {extractData} from '@/lib/extract-data'
import {getAsset} from '@/lib/get-asset'

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({params}: PageProps) {
  const {id} = params

  const result = await getAsset(id)
  const extractedData = extractData([result])

  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="id" />
      <SearchNftsByIdInput defaultValue={id} />
      <DataTable data={extractedData} />
      <div>{result?.timeSpent}</div>
    </>
  )
}
