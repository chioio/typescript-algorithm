import LinkedList from "../LinkedList.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.99.0/testing/asserts.ts";

type TestNodeValue = {
  key: number;
  content: string;
};

Deno.test("LinkedList - should create empty linked list", () => {
  const linkedList = new LinkedList();

  assertEquals(linkedList.toString(), "");
});

Deno.test("LinkedList - should prepend node to linked list", () => {
  const linkedList = new LinkedList<number>();

  linkedList.prepend(2);

  assertEquals(linkedList.head?.toString(), "2");
  assertEquals(linkedList.tail?.toString(), "2");

  linkedList.append(1);
  linkedList.prepend(3);
  assertEquals(linkedList.toString(), "3,2,1");
});

Deno.test("LinkedList - should append node to linked list", () => {
  const linkedList = new LinkedList<number>();

  assertEquals(linkedList.head, null);
  assertEquals(linkedList.tail, null);

  linkedList.append(1);
  linkedList.append(2);

  assertEquals(linkedList.toString(), "1,2");
  assertEquals(linkedList.tail?.next, null);
});

Deno.test("LinkedList - should delete node by value from linked list", () => {
  const linkedList = new LinkedList<number>();
  const nodesValue = [1, 2, 3, 4, 5];

  assertEquals(linkedList.delete(5), null);

  linkedList.fromArray(nodesValue);

  assertEquals(linkedList.head?.toString(), "1");
  assertEquals(linkedList.tail?.toString(), "5");

  const deleteNode = linkedList.delete(3);
  assertEquals(linkedList.toString(), "1,2,4,5");
  assertEquals(deleteNode?.value, 3);

  linkedList.delete(1);
  assertEquals(linkedList.toString(), "2,4,5");
  assertEquals(linkedList.head?.toString(), "2");

  linkedList.delete(5);
  assertEquals(linkedList.toString(), "2,4");
  assertEquals(linkedList.tail?.toString(), "4");

  linkedList.delete(4);
  assertEquals(linkedList.toString(), "2");
  assertEquals(linkedList.head?.toString(), linkedList.tail?.toString());

  linkedList.delete(2);
  assertEquals(linkedList.toString(), "");
});

Deno.test("LinkedList - should delete linked list head", () => {
  const linkedList = new LinkedList<number>();
  const nodesValue = [1, 2, 3];

  assertEquals(linkedList.deleteHead(), null);

  linkedList.fromArray(nodesValue);

  assertEquals(linkedList.head?.value, 1);
  assertEquals(linkedList.tail?.value, 3);

  const deletedNode1 = linkedList.deleteHead();
  assertEquals(deletedNode1?.value, 1);
  assertEquals(linkedList.toString(), "2,3");
  assertEquals(linkedList.head?.value, 2);

  const deletedNode2 = linkedList.deleteHead();
  assertEquals(deletedNode2?.value, 2);
  assertEquals(linkedList.toString(), "3");
  assertEquals(linkedList.head?.value, 3);

  const deletedNode3 = linkedList.deleteHead();
  assertEquals(deletedNode3?.value, 3);
  assertEquals(linkedList.head, null);
});

Deno.test("LinkedList - should delete linked list tail", () => {
  const linkedList = new LinkedList<number>();
  const numArr = [1, 2, 3];

  linkedList.fromArray(numArr);

  const deletedNode1 = linkedList.deleteTail();
  assertEquals(deletedNode1?.value, 3);
  assertEquals(linkedList.toString(), "1,2");
  assertEquals(linkedList.tail?.value, 2);

  const deletedNode2 = linkedList.deleteTail();
  assertEquals(deletedNode2?.value, 2);
  assertEquals(linkedList.toString(), "1");
  assertEquals(linkedList.tail?.value, 1);

  const deletedNode3 = linkedList.deleteTail();
  assertEquals(deletedNode3?.value, 1);
  assertEquals(linkedList.toString(), "");
  assertEquals(linkedList.head, null);
  assertEquals(linkedList.tail, null);
});

Deno.test("LinkedList - should be possible to store objects in the list and to print them out", () => {
  const linkedList = new LinkedList<TestNodeValue>();

  const nodesValue = [
    { key: 1, content: "test1" },
    { key: 2, content: "test2" },
  ];

  linkedList.fromArray(nodesValue);

  const nodeStringifier = (value: TestNodeValue) => `${value.key}:${value.content}`;

  assertEquals(linkedList.toString(nodeStringifier), "1:test1,2:test2");
});

Deno.test("LinkedList - should find node by value", () => {
  const linkedList = new LinkedList<number>();

  assertEquals(linkedList.find({ value: 5 }), null);

  linkedList.append(1);

  assertExists(linkedList.find({ value: 1 }));

  linkedList.append(2).append(3);

  const node = linkedList.find({ value: 2 });
  assertEquals(node?.value, 2);
  assertExists(node?.next);
  assertEquals(node?.next?.next, null);

  const notFoundNode = linkedList.find({ value: 5 });
  assertEquals(notFoundNode, null);

  const undefinedNode = linkedList.find({ value: undefined });
  assertEquals(undefinedNode, null);
});

Deno.test("LinkedList - should find node by callback", () => {
  const linkedList = new LinkedList<TestNodeValue>();

  const nodesValue = [
    { key: 1, content: "test1" },
    { key: 2, content: "test2" },
  ];

  linkedList.fromArray(nodesValue);

  const node = linkedList.find({ callback: (value) => value.key === 1 });
  assertEquals(node?.value.key, 1);
  assertEquals(node?.value.content, "test1");

  const notFoundNode = linkedList.find({ callback: (value) => value.key === 5 });
  assertEquals(notFoundNode, null);

  const undefinedNode = linkedList.find({ callback: undefined });
  assertEquals(undefinedNode, null);
});

Deno.test("LinkedList - linked list from array", () => {
  const linkedList = new LinkedList();

  linkedList.fromArray([1, 2, 3, 4, 5]);
  assertEquals(linkedList.toString(), "1,2,3,4,5");
});

Deno.test("LinkedList - should convert to array", () => {
  const linkedList = new LinkedList<number>();
  linkedList.append(1).append(2).append(3);

  assertEquals(linkedList.toArray().join(","), "1,2,3");
});

Deno.test("LinkedList - should reverse linked list", () => {
  const linkedList = new LinkedList<number>();

  linkedList.append(1).append(2).append(3).append(4).append(5);
  assertEquals(linkedList.toString(), "1,2,3,4,5");
  assertEquals(linkedList.head?.value, 1);
  assertEquals(linkedList.tail?.value, 5);

  // Reverse linked list.
  linkedList.reverse();
  assertEquals(linkedList.toString(), "5,4,3,2,1");
  assertEquals(linkedList.head?.value, 5);
  assertEquals(linkedList.tail?.value, 1);

  // Reverse linked list back to initial state.
  linkedList.reverse();
  assertEquals(linkedList.toString(), "1,2,3,4,5");
  assertEquals(linkedList.head?.value, 1);
  assertEquals(linkedList.tail?.value, 5);
});
