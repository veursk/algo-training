/**
 * Heap 테스트 케이스
 * - heapify, buildHeap: 전제/동작이 정해진 경우만 배열 전체 비교. buildHeap은 루트·길이·extract 순서로 검증 (배열 순서는 구현에 따라 다를 수 있음).
 * - sort: expectSorted + input 사용 시 "정렬 방향만 맞고 원소 multiset 동일"이면 통과 (구현에 따라 동일 입력도 결과 순서가 다를 수 있음).
 *   빈 배열, 원소 1개, 원본 변경 없음은 expect로 정확 비교.
 */

export const testCases = [
  // ===================== heapify =====================
  {
    name: "[heapify] MinHeap - 리프(자식 없음)면 변화 없음",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [10, 20, 30];
      h.heapify(2);
      return h.heap;
    },
    expect: [10, 20, 30],
  },
  {
    name: "[heapify] MinHeap - 루트(0) 한 번 스왑",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [5, 1, 2];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 1,
  },
  {
    name: "[heapify] MinHeap - 루트에서 깊이 2까지 sift-down",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [10, 2, 3, 4, 5, 6, 7];
      h.heapify(0);
      return h.heap;
    },
    expect: [2, 4, 3, 10, 5, 6, 7],
  },
  {
    name: "[heapify] MinHeap - 인덱스 1만 복구",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [1, 9, 2, 3, 4];
      h.heapify(1);
      return h.heap;
    },
    expect: [1, 3, 2, 9, 4],
  },
  {
    name: "[heapify] MinHeap - 이미 힙이면 변화 없음",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [1, 3, 2, 5, 4];
      h.heapify(0);
      return h.heap;
    },
    expect: [1, 3, 2, 5, 4],
  },
  {
    name: "[heapify] MinHeap - 원소 1개(리프)",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [7];
      h.heapify(0);
      return h.heap;
    },
    expect: [7],
  },
  {
    name: "[heapify] MaxHeap - 루트 한 번 스왑",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [1, 5, 4];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 5,
  },
  {
    name: "[heapify] MaxHeap - 인덱스 1 복구",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [9, 1, 8, 7, 6];
      h.heapify(1);
      return h.heap;
    },
    expect: [9, 7, 8, 1, 6],
  },
  {
    name: "[heapify] MaxHeap - 루트에서 깊이 2까지 sift-down",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [1, 10, 9, 8, 7, 6, 5];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 10,
  },
  {
    name: "[heapify] MaxHeap - 이미 힙이면 변화 없음",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [9, 5, 8, 1, 4];
      h.heapify(0);
      return h.heap;
    },
    expect: [9, 5, 8, 1, 4],
  },

  // ===================== buildHeap =====================
  // (힙 배열 순서는 구현마다 다를 수 있으므로 루트·길이·extract 순서로만 검증)
  {
    name: "[buildHeap] MinHeap - 빈 배열",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([]);
      return [h.heap.length, h.heap[0]];
    },
    expect: [0, undefined],
  },
  {
    name: "[buildHeap] MinHeap - 원소 1개",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([42]);
      return [h.heap[0], h.heap.length];
    },
    expect: [42, 1],
  },
  {
    name: "[buildHeap] MinHeap - 원소 2개 후 루트",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([5, 3]);
      return h.heap[0];
    },
    expect: 3,
  },
  {
    name: "[buildHeap] MinHeap - 섞인 순서 후 루트·길이",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([3, 1, 4, 1, 5, 9, 2, 6]);
      return [h.heap[0], h.heap.length];
    },
    expect: [1, 8],
  },
  {
    name: "[buildHeap] MinHeap - 원본 배열 변경 없음",
    run: ({ MinHeap }) => {
      const arr = [3, 1, 2];
      const h = new MinHeap();
      h.buildHeap(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: "[buildHeap] MinHeap - 7개 섞인 후 extract 순서",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([7, 2, 9, 1, 5, 3, 4]);
      const out = [];
      while (h.heap.length > 0) {
        out.push(h.heap[0]);
        if (h.heap.length === 1) break;
        h.heap[0] = h.heap.pop();
        h.heapify(0);
      }
      return out;
    },
    expect: [1, 2, 3, 4, 5, 7, 9],
  },
  {
    name: "[buildHeap] MaxHeap - 빈 배열",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([]);
      return [h.heap.length, h.heap[0]];
    },
    expect: [0, undefined],
  },
  {
    name: "[buildHeap] MaxHeap - 원소 1개",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([42]);
      return [h.heap[0], h.heap.length];
    },
    expect: [42, 1],
  },
  {
    name: "[buildHeap] MaxHeap - 원소 2개 후 루트",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([3, 5]);
      return h.heap[0];
    },
    expect: 5,
  },
  {
    name: "[buildHeap] MaxHeap - 섞인 순서 후 루트·길이",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([3, 1, 4, 1, 5, 9, 2, 6]);
      return [h.heap[0], h.heap.length];
    },
    expect: [9, 8],
  },
  {
    name: "[buildHeap] MaxHeap - 원본 배열 변경 없음",
    run: ({ MaxHeap }) => {
      const arr = [3, 1, 2];
      const h = new MaxHeap();
      h.buildHeap(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: "[buildHeap] MaxHeap - 7개 섞인 후 extract 순서",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([7, 2, 9, 1, 5, 3, 4]);
      const out = [];
      while (h.heap.length > 0) {
        out.push(h.heap[0]);
        if (h.heap.length === 1) break;
        h.heap[0] = h.heap.pop();
        h.heapify(0);
      }
      return out;
    },
    expect: [9, 7, 5, 4, 3, 2, 1],
  },

  // ===================== sort (heap 정렬) =====================
  // expectSorted + input: 결과가 해당 방향으로 정렬되어 있고 원소 multiset이 input과 같으면 통과 (구현에 따라 순서만 다를 수 있음).
  // expect만 있는 경우: 정확 비교 (빈 배열, 원소 1개, 원본 변경 없음).

  // ----- MinHeap sort (오름차순) -----
  {
    name: "[sort] MinHeap - 빈 배열",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([]);
    },
    expect: [],
  },
  {
    name: "[sort] MinHeap - 원소 1개",
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([7]);
    },
    expect: [7],
  },
  {
    name: "[sort] MinHeap - 원본 변경 없음",
    run: ({ MinHeap }) => {
      const arr = [3, 1, 2];
      const h = new MinHeap();
      h.sort(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: "[sort] MinHeap - 2개 섞인 → 오름차순",
    input: [2, 1],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 3개 섞인 (3,1,2) → 오름차순",
    input: [3, 1, 2],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 5개 섞인 (3,1,4,2,5) → 오름차순",
    input: [3, 1, 4, 2, 5],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 5개 섞인 (2,5,1,4,3) → 오름차순",
    input: [2, 5, 1, 4, 3],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 8개 섞인 (3,1,4,1,5,9,2,6) → 오름차순",
    input: [3, 1, 4, 1, 5, 9, 2, 6],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 10개 섞인 → 오름차순",
    input: [6, 2, 8, 0, 4, 7, 1, 5, 3, 9],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 이미 오름차순 (1,2,3,4,5) → 변화 없음",
    input: [1, 2, 3, 4, 5],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 역순 (5,4,3,2,1) → 오름차순",
    input: [5, 4, 3, 2, 1],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 중복 많음 (2,2,2,1,1,3,3,3) → 오름차순",
    input: [2, 2, 2, 1, 1, 3, 3, 3],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 전부 동일 (7,7,7,7) → 오름차순",
    input: [7, 7, 7, 7],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 음수 섞인 (-1,2,-3,0,4) → 오름차순",
    input: [-1, 2, -3, 0, 4],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 전부 음수 (-5,-1,-3,-2,-4) → 오름차순",
    input: [-5, -1, -3, -2, -4],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 0 포함 (0,3,-2,0,1) → 오름차순",
    input: [0, 3, -2, 0, 1],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 큰 수 섞인 (100,1,999,50,0) → 오름차순",
    input: [100, 1, 999, 50, 0],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 길이 15 섞인 → 오름차순",
    input: [14, 2, 11, 7, 0, 9, 5, 12, 3, 8, 1, 10, 6, 13, 4],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MinHeap - 한 쪽 치우침 (1,1,1,1,9) → 오름차순",
    input: [1, 1, 1, 1, 9],
    expectSorted: "asc",
    run: ({ MinHeap }, tc) => {
      const h = new MinHeap();
      return h.sort(tc.input);
    },
  },

  // ----- MaxHeap sort (내림차순) -----
  {
    name: "[sort] MaxHeap - 빈 배열",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([]);
    },
    expect: [],
  },
  {
    name: "[sort] MaxHeap - 원소 1개",
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([7]);
    },
    expect: [7],
  },
  {
    name: "[sort] MaxHeap - 원본 변경 없음",
    run: ({ MaxHeap }) => {
      const arr = [3, 1, 2];
      const h = new MaxHeap();
      h.sort(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: "[sort] MaxHeap - 2개 섞인 (2,1) → 내림차순",
    input: [2, 1],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 3개 섞인 (1,3,2) → 내림차순",
    input: [1, 3, 2],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 5개 섞인 (4,2,5,1,3) → 내림차순",
    input: [4, 2, 5, 1, 3],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 5개 섞인 (5,4,3,2,1) 동등값 없음 → 내림차순",
    input: [5, 4, 3, 2, 1],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 8개 섞인 (3,1,4,1,5,9,2,6) → 내림차순",
    input: [3, 1, 4, 1, 5, 9, 2, 6],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 10개 섞인 → 내림차순",
    input: [6, 2, 8, 0, 4, 7, 1, 5, 3, 9],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 이미 내림차순 (5,4,3,2,1) → 변화 없음",
    input: [5, 4, 3, 2, 1],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 오름차순 입력 (1,2,3,4,5) → 내림차순",
    input: [1, 2, 3, 4, 5],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 중복 (2,2,2,1,1,3,3,3) → 내림차순",
    input: [2, 2, 2, 1, 1, 3, 3, 3],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 전부 동일 (7,7,7,7) → 내림차순",
    input: [7, 7, 7, 7],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 음수 섞인 (-1,2,-3,0,4) → 내림차순",
    input: [-1, 2, -3, 0, 4],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 전부 음수 (-5,-1,-3,-2,-4) → 내림차순",
    input: [-5, -1, -3, -2, -4],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 0 포함 (0,3,-2,0,1) → 내림차순",
    input: [0, 3, -2, 0, 1],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 큰 수 섞인 (100,1,999,50,0) → 내림차순",
    input: [100, 1, 999, 50, 0],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 길이 15 섞인 → 내림차순",
    input: [14, 2, 11, 7, 0, 9, 5, 12, 3, 8, 1, 10, 6, 13, 4],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
  {
    name: "[sort] MaxHeap - 한 쪽 치우침 (9,1,1,1,1) → 내림차순",
    input: [9, 1, 1, 1, 1],
    expectSorted: "desc",
    run: ({ MaxHeap }, tc) => {
      const h = new MaxHeap();
      return h.sort(tc.input);
    },
  },
];
