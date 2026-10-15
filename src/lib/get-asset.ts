import {zod} from '@/lib/zod'
import {getHelius} from '@/lib/helius'
import type {GetAssetResponse} from '@/lib/helius'
import {z} from 'zod'

export const getAsset = zod(
  z.string(),
  async (id): Promise<GetAssetResponse> => {
    const helius = getHelius()

    const response = await helius.getAsset({id})

    return response
  },
)
