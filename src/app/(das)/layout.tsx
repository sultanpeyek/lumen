import {BackToPreviousLink} from '@/components/common/back-to-previous-link'
import Link from 'next/link'
import {IoMdFlashlight} from 'react-icons/io'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="my-4 flex items-center gap-4">
        <BackToPreviousLink />
        <div>
          <div className="text-xl font-bold text-left flex items-center gap-2">
            <IoMdFlashlight className="text-xl text-primary shrink-0" />
            <Link href="/">Lumen — NFT Collection Explorer</Link>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}
