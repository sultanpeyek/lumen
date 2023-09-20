'use client'

import * as React from 'react'
import {safeLocalStorageRemoveItem} from '@/lib/safe-local-storage'

// The intention of this page is actually only to provide the mechanics/effects that will be triggered on the client side when a user accesses the homepage.
export function HomepageSetup() {
  React.useEffect(() => {
    removeItemsWithSlug('tablePageIndex')
  }, [])

  return null
}

function removeItemsWithSlug(slug: string) {
  if (typeof localStorage === 'undefined') {
    console.warn('localStorage is not available.')
    return
  }

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i)
    if (key && key.includes(slug)) {
      safeLocalStorageRemoveItem(key)
    }
  }
}
