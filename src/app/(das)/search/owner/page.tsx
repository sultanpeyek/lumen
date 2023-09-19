import {SearchCriteriaSelector} from '@/components/das/search-criteria-selector'
import {SearchCriteriaSelectorShell} from '@/components/das/search-criteria-selector-shell'
import {SearchNftsByOwnerInput} from '@/components/das/search-nfts-by-owner-input'
import {SearchNftsInputShell} from '@/components/das/search-nfts-input-shell'

export default async function Page() {
  return (
    <>
      <SearchCriteriaSelector selectedCriteriaDefaultValue="owner" />
      <SearchNftsByOwnerInput defaultValue="" />
    </>
  )
}
