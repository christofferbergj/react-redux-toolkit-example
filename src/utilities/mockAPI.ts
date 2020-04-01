import nanoid from 'nanoid'

// Utils
import { getRandomInt } from './getRandomInt'

// Types
import { Todo } from 'features/todos/todosSlice'

/**
 * Mock API call
 * @param payload
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export const mockIncrement = (payload: number, timeout: number = 1000) => {
  const randomInt = getRandomInt(9)

  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      randomInt > 1
        ? resolve({ message: 'Mock increment API success!', data: payload })
        : reject({ message: 'Mock increment API error', id: nanoid() })
    }, timeout)
  })
}

/**
 * Mock API call to add a todo
 * @param {Todo} payload
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export const mockAddTodo = (payload: Todo, timeout: number = 1000) => {
  const randomInt = getRandomInt(9)

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      randomInt > 1
        ? resolve('Mock API successfully added todo!')
        : reject({ message: 'Mock API failed', id: payload.id })
    }, timeout)
  })
}
