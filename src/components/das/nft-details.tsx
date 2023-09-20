import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {DownloadIcon} from '@radix-ui/react-icons'
import {DAS} from 'helius-sdk'

interface NftDetailsProps {
  data: DAS.GetAssetResponse
}

export function NftDetails({data}: NftDetailsProps) {
  const {content, creators, ownership} = data

  return (
    <div>
      <div>
        <h1 className="text-lg font-bold">NFT Details</h1>
        <p className="truncate text-sm text-muted-foreground">{data.id}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-start justify-start mt-4">
        {content?.links?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content?.links.image}
            alt={content?.metadata.name || 'NFT Image'}
            className="w-full h-auto rounded-md"
          />
        )}

        <div>
          <h1 className="text-2xl font-semibold line-clamp-1">
            {content?.metadata.name}
          </h1>
          <p className="text-muted-foreground line-clamp-4">
            {content?.metadata.description}
          </p>

          {creators && (
            <div className="mt-4">
              <h2 className="text-xl font-medium">Creators</h2>
              <ul className="mt-2 space-y-2">
                {creators.map((creator, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between line-clamp-1 space-x-2"
                  >
                    <span className="flex-auto truncate">
                      {creator.address}
                    </span>
                    <span className="flex-none">
                      {creator.share}%{' '}
                      {creator.verified && (
                        <span className="text-green-500">(Verified)</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ownership && (
            <div className="mt-4">
              <h2 className="text-xl font-medium">Ownership</h2>
              <p className="truncate">Owner Address: {ownership.owner}</p>
              <p>Ownership Model: {ownership.ownership_model}</p>
            </div>
          )}

          {content?.metadata.attributes && (
            <div className="mt-4">
              <h2 className="text-xl font-medium">Attributes</h2>
              <ul className="mt-2 space-y-2">
                {content.metadata.attributes.map((attr, idx) => (
                  <li key={idx} className="line-clamp-4">
                    {attr.trait_type}: {attr.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex mt-6 space-x-4">
        {content?.links?.image && (
          <Button type="button">
            <DownloadIcon className="mr-2" />
            Download Image
          </Button>
        )}

        {content?.links?.animation_url && (
          <Button type="button">
            <DownloadIcon className="mr-2" />
            Download Animation
          </Button>
        )}
      </div>
    </div>
  )
}
