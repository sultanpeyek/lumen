import {NftDetails} from '@/components/das/nft-details'
import {Card, CardContent} from '@/components/ui/card'
import type {GetAssetResponse} from '@/lib/helius'

interface NftDetailsCardProps {
  data: GetAssetResponse
}

export function NftDetailsCard({data}: NftDetailsCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <NftDetails data={data} />
      </CardContent>
    </Card>
  )
}
