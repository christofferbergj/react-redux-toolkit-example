/**
 * Mock API call
 * @param {boolean} success
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export const mock = (success: boolean = true, timeout: number = 1000) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      success ? resolve('Mock success!') : reject({ message: 'Error' })
    }, timeout)
  })
}
