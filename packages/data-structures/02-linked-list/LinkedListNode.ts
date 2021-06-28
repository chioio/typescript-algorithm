export default class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  /**
   * Convert to string from `LinkedListNode`.
   *
   * @param callback Create a custom `LinkedListNode` string form.
   * @returns The node string form.
   */
  toString(callback?: (value: T) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
