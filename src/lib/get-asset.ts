import {zod} from '@/lib/zod'
import {ExtendedGetAssetResponse} from '@/types/das'
import {DAS, Helius} from 'helius-sdk'
import {z} from 'zod'

export const getAsset = zod(
  z.string(),
  async (id): Promise<ExtendedGetAssetResponse> => {
    const startTime = Date.now()

    const helius = new Helius(process.env.HELIUS_API_KEY!)

    const response = await helius.rpc.getAsset(id)

    const endTime = Date.now()
    const timeSpent = endTime - startTime // in milliseconds

    console.log(`getAsset: ${timeSpent}ms`)

    return {...response, timeSpent}
  },
)
