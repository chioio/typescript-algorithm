/**
 * Multiply all values of the array by certain value in-place.
 *
 * * Space complexity: O(array.length)
 * * Auxiliary space complexity: O(1)
 *
 * @param array number array
 * @param multiplier array items' multiplier
 * @returns multiplied array
 */
export function multiplyArrayInPlace(array: number[], multiplier: number): number[] {
  for (let i = 0; i < array.length; i += 1) {
    array[i] *= multiplier;
  }
  return array;
}
