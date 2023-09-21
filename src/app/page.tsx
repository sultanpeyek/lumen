import {HomepageSetup} from '@/components/common/homepage-setup'
import {SearchMethodSelector} from '@/components/das/search-method-selector'
import {IoMdFlashlight} from 'react-icons/io'

export default function Page() {
  return (
    <>
      <HomepageSetup />
      <div className="my-4 flex justify-center items-center">
        <h1 className="text-lg md:text-4xl font-bold text-left flex items-center space-x-2">
          <IoMdFlashlight className="text-lg md:text-4xl text-primary shrink-0" />
          <div>
            Lumen{' '}
            <small className="font-normal text-muted-foreground">
              — SOL NFT Collection Explorer
            </small>
          </div>
        </h1>
      </div>
      <SearchMethodSelector />
    </>
  )
}
