import LinkedListNode from "../LinkedListNode.ts";
import { assertEquals, assertExists } from "https://deno.land/std@0.99.0/testing/asserts.ts";

type TestNodeValue = {
  key: number;
  content: string;
};

Deno.test("LinkedListNode - should create list node with value", () => {
  const node = new LinkedListNode(1);

  assertEquals(node.value, 1);
  assertEquals(node.next, null);
});

Deno.test("LinkedListNode - should create list node with object as a value", () => {
  const nodeValue = { key: 1, content: "test" };
  const node = new LinkedListNode<TestNodeValue>(nodeValue);

  assertEquals(node.value.key, 1);
  assertEquals(node.value.content, "test");
  assertEquals(node.next, null);
});

Deno.test("LinkedListNode - should link nodes together", () => {
  const node1 = new LinkedListNode<number>(1);
  const node2 = new LinkedListNode<number>(2, node1);

  assertEquals(node1.next, null);
  assertExists(node2.next);
  assertEquals(node2.value, 2);
  assertEquals(node2.next?.value, 1);
});

Deno.test("LinkedListNode - should convert node to string", () => {
  const node = new LinkedListNode<number | string>(1);

  assertEquals(node.toString(), "1");
  node.value = "string value";
  assertEquals(node.toString(), "string value");
});

Deno.test("LinkedListNode - should convert node to string with custom stringifier", () => {
  const nodeValue = { key: 1, content: "test" };
  const node = new LinkedListNode<TestNodeValue>(nodeValue);
  const toStringCallback = (value: TestNodeValue) => `key: ${value.key}, value: ${value.content}`;

  assertEquals(node.toString(toStringCallback), "key: 1, value: test");
});
