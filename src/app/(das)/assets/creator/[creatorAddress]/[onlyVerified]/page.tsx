import {DataTable} from '@/components/das/data-table'
import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByCreatorInput} from '@/components/das/search-nfts-by-creator-input'
import {extractData} from '@/lib/extract-data'
import {getAssetsByCreator} from '@/lib/get-assets-by-creator'

interface PageProps {
  params: {
    creatorAddress: string
    onlyVerified: 'verified' | 'all'
  }
}

export default async function Page({params}: PageProps) {
  const {creatorAddress, onlyVerified} = params
  let result = await getAssetsByCreator({
    creatorAddress,
    onlyVerified: onlyVerified === 'verified',
  })

  const extractedData = extractData(result.items)

  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="owner" />
      <SearchNftsByCreatorInput defaultValue={creatorAddress} />
      <DataTable data={extractedData} />
      <div>{result?.timeSpent}</div>
    </>
  )
}
