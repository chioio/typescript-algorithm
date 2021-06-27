/**
 * Multiply all values of the array by certain value with allocation
 * of additional memory to prevent input array modification.
 *
 * * Space complexity: O(array.length)
 * * Auxiliary space complexity: O(array.length)
 *
 * @param array number array
 * @param multiplier array items' multiplier
 * @returns multiplied array
 */
export function multiplyArray(array: number[], multiplier: number): number[] {
  const multipliedArray = [...array];
  for (let i = 0; i < multipliedArray.length; i += 1) {
    multipliedArray[i] *= multiplier;
  }
  return multipliedArray;
}
