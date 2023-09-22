'use client'

import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {
  getImageLinkFromCdn,
  getImageLinkFromExternalUrl,
  getVideoLinkFromCdn,
  getVideoLinkFromExternalUrl,
  getVideoMimeTypeFromCdn,
  getVideoMimeTypeFromExternalUrl,
} from '@/lib/extract-data'
import {DownloadIcon} from '@radix-ui/react-icons'
import {DAS} from 'helius-sdk'
import Image from 'next/image'
import Link from 'next/link'
import {FaExternalLinkAlt} from 'react-icons/fa'

import {JsonView, collapseAllNested, darkStyles} from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

interface NftDetailsProps {
  data: DAS.GetAssetResponse
}

export function NftDetails({data}: NftDetailsProps) {
  const {content, creators, ownership} = data

  const imageLinkFromCdn = getImageLinkFromCdn(data)
  const imageLinkFromExternalUrl = getImageLinkFromExternalUrl(data)
  const imageLink = imageLinkFromCdn ?? imageLinkFromExternalUrl

  const videoLinkFromCdn = getVideoLinkFromCdn(data)
  const videoLinkFromExternalUrl = getVideoLinkFromExternalUrl(data)
  const videoLink = videoLinkFromCdn ?? videoLinkFromExternalUrl

  const videoMimeTypeFromCdn = getVideoMimeTypeFromCdn(data)
  const videoMimeTypeFromExternalUrl = getVideoMimeTypeFromExternalUrl(data)
  const videoMimeType = videoMimeTypeFromCdn ?? videoMimeTypeFromExternalUrl

  let mediaElement
  if (videoLink) {
    mediaElement = (
      <video
        width="100%"
        controls
        {...(imageLink && {
          poster: imageLink,
        })}
      >
        <source src={videoLink} type={videoMimeType} />
        Your browser does not support the video tag.
      </video>
    )
  } else if (imageLink) {
    mediaElement = videoLinkFromCdn ? (
      <Image
        src={imageLink}
        alt={content?.metadata.name || 'NFT Image'}
        className="w-full h-auto rounded-md aspect-square object-contain"
        width={468}
        height={468}
      />
    ) : (
      <img
        src={imageLink}
        alt={content?.metadata.name || 'NFT Image'}
        className="w-full h-auto rounded-md aspect-square object-contain"
        width={468}
        height={468}
      />
    )
  }

  // TODO: Report to Helius team to add the `token_standard`
  const metadata = data.content?.metadata as unknown as {
    token_standard: string
  }

  return (
    <div className="grid grid-cols-1 items-start justify-start content-start">
      {data.id && (
        <div className="block truncate overflow-hidden">
          <div className="py-2 space-x-2">
            {data.compression?.compressed && <Badge>Compressed NFT</Badge>}
            {metadata.token_standard === 'ProgrammableNonFungible' && (
              <Badge>Programmable NFT</Badge>
            )}
          </div>
          <div className="flex items-center justify-start space-x-2">
            <div className="text-sm text-muted-foreground truncate flex-none shrink">
              {data.id}
            </div>
            <Link
              href={`/assets/id/${data.id}`}
              className="flex-none hover:text-primary"
            >
              <FaExternalLinkAlt className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-start justify-start mt-4">
        <div className="w-full">
          {mediaElement}

          {(imageLink || videoLink) && (
            <div className="flex mt-6 space-x-4">
              {imageLink && (
                <Button type="button" asChild>
                  <Link
                    href={imageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon className="mr-2" />
                    <span>
                      <span className="hidden md:inline">Download</span> Image
                    </span>
                  </Link>
                </Button>
              )}

              {videoLink && (
                <Button type="button" asChild>
                  <Link
                    href={videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon className="mr-2" />
                    <span>
                      <span className="hidden md:inline">Download</span>{' '}
                      Animation
                    </span>
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        <div>
          {content?.metadata.name && (
            <div>
              <h1 className="text-2xl font-semibold truncate">
                {content?.metadata.name}
              </h1>
            </div>
          )}

          {content?.metadata.description && (
            <p className="text-muted-foreground line-clamp-4">
              {content?.metadata.description}
            </p>
          )}

          {creators && creators?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-medium">Creators</h2>
              <ul className="mt-2 space-y-2">
                {creators.map((creator, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between truncate space-x-2"
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
              {ownership.owner && (
                <p className="truncate">
                  Owner Address:
                  <Link
                    href={`/assets/owner/${ownership.owner}`}
                    className="hover:text-primary ml-2"
                  >
                    {ownership.owner}
                  </Link>
                </p>
              )}
              {ownership.ownership_model && (
                <p>
                  Ownership Model:{' '}
                  <span className="capitalize">
                    {ownership.ownership_model}
                  </span>
                </p>
              )}
            </div>
          )}

          {content?.metadata.attributes &&
            content?.metadata.attributes?.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-medium">Attributes</h2>
                <ul className="mt-2 space-y-2">
                  {content.metadata.attributes.map((attr, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span>{attr.trait_type}: </span>
                      {typeof attr.value === 'boolean' ? (
                        <Checkbox
                          checked={attr.value}
                          aria-readonly="true"
                          className="ml-2"
                        />
                      ) : (
                        <span className="truncate">{attr.value ?? '-'}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>

      <div className="grid mt-4 space-y-2">
        <h2 className="text-xl font-medium">Full JSON Response</h2>
        <div className="rounded-md max-h-[310px] w-full overflow-auto border">
          <JsonView
            data={data}
            shouldExpandNode={collapseAllNested}
            style={darkStyles}
          />
        </div>
      </div>
    </div>
  )
}
