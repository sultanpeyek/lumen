import {Metadata} from 'next'
import {
  FaUser,
  FaLayerGroup,
  FaShieldAlt,
  FaPencilAlt,
  FaLink,
} from 'react-icons/fa'

const metadata: Metadata = {
  title: 'Lumen — SOL NFT Explorer',
  description:
    'Lumen: Efficient SOL NFT exploration with Helius DAS API. Clean interface. Simplified Solana NFT browsing',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export const CONFIG = {
  metadata,
  heading: {
    title: 'Lumen',
    description: 'SOL NFT Explorer',
    slogan: 'Efficiently Explore SOL NFTs.',
  },
  footer: {
    madeBy: {
      name: '@sultanpeyek',
      link: 'https://x.com/sultanpeyek',
    },
    repos: {
      label: 'Open-sourced on',
      platform: 'GitHub',
      link: 'https://github.com/sultanpeyek/lumen',
    },
    poweredBy: {
      label: 'Powered by',
      name: 'Helius DAS API',
      link: 'https://www.helius.dev/blog/all-you-need-to-know-about-solanas-new-das-api',
    },
  },
  searchMethods: {
    owner: {
      searchUrlPath: '/search/owner',
      label: 'By Owner',
      icon: <FaUser className="mb-3 h-6 w-6" />,
    },
    id: {
      searchUrlPath: '/search/id',
      label: 'By ID (Mint)',
      icon: <FaLink className="mb-3 h-6 w-6" />,
    },
    group: {
      searchUrlPath: '/search/group/collection',
      label: 'By Group (Collection)',
      icon: <FaLayerGroup className="mb-3 h-6 w-6" />,
    },
    authority: {
      searchUrlPath: '/search/authority',
      label: 'By Authority',
      icon: <FaShieldAlt className="mb-3 h-6 w-6" />,
    },
    creator: {
      searchUrlPath: '/search/creator',
      label: 'By Creator',
      icon: <FaPencilAlt className="mb-3 h-6 w-6" />,
    },
  },
}
