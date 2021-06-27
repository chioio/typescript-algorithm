import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
// Samples
import { fastPower } from "../fastPower.ts";
import { iterativePower } from "../iterativePower.ts";
import { factorial } from "../factorial.ts";
import { pairs } from "../pairs.ts";
import { multiplyArrayInPlace } from "../multiplyArrayInPlace.ts";
import { multiplyArray } from "../multiplyArray.ts";

Deno.test("fastPower - should calculate the number power fast", () => {
  assertEquals(fastPower(2, 2), 4);
  assertEquals(fastPower(2, 1), 2);
  assertEquals(fastPower(2, 0), 1);
  assertEquals(fastPower(1, 2), 1);
  assertEquals(fastPower(1, 0), 1);
  assertEquals(fastPower(0, 1), 0);
  assertEquals(fastPower(0, 0), 1);
});

Deno.test("iterativePower - should calculate the number power with iteration", () => {
  assertEquals(iterativePower(2, 2), 4);
  assertEquals(iterativePower(2, 1), 2);
  assertEquals(iterativePower(2, 0), 1);
  assertEquals(iterativePower(1, 2), 1);
  assertEquals(iterativePower(1, 0), 1);
  assertEquals(iterativePower(0, 1), 0);
  assertEquals(iterativePower(0, 0), 1);
});

Deno.test("factorial - should calculate factorial with recursion", () => {
  assertEquals(factorial(5), 120);
  assertEquals(factorial(1), 1);
  assertEquals(factorial(0), 1);
});

Deno.test("pairs - should output the all possible pairs out of the provide letters", () => {
  assertEquals(pairs(["a", "b", "c"]), ["aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"]);
  assertEquals(pairs([" "]), ["  "]);
  assertEquals(pairs([""]), [""]);
});

Deno.test("multiplyArray & multiplyArrayInPlace - should calculate the multiply from the array parameter", () => {
  assertEquals(multiplyArray([2, 3, 4, 5], 2), [4, 6, 8, 10]);
  assertEquals(multiplyArray([0, 1, -1], 2), [0, 2, -2]);
  assertEquals(multiplyArrayInPlace([2, 3, 4, 5], 2), [4, 6, 8, 10]);
  assertEquals(multiplyArrayInPlace([0, 1, -1], 2), [0, 2, -2]);
});
