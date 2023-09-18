import {getAssetsByCreator} from '@/lib/get-assets-by-creator'

interface PageProps {
  params: {
    creatorAddress: string
    onlyVerified: 'verified' | 'all'
  }
}

export default async function Page({params}: PageProps) {
  const {creatorAddress, onlyVerified} = params
  let result = await getAssetsByCreator({
    creatorAddress,
    onlyVerified: onlyVerified === 'verified',
  })

  return (
    <div>
      {creatorAddress}
      {onlyVerified === 'verified'}
      <div>{result?.timeSpent}</div>
    </div>
  )
}
