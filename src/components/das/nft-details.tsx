'use client'

import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {DownloadIcon} from '@radix-ui/react-icons'
import {DAS} from 'helius-sdk'
import Link from 'next/link'
import {FaExternalLinkAlt} from 'react-icons/fa'

import {JsonView, allExpanded, darkStyles} from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

interface NftDetailsProps {
  data: DAS.GetAssetResponse
}

export function NftDetails({data}: NftDetailsProps) {
  const {content, creators, ownership} = data

  let mediaElement
  const extension = getFileExtension(content?.links?.animation_url || '')

  if (extension && videoExtensions.includes(extension)) {
    mediaElement = (
      <video
        width="100%"
        controls
        {...(content?.links?.image && {
          poster: content?.links?.image,
        })}
      >
        <source
          src={content?.links?.animation_url}
          type={getVideoMimeType(extension)}
        />
        Your browser does not support the video tag.
      </video>
    )
  } else if (content?.links?.image) {
    mediaElement = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={content?.links.image}
        alt={content?.metadata.name || 'NFT Image'}
        className="w-full h-auto rounded-md"
      />
    )
  }

  const jsonStyle = {
    propertyStyle: {color: 'red'},
    stringStyle: {color: 'green'},
    numberStyle: {color: 'darkorange'},
  }

  return (
    <div className="grid">
      {data.id && (
        <div className="block truncate overflow-hidden">
          <h1 className="text-lg font-bold flex-shrink-0">NFT Details</h1>
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

          {(content?.links?.image || content?.links?.animation_url) && (
            <div className="flex mt-6 space-x-4">
              {content?.links?.image && (
                <Button type="button" asChild>
                  <Link
                    href={content.links.image}
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

              {content?.links?.animation_url && (
                <Button type="button" asChild>
                  <Link
                    href={content.links.animation_url}
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
        <div className="rounded-md max-h-[250px] w-full overflow-auto border">
          <JsonView
            data={data}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
        </div>
      </div>
    </div>
  )
}
const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']

const getFileExtension = (url: string | undefined) => {
  if (!url) return '' // Handle potential empty or undefined values

  let extension = ''
  try {
    const urlObject = new URL(url)
    if (urlObject.searchParams.has('ext')) {
      extension = urlObject.searchParams.get('ext') || ''
    } else {
      extension = url.split('.').pop() || ''
    }
  } catch (error) {
    console.error('Unable to parse URL:', error)
  }

  return extension
}

const getVideoMimeType = (extension: string) => {
  switch (extension) {
    case 'mp4':
      return 'video/mp4'
    case 'webm':
      return 'video/webm'
    case 'ogg':
      return 'video/ogg'
    case 'mov':
      return 'video/quicktime'
    default:
      return '' // default MIME type if not recognized
  }
}
