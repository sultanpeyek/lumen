import {CONFIG} from '@/config/api'
import {zod} from '@/lib/zod'
import {getHelius} from '@/lib/helius'
import type {GetAssetResponseList} from '@/lib/helius'
import {z} from 'zod'

export const getAssetsByCreator = zod(
  z.object({
    creatorAddress: z.string(),
    onlyVerified: z.boolean(),
  }),
  async (input): Promise<GetAssetResponseList> => {
    const {creatorAddress, onlyVerified} = input

    const helius = getHelius()

    let page = 1
    let hasMoreResults = true
    let totalResults = []
    const MAX_ITEMS_PER_REQUEST = CONFIG.MAX_API_REQUEST_ITEMS

    while (hasMoreResults) {
      const result = await helius.getAssetsByCreator({
        creatorAddress,
        onlyVerified,
        page,
        limit: CONFIG.HELIUS_MAX_LIMIT_PER_REQUEST,
      })

      if (!result || !result.items || result.items.length === 0) {
        hasMoreResults = false
      } else {
        totalResults.push(...result.items)

        if (totalResults.length >= MAX_ITEMS_PER_REQUEST) {
          break
        }

        if (result.items.length < CONFIG.HELIUS_MAX_LIMIT_PER_REQUEST) {
          hasMoreResults = false
        } else {
          page++
        }
      }
    }

    const response = {
      total: totalResults.length,
      limit: MAX_ITEMS_PER_REQUEST,
      page: page - 1,
      items: totalResults,
    }

    return response
  },
)
