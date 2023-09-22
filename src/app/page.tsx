import Heading from '@/components/common/heading'
import {HomepageSetup} from '@/components/common/homepage-setup'
import {SearchMethodSelector} from '@/components/das/search-method-selector'

export default function Page() {
  return (
    <>
      <div className="mt-4">
        <Heading />
      </div>
      <SearchMethodSelector />
      <HomepageSetup />
    </>
  )
}
