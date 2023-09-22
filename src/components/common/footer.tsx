import Link from 'next/link'
import {CONFIG} from '@/config/site'

export default function Footer() {
  const {madeBy, repos, poweredBy} = CONFIG.footer

  return (
    <div className="w-full mx-auto text-white py-4 shadow-md">
      <div className="container md:flex md:justify-between md:items-center">
        <div className="text-center md:text-left mb-2 md:mb-0">
          Made by{' '}
          <Link
            href={madeBy.link}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {madeBy.name}
          </Link>
        </div>

        <div className="flex justify-center text-center space-x-6">
          <Link
            href={repos.link}
            className="group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {repos.label}{' '}
            <span className="text-primary group-hover:underline">
              {repos.platform}
            </span>
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href={poweredBy.link}
            className=" group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {poweredBy.label}{' '}
            <span className="text-primary group-hover:underline">
              {poweredBy.name}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
