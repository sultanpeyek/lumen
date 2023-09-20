import {BackToPreviousLink} from '@/components/common/back-to-previous-link'
import {IoMdFlashlight} from 'react-icons/io'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="my-4 flex items-center gap-4">
        <BackToPreviousLink />
        <div>
          <h1 className="text-xl font-bold text-left flex items-center gap-2">
            <IoMdFlashlight className="text-xl text-primary shrink-0" />
            <span>Lumen — NFT Collection Explorer</span>
          </h1>
        </div>
      </div>
      {children}
    </>
  )
}
