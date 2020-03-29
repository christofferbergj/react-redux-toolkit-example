import React from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { animated, config } from 'react-spring'
import { Transition } from 'react-spring/renderprops'

// Slices
import { clearToast, selectToasts, Toast } from './toastSlice'

// Components
import { Box, CloseButton, Flex, Heading, Text } from '@chakra-ui/core/dist'

const spring = { ...config.default, precision: 0.1 }

export const AnimatedDiv = styled(animated.div)`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  width: 250px;
`

export const Life = styled(animated.div)`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: auto;
  background: rgb(255, 207, 0);
  height: 4px;
`

export const Toasts = () => {
  const dispatch = useDispatch()
  const toasts = useSelector(selectToasts)

  const leave = () => async (next: Function) => {
    await next({ opacity: 0, height: 0 })
  }

  const styles = {
    success: {
      bg: 'green.500',
    },
    error: {
      bg: 'red.500',
    },
    warning: {
      bg: 'yellow.500',
    },
  }

  const getToastStyle = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return styles.success
      case 'error':
        return styles.error
      case 'warning':
        return styles.warning
      default:
        return styles.success
    }
  }

  return (
    <>
      <Flex
        direction={'column'}
        pos={'absolute'}
        bottom={'10px'}
        left={'50%'}
        transform={'translateX(-50%)'}
        width={'250px'}
      >
        <Transition
          items={toasts}
          keys={(item) => item.id}
          from={{ opacity: 0, height: 0, transform: 'scale(0.9)' }}
          enter={{ opacity: 1, height: 'auto', transform: 'scale(1)' }}
          leave={leave}
          // @ts-ignore
          config={spring}
        >
          {(item) => (props) => (
            <AnimatedDiv style={props}>
              <Box
                pos={'relative'}
                zIndex={10}
                color={'white'}
                p={3}
                rounded={'md'}
                mt={4}
                {...getToastStyle(item.type)}
              >
                {item.title && <Heading size={'sm'}>{item.title}</Heading>}
                {item.description && <Text lineHeight={'shorter'}>{item.description}</Text>}

                {item.isClosable && (
                  <Box pos={'absolute'} top={'5px'} right={'5px'}>
                    <CloseButton onClick={() => dispatch(clearToast(item.id))} size={'sm'} />
                  </Box>
                )}
              </Box>
            </AnimatedDiv>
          )}
        </Transition>
      </Flex>
    </>
  )
}
