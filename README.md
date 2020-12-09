# TypeScript Algorithm

Relying on [Deno](https://deno.land) environment.

## Data Structure

### List - QuickSelectFR

参考[维基百科 - Floyd-Rivest Algorithm](https://en.wikipedia.org/wiki/Floyd%E2%80%93Rivest_algorithm)

### 算法

Floyd-Rivest算法是一个**分治法**的算法，通过使用采样的辅助将列表分成3组。然后在适当的集合中**递归**选择第`k`个最小的元素。

常规步骤：

1. 从列表`L`中随机选择一个小的列表S
2. 从`S`中，**递归**选取两个元素`u`和`v`，使`u < v`。这两个元素将成为分区的**枢轴**，并且包含它们之间整个列表（排序列表中）的第`k`个最小的元素。
3. 使用`u`和`v`将`S`分区成三个集合：`A`、`B`、`C`；A将包含小于`u`的元素，`B`将包含`u`和`v`之间的元素，`C`将包含大于`v`的元素。
4. 通过将`L`中的其余元素（即`L - S`的元素）与`u`或`v`进行比较，并将它们放入适当的集合中，从而对它们进行分区。如果`k `小于`L`中四舍五入后的元素个数的一半，则应将其余元素先和`v`比较，然后将它们与`u`比较（如果它们小于`v`）。否则，将其余元素先与`u`比较，如果大于`u`则仅与`v`比较。
5. 根据`k`的值，将算法递归应用于适当的集合，以选择`L`中的第`k`个最小的元素。

