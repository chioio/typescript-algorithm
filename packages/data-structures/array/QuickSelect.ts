/**
 * QuickSelect
 *
 * 快速选择是一种从无序列表中找到第k小元素的选择算法。
 *
 * @复杂度 O(n)   平均复杂度
 * @复杂度 O(n^2) 最坏的情况
 */
export class QuickSelectFR {
  // 数组
  arr: number[];
  // 第k个元素
  kth: number;
  // 左元素下标
  leftIndex?: number;
  // 右元素下标
  rightIndex?: number;

  constructor(arr: number[], kth: number, leftIndex?: number, rightIndex?: number) {
    this.arr = arr;
    this.kth = kth;
    this.leftIndex = leftIndex;
    this.rightIndex = rightIndex;
  }

  public exec() {
    let left = this.leftIndex || 0;
    let right = this.rightIndex || this.arr.length - 1;

    while (right > left) {
      // 600 和 0.5 是任意常数（最小化执行时间）
      if (right - left > 600) {
        const n = right - left + 1;
        const m = this.kth - left + 1;
        const z = Math.log(n);
        const s = 0.5 * Math.exp((2 * z) / 3);
        let sd = 0.5 * Math.sqrt((z * s * (n - s)) / n);
        if (m - n / 2 < 0) sd *= -1;
        const newLeft = Math.max(left, Math.floor(this.kth - (m * s) / n + sd));
        const newRight = Math.min(right, Math.floor(this.kth + ((n - m) * s) / n + sd));
        new QuickSelectFR(this.arr, this.kth, newLeft, newRight);
      }

      const t = this.arr[this.kth];
      let i = left;
      let j = right;

      this.swap(this.arr, left, this.kth);
      if (this.arr[right] > t) this.swap(this.arr, left, right);

      while (i < j) {
        this.swap(this.arr, i, j);
        i++;
        j--;
        while (this.arr[i] < t) i++;
        while (this.arr[j] > t) j--;
      }

      if (this.arr[left] === t) this.swap(this.arr, left, j);
      else {
        j++;
        this.swap(this.arr, j, right);
      }

      if (j <= this.kth) left = j + 1;
      if (this.kth <= j) right = j - 1;
    }
  }

  private swap(arr: number[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
