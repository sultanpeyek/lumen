export function safeLocalStorageGetItem(key: string) {
  if (typeof localStorage === 'undefined') {
    console.warn('localStorage is not available.')
    return null
  }

  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeLocalStorageSetItem(key: string, value: string) {
  if (typeof localStorage === 'undefined') {
    console.warn('localStorage is not available.')
  }

  try {
    localStorage.setItem(key, value)
  } catch {
    // Here, we can add a fallback mechanism or handle the error gracefully.
    // For example, we can use a cookie or IndexedDB, or simply ignore.
    console.error("Couldn't write to localStorage.")
  }
}

export function safeLocalStorageRemoveItem(key: string) {
  if (typeof localStorage === 'undefined') {
    console.warn('localStorage is not available.')
    return false
  }

  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.warn(`Failed to remove item from localStorage: ${e}`)
    return false
  }
}
