import {createHelius} from 'helius-sdk'

export type {GetAssetResponseList} from 'helius-sdk/types/das'
export type {GetAssetResponse} from 'helius-sdk/types/types'

export function getHelius() {
  return createHelius({apiKey: process.env.HELIUS_API_KEY!})
}
