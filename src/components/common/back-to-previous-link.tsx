'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {usePathname, useRouter, useSelectedLayoutSegment} from 'next/navigation'
import {FaChevronLeft} from 'react-icons/fa'

export function BackToPreviousLink() {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const isRouterBackEnabled = segment === 'assets'

  const handleRouterBackClick = () => {
    router.back()
  }

  return (
    <>
      {isRouterBackEnabled ? (
        <div className="cursor-pointer" onClick={handleRouterBackClick}>
          <FaChevronLeft className="h-4 w-4" />
        </div>
      ) : (
        <Link href="/" className="cursor-pointer">
          <FaChevronLeft className="h-4 w-4" />
        </Link>
      )}
    </>
  )
}
