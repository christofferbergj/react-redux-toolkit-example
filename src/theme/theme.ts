import { theme as chakra, ITheme } from '@chakra-ui/core/dist'

export const theme = {
  ...chakra,
  shadows: {
    ...chakra.shadows,
    outline: '0 0 0 3px #9f7aea',
  },
  colors: {
    ...chakra.colors,
    primary: '#6b46c1',

    gray: {
      ...chakra.colors.gray,
      750: '#212732',
    },
  },
}

export const defaultConfig = (theme: ITheme) => ({
  light: {
    color: theme.colors.gray[800],
    bg: theme.colors.gray[50],
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[400],
  },
  dark: {
    color: theme.colors.whiteAlpha[900],
    bg: theme.colors.gray[800],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.whiteAlpha[400],
  },
})
