/**
 * Get all possible pairs out of provided letters.
 *
 * * Time complexity: O(letters.length^2)
 * * Space complexity: O(letters.length^2)
 *
 * @param letters letter array
 * @returns all possible pairs
 */
export function pairs(letters: string[]): string[] {
  const result = [];
  for (let i = 0; i < letters.length; i += 1) {
    for (let j = 0; j < letters.length; j += 1) {
      result.push(`${letters[i]}${letters[j]}`);
    }
  }
  return result;
}
