import {SearchMethodSelector} from '@/components/das/search-method-selector'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <SearchMethodSelector />
      {children}
    </>
  )
}
