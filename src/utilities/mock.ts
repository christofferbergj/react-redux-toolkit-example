/**
 * Mock API call
 * @param {boolean} success
 * @param {number} timeout
 * @returns {Promise<string>}
 */
export const mock = (success: boolean, timeout: number) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      success ? resolve('Mock success!') : reject({ message: 'Error' })
    }, timeout)
  })
}
