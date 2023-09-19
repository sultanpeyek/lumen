import {zod} from '@/lib/zod'
import {DAS, Helius} from 'helius-sdk'
import {z} from 'zod'

export const getAsset = zod(
  z.string(),
  async (id): Promise<DAS.GetAssetResponse> => {
    const helius = new Helius(process.env.HELIUS_API_KEY!)

    const response = await helius.rpc.getAsset(id)

    return response
  },
)
