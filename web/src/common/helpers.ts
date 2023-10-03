import router from "@/router"

/**
 * Adds an 'index' property to objects in an array, starting from 0. 
 *
 * @param arr An array of objects to add 'index' properties to.
 * @returns The updated array of objects with 'index' properties.
 */
export function addIndexToObjects<T extends { index: number }>(arr: T[]): T[] {
    let index = 0
    return arr.map(obj => {
        obj.index = index
        index++
        return obj
    })
}

/**
 * Get the current Unix timestamp in milliseconds.
 * @returns {number} The current Unix timestamp.
 */
export function getCurrentTimestamp(): number {
    return new Date().getTime()
  }


/**
 * Get a random integer between two numbers.
 * @param min The minimum number.
 * @param max The maximum number.
 * @returns A random integer between the two numbers.
 * @see https://stackoverflow.com/a/7228322/1109380
 */
export function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

/**
 * Navigates to the user profile page with the given username and query parameter.
 * @param userName - The username of the user whose profile page to navigate to.
 */
export function goToUserProfile(userName: string) {
  router.push({ name: 'profile', params: { username: userName }, query: { isSelf: 0 } })
}

/**
 * Formats a date string into a human-readable format.
 * @param date - The date string to format.
 * @returns A formatted date string in the format "Month Day, Year".
 */
export function formatDate(date: string) {
  const dateObj = new Date(date)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions
  return dateObj.toLocaleDateString('en-US', dateOptions)
}