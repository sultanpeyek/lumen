import {DAS} from 'helius-sdk'

export type MethodType =
  | 'getAssetsByOwner'
  | 'getAsset'
  | 'getAssetsByGroup'
  | 'getAssetsByAuthority'
  | 'getAssetsByCreator'

export interface Asset {
  id: string
  name: string
  symbol: string
  image: string
  collectionAddress: string
  rawData: DAS.GetAssetResponse
}
