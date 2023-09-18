import {getAssetsByAuthority} from '@/lib/get-assets-by-authority'

interface PageProps {
  params: {
    authorityAddress: string
  }
}

export default async function Page({params}: PageProps) {
  const {authorityAddress} = params
  let result = await getAssetsByAuthority(authorityAddress)

  return (
    <div>
      {authorityAddress}
      <div>{result?.timeSpent}</div>
    </div>
  )
}
