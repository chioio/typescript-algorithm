import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { QuickSelectFR } from './QuickSelect.ts';

Deno.test('QuickSelectFR 短数组', () => {
  const arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
  new QuickSelectFR(arr, 5).exec();
  // arr.forEach(ele => {
  //   console.log(ele)
  // });
  // 12, 21, 22, 28, 28, 33, 39, 50, 53, 56, 90, 65, 59, 77, 95
  assertEquals(arr, [12, 21, 22, 28, 28, 33, 39, 50, 53, 56, 90, 65, 59, 77, 95]);
});

Deno.test('QuickSelectFR 长数组', () => {
  const arr = [];
  for (let i = 1000; i >= 0; i--) arr.push(i);
  new QuickSelectFR(arr, 300).exec();
  // arr.forEach((ele) => {
  //   console.log(ele);
  // });
  //  0, 1, ... , 299, 300, 699, ... , 301, 700, 701, ... , 1000
  assertEquals(arr[300], 300);
});

Deno.test('QuickSelectFR 根据左右下标', () => {
  const arr = [];
  for (let i = 1000; i >= 0; i--) arr.push(i);
  new QuickSelectFR(arr, 400, 10, 620).exec();
  // arr.forEach((ele) => {
  //   console.log(ele);
  // });
  // 1000, 998, ... , 991, 380, ... , 600, 601, 768, 767, ... , 603, 602, 769, 770 , ... , 989, 990 , 379, 378, ... , 1, 0
  assertEquals(arr[300], 700);
});
