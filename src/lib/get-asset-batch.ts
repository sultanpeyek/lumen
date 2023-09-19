import {zod} from '@/lib/zod'
import {DAS, Helius} from 'helius-sdk'
import {z} from 'zod'

export const getAssetBatch = zod(
  z.array(z.string()),
  async (ids): Promise<DAS.GetAssetResponse[]> => {
    const helius = new Helius(process.env.HELIUS_API_KEY!)

    const response = await helius.rpc.getAsset(ids)

    return response
  },
)
