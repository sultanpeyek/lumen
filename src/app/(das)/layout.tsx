import {BackToPreviousLink} from '@/components/common/back-to-previous-link'
import Link from 'next/link'
import {IoMdFlashlight} from 'react-icons/io'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="my-4 flex items-center gap-4">
        <BackToPreviousLink />
        <div className="text-lg font-bold text-left flex items-center space-x-2 hover:opacity-80">
          <IoMdFlashlight className="text-lg text-primary shrink-0" />
          <Link href="/">
            Lumen{' '}
            <small className="font-normal text-muted-foreground">
              — SOL NFT Collection Explorer
            </small>
          </Link>
        </div>
      </div>
      {children}
    </>
  )
}
