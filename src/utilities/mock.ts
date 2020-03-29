// Utils
import { getRandomInt } from './getRandomInt'

// Types
import { Todo } from 'features/todos/todosSlice'

/**
 * Mock API call
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export const mock = (timeout: number = 1000) => {
  const randomInt = getRandomInt(10)

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      randomInt > 2 ? resolve('Mock API success!') : reject({ message: 'Mock API Error' })
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
