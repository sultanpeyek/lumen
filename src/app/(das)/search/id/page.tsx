import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchNftsByIdInput} from '@/components/das/search-nfts-by-id-input'

export default async function Page() {
  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="id" />
      <SearchNftsByIdInput defaultValue="" />
    </>
  )
}
