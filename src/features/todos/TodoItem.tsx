import React from 'react'
import { useDispatch } from 'react-redux'

// Slice
import { Todo, toggleTodo, editTodo, deleteTodoFirestore } from './todosSlice'

// Components
import {
  Box,
  BoxProps,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  ListItem,
  PseudoBox,
  Stack,
  Tooltip,
  useClipboard,
} from '@chakra-ui/core/dist'

// Components prop types
type Props = Todo & BoxProps

export const TodoItem = ({ description, id, isCompleted, ...rest }: Props) => {
  const dispatch = useDispatch()
  const { onCopy, hasCopied } = useClipboard(description)

  /**
   * Copy todo description label
   * @type {string}
   */
  const copyDescriptionLabel = hasCopied ? 'Copied to clipboard' : 'Copy description'

  return (
    <>
      <ListItem
        role={'group'}
        width={'full'}
        alignItems={'center'}
        display={'flex'}
        fontSize={'lg'}
        fontWeight={'medium'}
        {...rest}
      >
        <Stack isInline width={'full'} spacing={4} align={'center'}>
          <Checkbox
            isChecked={isCompleted}
            onChange={() => dispatch(toggleTodo({ id, isCompleted }))}
            variantColor={'purple'}
            size={'lg'}
          />

          <Editable
            defaultValue={description}
            flex={1}
            onSubmit={(value) => dispatch(editTodo({ id, description: value }))}
          >
            <EditablePreview width={'full'} />
            <EditableInput />
          </Editable>

          <PseudoBox
            ml={'auto'}
            opacity={0}
            _groupHover={{ opacity: 1 }}
            _focusWithin={{ opacity: 1 }}
            transition={'all 250ms ease'}
          >
            <Stack isInline spacing={2}>
              <Box>
                <Tooltip
                  aria-label={copyDescriptionLabel}
                  label={copyDescriptionLabel}
                  placement="bottom"
                  fontSize="xs"
                >
                  <IconButton
                    onClick={onCopy}
                    aria-label={copyDescriptionLabel}
                    icon="copy"
                    size={'sm'}
                  />
                </Tooltip>
              </Box>

              <Box>
                <Tooltip
                  aria-label={'Delete todo'}
                  label={'Delete todo'}
                  placement="bottom"
                  fontSize="xs"
                >
                  <IconButton
                    onClick={() => dispatch(deleteTodoFirestore(id))}
                    aria-label="Delete todo"
                    icon="close"
                    size={'sm'}
                  />
                </Tooltip>
              </Box>
            </Stack>
          </PseudoBox>
        </Stack>
      </ListItem>
    </>
  )
}
