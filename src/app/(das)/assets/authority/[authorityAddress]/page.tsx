import {DataTable} from '@/components/das/data-table'
import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByAuthorityInput} from '@/components/das/search-nfts-by-authority-input'
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
  let result = await getAssetsByAuthority(authorityAddress)

  const extractedData = extractData(result.items)
  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="owner" />
      <SearchNftsByAuthorityInput defaultValue={authorityAddress} />
      <DataTable data={extractedData} />
      <div>{result?.timeSpent}</div>
    </>
  )
}
