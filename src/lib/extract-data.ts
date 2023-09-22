import {Asset} from '@/types/das'
import {DAS} from 'helius-sdk'

export function extractData(data: DAS.GetAssetResponse[]): Asset[] {
  const extractedData = data.map(item => {
    return {
      id: item.id,
      name: item.content?.metadata.name ?? '',
      symbol: item.content?.metadata.symbol ?? '',
      imageFromCdn: getImageLinkFromCdn(item) ?? '',
      imageFromExternalUrl: getImageLinkFromExternalUrl(item) ?? '',
      collectionAddress:
        item.grouping?.find(group => group.group_key === 'collection')
          ?.group_value ?? '',
      rawData: item,
    }
  })

  return extractedData
}

const imageMimeTypes = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/webp',
]

export function getImageLinkFromCdn(
  data: DAS.GetAssetResponse,
): string | undefined {
  const file = data.content?.files?.find(file =>
    imageMimeTypes.includes(file.mime ?? ''),
  ) as unknown as {
    mime: string
    // TODO: Report to Helius team to add the `cdn_uri`
    cdn_uri: string
  }

  // Refrain from using `image/gif` from Helius CDN because it will throw an error
  if (file?.mime == 'image/gif') {
    return undefined
  }
  return file?.cdn_uri
}

export function getImageLinkFromExternalUrl(
  data: DAS.GetAssetResponse,
): string | undefined {
  const fileFromFiles = data.content?.files?.find(file =>
    imageMimeTypes.includes(file.mime ?? ''),
  )
  const fileFromLinks = data.content?.links?.image
  return fileFromFiles?.uri ?? fileFromLinks
}

const videoMimeTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
]

const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']

export function getVideoLinkFromCdn(
  data: DAS.GetAssetResponse,
): string | undefined {
  const file = data.content?.files?.find(file =>
    videoMimeTypes.includes(file.mime ?? ''),
  ) as unknown as {
    // TODO: Report to Helius team to add the `cdn_uri`
    cdn_uri: string
  }
  return file?.cdn_uri
}

export function getVideoLinkFromExternalUrl(
  data: DAS.GetAssetResponse,
): string | undefined {
  const fileFromFiles = data.content?.files?.find(file =>
    videoMimeTypes.includes(file.mime ?? ''),
  )
  const fileFromLinks = data.content?.links?.animation_url
  return (
    fileFromFiles?.uri ??
    (getFileExtension(fileFromLinks) ? fileFromLinks : undefined)
  )
}

export function getVideoMimeTypeFromCdn(
  data: DAS.GetAssetResponse,
): string | undefined {
  const file = data.content?.files?.find(file =>
    videoExtensions.includes(file.mime ?? ''),
  )
  return file?.mime
}

export function getVideoMimeTypeFromExternalUrl(
  data: DAS.GetAssetResponse,
): string | undefined {
  const fileFromFiles = data.content?.files?.find(file =>
    videoMimeTypes.includes(file.mime ?? ''),
  )
  const fileFromLinks = data.content?.links?.animation_url
  return fileFromFiles?.mime ?? getVideoMimeType(fileFromLinks ?? '')
}

export function getFileExtension(url: string | undefined) {
  if (!url) return undefined

  let extension = undefined
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
      return undefined // default MIME type if not recognized
  }
}
