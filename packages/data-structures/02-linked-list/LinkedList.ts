import LinkedListNode from "./LinkedListNode.ts";

export default class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;

  constructor() {
    /** @var LinkedListNode */
    this.head = null;
    /** @var LinkedListNode */
    this.tail = null;
  }

  /**
   * Append a node to the `LinkedList` as the head node.
   *
   * There are tow scenarios here:
   *  1. The `LinkedList` length is null.
   *  2. The `LinkedList` length is not null.
   *
   * @param value The node value which needs to be prepended to the `LinkedList`.
   * @returns The prepended `LinkedList`.
   */
  prepend(value: T): LinkedList<T> {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head);
    // Make the new node to the LinkedList head
    this.head = newNode;
    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  /**
   * Append a node to the `LinkedList`.
   *
   * The scenarios are similar to the {@link prepend} method.
   *
   * @param value The node value which needs to be appended to the `LinkedList`.
   * @returns The appended `LinkedList`.
   */
  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value, null);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    const currentTail = this.tail;
    currentTail && (currentTail.next = newNode);
    // Attach new node to the end of linked list
    this.tail = newNode;
    return this;
  }

  /**
   * Delete a node from the `LinkedList`.
   *
   * There are three scenarios here:
   *  1. The head node value matches the value.
   *  2. The next node value matches the value.
   *  3. The tail node value matches the value.
   *
   * @param value The value which the `LinkedList` node maybe contains.
   * @returns The deleted node.
   */
  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }
    let deleteNode = null;
    // If the head node is the delete one, then make next node that is
    // different from the head to be a new head.
    while (this.head && this.head.value === value) {
      deleteNode = this.head;
      this.head = this.head.next;
    }
    let currentNode = this.head;
    if (currentNode !== null) {
      // If the next node is the delete one, then we need to make the
      // next node points to the delete nodes next.
      while (currentNode?.next) {
        if (currentNode.next.value === value) {
          deleteNode = currentNode.next;
          currentNode.next = deleteNode.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    // If the tails' value matches the removal value, then we need to set
    // the tail equal to `currentNode`
    if (this.tail?.value === value) {
      this.tail = currentNode;
    }
    return deleteNode;
  }

  /**
   * Delete the head node from the `LinkedList`.
   *
   * There are three scenarios here:
   *  1. The `LinkedList` has no nodes.
   *  2. The `LinkedList` only has one node.
   *  3. The `LinkedList` has many nodes than ones.
   *
   * @returns The head node that be deleted.
   */
  deleteHead(): LinkedListNode<T> | null {
    const deletedHead = this.head;

    if (!this.head) {
      return null;
    }

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * Delete the tail node from the `LinkedList`.
   *
   * There are two scenarios here:
   *  1. The `LinkedList` only has one node.
   *  2. The `LinkedList` has many nodes.
   *
   * @returns The tail node that be deleted.
   */
  deleteTail(): LinkedListNode<T> | null {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // There we need to traverse the entire list to get to the next to
    // last `LinkedListNode` in the `LinkedList`.
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * Find the node from the `LinkedList`.
   *
   * @param findParams
   * @param findParams.value The value which the `LinkedList` node maybe contains.
   * @param findParams.callback The value maybe is an object, so provide a callback to handle.
   * @returns The node that be found.
   */
  find({
    value = undefined,
    callback = undefined,
  }: {
    value?: T;
    callback?: (value: T) => boolean;
  }): LinkedListNode<T> | null {
    // Create the variable `currentNode` to keep tack of where we are in
    // the LinkedList and set it to `this.head` to start at the beginning
    // of the `LinkedList`.
    let currentNode = this.head;

    if (!this.head) {
      return null;
    }

    // Traverse the `LinkedList`.
    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      // If value is specified then try to compare by value.
      if (value && currentNode.value === value) {
        return currentNode;
      }
      // If the current node has the next node, then reassign the next node
      // to the current node.
      currentNode = currentNode.next;
    }
    return null;
  }

  /**
   * Convert to `LinkedList` from an array.
   *
   * @param values The array list.
   * @returns The `LinkedList` with the array elements.
   */
  fromArray(values: T[]): LinkedList<T> {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * Convert to array from `LinkedList`.
   *
   * @returns The array with the `LinkedList` nodes value.
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * Convert to string from `LinkedList`.
   *
   * @param callback Create a custom `LinkedList` string form.
   * @returns The `LinkedList` string form.
   */
  toString(callback?: (value: T) => string): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  /**
   * Reverse the `LinkedList` nodes.
   */
  reverse() {
    let currentNode = this.head;
    let prevNode: LinkedListNode<T> | null = null;
    let nextNode: LinkedListNode<T> | null = null;

    while (currentNode) {
      // Store next node.
      nextNode = currentNode.next;
      // Change next node of the current node so it would link to previous node.
      currentNode.next = prevNode;
      // Move prevNode and currentNode nodes one step forward.
      prevNode = currentNode;
      currentNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;
  }
}
