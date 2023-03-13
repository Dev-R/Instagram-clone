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