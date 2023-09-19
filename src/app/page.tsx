import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByOwnerInput} from '@/components/das/search-nfts-by-owner-input'

export default function Page() {
  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="owner" />
      <SearchNftsByOwnerInput defaultValue="" />
    </>
  )
}
