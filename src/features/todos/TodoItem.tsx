import React from 'react'
import { useFirestore } from 'react-redux-firebase'

// Slice
import { Todo } from './todosSlice'

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
  useToast,
} from '@chakra-ui/core/dist'

// Components prop types
type Props = Todo & BoxProps

export const TodoItem = ({ description, id, isCompleted, ...rest }: Props) => {
  const firestore = useFirestore()
  const toast = useToast()
  const { onCopy, hasCopied } = useClipboard(description)

  /**
   * Copy todo description label
   * @type {string}
   */
  const copyDescriptionLabel = hasCopied ? 'Copied to clipboard' : 'Copy description'

  /**
   * Get todos docref
   * @param {string} id
   * @returns {firebase.firestore.DocumentReference<firebase.firestore.DocumentData>}
   */
  const getDocRef = (id: string) => firestore.collection('todos').doc(id)

  /**
   * Delete todo from firestore
   * @param {string} id - The id of the todo item
   * @returns {Promise<void>}
   */
  const handleDeleteTodo = async (id: string) => {
    try {
      await getDocRef(id).delete()
    } catch ({ code, message }) {
      toast({
        status: 'error',
        title: code,
        description: message,
      })
    }
  }

  /**
   * Toggles completed status of todo
   * @param {string} id - The id of the todo item
   * @returns {Promise<void>}
   */
  const handleToggleTodo = async (id: string) => {
    try {
      await getDocRef(id).update({ isCompleted: !isCompleted })
    } catch ({ code, message }) {
      toast({
        status: 'error',
        title: code,
        description: message,
      })
    }
  }

  /**
   * Edits description of todo
   * @param {string} id - The id of the todo item
   * @param {string} description - The new description
   * @returns {Promise<void>}
   */
  const handleEditTodo = async (id: string, description: string) => {
    try {
      await getDocRef(id).update({ description })
    } catch ({ code, message }) {
      toast({
        status: 'error',
        title: code,
        description: message,
      })
    }
  }

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
            onChange={() => handleToggleTodo(id)}
            variantColor={'purple'}
            size={'lg'}
          />

          <Editable
            defaultValue={description}
            flex={1}
            onSubmit={(value) => handleEditTodo(id, value)}
          >
            <EditablePreview
              width={'full'}
              color={isCompleted ? 'gray.500' : undefined}
              opacity={isCompleted ? 0.4 : undefined}
              textDecor={isCompleted ? 'line-through' : undefined}
            />
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
                    onClick={() => handleDeleteTodo(id)}
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
