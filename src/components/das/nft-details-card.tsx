import {NftDetails} from '@/components/das/nft-details'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {DAS} from 'helius-sdk'

interface NftDetailsCardProps {
  data: DAS.GetAssetResponse
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
