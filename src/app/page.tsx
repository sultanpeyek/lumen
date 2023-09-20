import {HomepageSetup} from '@/components/common/homepage-setup'
import {SearchMethodSelector} from '@/components/das/search-method-selector'
import {IoMdFlashlight} from 'react-icons/io'

export default function Page() {
  return (
    <>
      <HomepageSetup />
      <div className="my-4">
        <h1 className="text-4xl font-bold text-center flex items-center gap-2">
          <IoMdFlashlight className="text-4xl text-primary shrink-0" />
          Lumen — NFT Collection Explorer
        </h1>
      </div>
      <SearchMethodSelector />
    </>
  )
}
