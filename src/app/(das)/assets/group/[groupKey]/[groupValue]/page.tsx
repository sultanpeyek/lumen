import {DataTable} from '@/components/das/data-table'
import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByGroupCollectionInput} from '@/components/das/search-nfts-by-group-collection-input'
import {extractData} from '@/lib/extract-data'
import {getAssetsByGroup} from '@/lib/get-assets-by-group'

interface PageProps {
  params: {
    groupKey: string
    groupValue: string
  }
}

export default async function Page({params}: PageProps) {
  const {groupKey, groupValue} = params

  const result = await getAssetsByGroup({
    groupKey,
    groupValue,
  })
  const extractedData = extractData(result.items)

  return (
    <>
      <SearchCriteriaSelector
        selectedCriteriaDefaultValue={`group.${groupKey}`}
      />
      <SearchNftsByGroupCollectionInput defaultValue={groupValue} />
      <DataTable data={extractedData} />
      <div>{result?.timeSpent}</div>
    </>
  )
}
