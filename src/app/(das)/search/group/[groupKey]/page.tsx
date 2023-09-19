import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByGroupCollectionInput} from '@/components/das/search-nfts-by-group-collection-input'

export default async function Page() {
  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="group.collection" />
      <SearchNftsByGroupCollectionInput defaultValue="" />
    </>
  )
}
