/**
 * QuickSelect
 *
 * 快速选择是一种从无序列表中找到第k个最小的元素的选择算法。
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

      // 标记 arr[kth]
      const t = this.arr[this.kth];
      // 标记左下标
      let i = left;
      // 标记右下标
      let j = right;

      // 交换 arr[kth] 和 arr[left]
      this.swap(this.arr, left, this.kth);
      // 判断 arr[kth] 右边元素是否大于 arr[kth]
      if (this.arr[right] > t) this.swap(this.arr, left, right);

      // 遍历 arr
      while (i < j) {
        // 交换 arr[i] 和 arr[j]
        this.swap(this.arr, i, j);
        i++;
        j--;
        // 当 arr[i] 小于 arr[kth]
        while (this.arr[i] < t) i++;
        // 当 arr[j] 大于 arr[kth]
        while (this.arr[j] > t) j--;
      }

      if (this.arr[left] === t) {
        // 交换 arr[left] 和 arr[j]
        this.swap(this.arr, left, j);
      } else {
        j++;
        // 交换 arr[right] 和 arr[j]
        this.swap(this.arr, j, right);
      }

      if (j <= this.kth) left = j + 1;
      if (j >= this.kth) right = j - 1;
    }
  }

  private swap(arr: number[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
