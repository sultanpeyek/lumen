import {Asset} from '@/types/das'
import {DAS} from 'helius-sdk'

export function extractData(data: DAS.GetAssetResponse[]): Asset[] {
  const extractedData = data.map(item => {
    return {
      id: item.id,
      name: item.content?.metadata.name ?? '',
      symbol: item.content?.metadata.symbol ?? '',
      image: item.content?.links?.image ?? '',
      collectionName:
        item.grouping?.find(group => group.group_key === 'collection')
          ?.group_value ?? '',
    }
  })

  return extractedData
}
