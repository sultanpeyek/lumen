import {DAS} from 'helius-sdk'

export interface ExtendedGetAssetResponse extends DAS.GetAssetResponse {
  timeSpent?: number
}

export interface ExtendedGetAssetResponseList extends DAS.GetAssetResponseList {
  timeSpent?: number
}

export interface Asset {
  id: string
  name: string
  symbol: string
  image: string
  collectionName: string
}
