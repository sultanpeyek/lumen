import {getAssetsByCreator} from '@/lib/get-assets-by-creator'
import {getAssetsByGroup} from '@/lib/get-assets-by-group'

interface PageProps {
  params: {
    groupKey: string
    groupValue: string
  }
}

export default async function Page({params}: PageProps) {
  const {groupKey, groupValue} = params
  let result = await getAssetsByGroup({
    groupKey,
    groupValue,
  })

  return (
    <div>
      {groupKey}
      {groupValue}
      <div>{result?.timeSpent}</div>
    </div>
  )
}
