import {BackToPreviousLink} from '@/components/common/back-to-previous-link'
import Heading from '@/components/common/heading'
export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="mt-4 flex items-center space-x-4">
        <BackToPreviousLink />
        <Heading />
      </div>
      {children}
    </>
  )
}
