// Utils
import { getRandomInt } from './getRandomInt'

// Types
import { Todo } from 'features/todos/todosSlice'
import nanoid from 'nanoid'

/**
 * Mock API call
 * @param payload
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export const mockIncrement = (payload: number, timeout: number = 1000) => {
  const randomInt = getRandomInt(10)

  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      randomInt > 2
        ? resolve({ message: 'Mock API success!', data: payload })
        : reject({ message: 'Mock API Error', id: nanoid() })
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
  const randomInt = getRandomInt(10)

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      randomInt > 5
        ? resolve('Mock API successfully added todo!')
        : reject({ message: 'Mock API Error', todoId: payload.id })
    }, timeout)
  })
}
