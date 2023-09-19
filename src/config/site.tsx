import {
  FaUser,
  FaLayerGroup,
  FaShieldAlt,
  FaPencilAlt,
  FaLink,
} from 'react-icons/fa'

export const searchCriteria = [
  {
    value: 'owner',
    searchUrlPath: '/search/owner',
    label: 'By Owner',
    icon: <FaUser className="mb-3 h-6 w-6" />,
  },
  {
    value: 'id',
    searchUrlPath: '/search/id',
    label: 'By ID (Mint)',
    icon: <FaLink className="mb-3 h-6 w-6" />,
  },
  {
    value: 'group.collection',
    searchUrlPath: '/search/group/collection',
    label: 'By Group (Collection)',
    icon: <FaLayerGroup className="mb-3 h-6 w-6" />,
  },
  {
    value: 'authority',
    searchUrlPath: '/search/authority',
    label: 'By Authority',
    icon: <FaShieldAlt className="mb-3 h-6 w-6" />,
  },
  {
    value: 'creator',
    searchUrlPath: '/search/creator',
    label: 'By Creator',
    icon: <FaPencilAlt className="mb-3 h-6 w-6" />,
  },
]
