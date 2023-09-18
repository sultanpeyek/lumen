import {zod} from '@/lib/zod'
import {DAS, Helius} from 'helius-sdk'
import {z} from 'zod'

export const getAssetBatch = zod(
  z.array(z.string()),
  async (ids): Promise<DAS.GetAssetResponse[] & {timeSpent?: number}> => {
    const startTime = Date.now()

    const helius = new Helius(process.env.HELIUS_API_KEY!)

    const response = await helius.rpc.getAsset(ids)

    const endTime = Date.now()
    const timeSpent = endTime - startTime // in milliseconds

    console.log(`getAssetBatch: ${timeSpent}ms`)

    return {...response, timeSpent}
  },
)
