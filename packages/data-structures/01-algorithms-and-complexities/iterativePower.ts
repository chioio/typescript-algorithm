/**
 * Raise number to the power.
 *
 * * Time complexity: O(power)
 * * Space complexity: O(1)
 *
 * @param number a number
 * @param power numbers' power
 * @returns power calculate result
 */
export function iterativePower(number: number, power: number): number {
  let result = 1;
  for (let i = 0; i < power; i += 1) {
    result *= number;
  }
  return result;
}
