import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByAuthorityInput} from '@/components/das/search-nfts-by-authority-input'

export default async function Page() {
  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="authority" />
      <SearchNftsByAuthorityInput defaultValue="" />
    </>
  )
}
