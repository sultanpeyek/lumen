import {zod} from '@/lib/zod'
import {getHelius} from '@/lib/helius'
import type {GetAssetResponse} from '@/lib/helius'
import {z} from 'zod'

export const getAssetBatch = zod(
  z.array(z.string()),
  async (ids): Promise<GetAssetResponse[]> => {
    const helius = getHelius()

    const response = await helius.getAssetBatch({ids})

    return response
  },
)
