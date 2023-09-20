'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {FaChevronLeft} from 'react-icons/fa'

export function BackToPreviousLink() {
  const router = useRouter()
  const pathname = usePathname()
  const [isRouterBackEnabled, setIsRouterBackEnabled] = useState(false)
  const [initialHistoryLength, setInitialHistoryLength] = useState<
    number | null
  >(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial history length on component mount
      setInitialHistoryLength(window.history.length)
    }
  }, [])

  useEffect(() => {
    // Each time the router changes, compare the current history length to our baseline
    if (
      initialHistoryLength !== null &&
      window.history.length > initialHistoryLength
    ) {
      setIsRouterBackEnabled(true)
    } else {
      setIsRouterBackEnabled(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
