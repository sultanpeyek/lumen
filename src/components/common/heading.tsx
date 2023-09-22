import Link from 'next/link'
import {IoMdFlashlight} from 'react-icons/io'
import {CONFIG} from '@/config/site'

export default function Heading() {
  return (
    <div className="flex items-center space-x-2">
      <IoMdFlashlight className="text-2xl text-primary shrink-0" />
      <Link
        href="/"
        className="hover:opacity-80 transition-opacity duration-200"
      >
        <h1 className="text-lg">
          {CONFIG.heading.title}{' '}
          <small className="font-normal text-sm text-muted-foreground">
            — {CONFIG.heading.description}
          </small>
        </h1>
        <h2 className="font-normal text-xs text-muted-foreground">
          {CONFIG.heading.slogan}
        </h2>
      </Link>
    </div>
  )
}
