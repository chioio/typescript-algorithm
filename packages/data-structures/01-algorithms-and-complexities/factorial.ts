/**
 * Calculate factorial.
 *
 * * Time complexity: O(number)
 * * Space complexity: O(number)
 *
 * @param number a number
 * @returns numbers' factorial
 */
export function factorial(number: number): number {
  if (number === 0) {
    return 1;
  }
  return factorial(number - 1) * number;
}
