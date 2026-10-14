import {CONFIG} from '@/config/api'
import {zod} from '@/lib/zod'
import {getHelius} from '@/lib/helius'
import type {GetAssetResponseList} from '@/lib/helius'
import {z} from 'zod'

export const getAssetsByOwner = zod(
  z.string(),
  async (ownerAddress): Promise<GetAssetResponseList> => {
    const helius = getHelius()

    let page = 1
    let hasMoreResults = true
    let totalResults = []
    const MAX_ITEMS_PER_REQUEST = CONFIG.MAX_API_REQUEST_ITEMS

    while (hasMoreResults) {
      const result = await helius.getAssetsByOwner({
        ownerAddress,
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
