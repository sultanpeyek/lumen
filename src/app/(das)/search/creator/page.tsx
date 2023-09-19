import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByCreatorInput} from '@/components/das/search-nfts-by-creator-input'

export default async function Page() {
  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="creator" />
      <SearchNftsByCreatorInput defaultValue="" />
    </>
  )
}
