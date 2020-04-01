import { theme as chakra } from '@chakra-ui/core/dist'

export const theme = {
  ...chakra,
  shadows: {
    ...chakra.shadows,
    outline: '0 0 0 3px #9f7aea',
  },
  colors: {
    ...chakra.colors,
    primary: '#6b46c1',
  },
}
