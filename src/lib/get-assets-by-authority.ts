import {zod} from '@/lib/zod'
import {ExtendedGetAssetResponseList} from '@/types/das'
import {Helius} from 'helius-sdk'
import {z} from 'zod'

export const getAssetsByAuthority = zod(
  z.string(),
  async (authorityAddress): Promise<ExtendedGetAssetResponseList> => {
    const startTime = Date.now()

    const helius = new Helius(process.env.HELIUS_API_KEY!)

    let page = 1
    let hasMoreResults = true
    let totalResults = []
    const MAX_ITEMS_PER_REQUEST = 1000

    while (hasMoreResults) {
      const result = await helius.rpc.getAssetsByAuthority({
        authorityAddress,
        page,
      })
      totalResults.push(...result.items)

      if (result.items.length < MAX_ITEMS_PER_REQUEST) {
        hasMoreResults = false
      } else {
        page++
      }
    }

    const response = {
      total: totalResults.length,
      limit: MAX_ITEMS_PER_REQUEST,
      page: page - 1,
      items: totalResults,
    }

    const endTime = Date.now()
    const timeSpent = endTime - startTime // in milliseconds

    console.log(`getAssetsByAuthority: ${timeSpent}ms`)

    return {...response, timeSpent}
  },
)
