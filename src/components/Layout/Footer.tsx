import React from 'react'
import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from 'react-icons/all'

// Components
import { Inner } from 'components/Inner'
import { Box, BoxProps, Link, Stack, Text } from '@chakra-ui/core/dist'

const social = [
  {
    label: 'Github',
    url: 'https://github.com/christofferberg/react-redux-toolkit-example',
    icon: IoLogoGithub,
  },
  { label: 'Linkedin', url: 'https://www.linkedin.com/in/christofferbergj/', icon: IoLogoLinkedin },
  {
    label: 'Email',
    url: 'mailto:cgbjensen@gmail.com',
    icon: IoMdMail,
  },
]

export const Footer = ({ ...rest }: BoxProps) => {
  return (
    <>
      <Box as="footer" role={'contentinfo'} mt={'auto'} py={5} borderTopWidth={'1px'} {...rest}>
        <Inner
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontSize={'sm'} mb={2}>
            Christoffer Berg Jensen
          </Text>

          <Stack isInline spacing={2}>
            {social.map(({ label, url, icon }, index) => (
              <Link key={index} href={url} aria-label={label} isExternal color={'gray.500'} p={1}>
                <Box as={icon} size={'20px'} />
              </Link>
            ))}
          </Stack>
        </Inner>
      </Box>
    </>
  )
}
