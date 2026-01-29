/**
 * Heap 테스트 케이스
 * - heapify, buildHeap: 전제/동작이 정해진 경우만 배열 전체 비교. buildHeap은 루트·길이·extract 순서로 검증 (배열 순서는 구현에 따라 다를 수 있음).
 * - sort: 정렬 결과는 유일하므로 항상 오름차순 배열로 비교. 섞인 입력으로 heap 정렬만 검증.
 */

export const testCases = [
  // ===================== heapify =====================
  {
    name: '[heapify] MinHeap - 리프(자식 없음)면 변화 없음',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [10, 20, 30];
      h.heapify(2);
      return h.heap;
    },
    expect: [10, 20, 30],
  },
  {
    name: '[heapify] MinHeap - 루트(0) 한 번 스왑',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [5, 1, 2];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 1,
  },
  {
    name: '[heapify] MinHeap - 루트에서 깊이 2까지 sift-down',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [10, 2, 3, 4, 5, 6, 7];
      h.heapify(0);
      return h.heap;
    },
    expect: [2, 4, 3, 10, 5, 6, 7],
  },
  {
    name: '[heapify] MinHeap - 인덱스 1만 복구',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [1, 9, 2, 3, 4];
      h.heapify(1);
      return h.heap;
    },
    expect: [1, 3, 2, 9, 4],
  },
  {
    name: '[heapify] MinHeap - 이미 힙이면 변화 없음',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [1, 3, 2, 5, 4];
      h.heapify(0);
      return h.heap;
    },
    expect: [1, 3, 2, 5, 4],
  },
  {
    name: '[heapify] MinHeap - 원소 1개(리프)',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [7];
      h.heapify(0);
      return h.heap;
    },
    expect: [7],
  },
  {
    name: '[heapify] MaxHeap - 루트 한 번 스왑',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [1, 5, 4];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 5,
  },
  {
    name: '[heapify] MaxHeap - 인덱스 1 복구',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [9, 1, 8, 7, 6];
      h.heapify(1);
      return h.heap;
    },
    expect: [9, 7, 8, 1, 6],
  },
  {
    name: '[heapify] MaxHeap - 루트에서 깊이 2까지 sift-down',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [1, 10, 9, 8, 7, 6, 5];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 10,
  },
  {
    name: '[heapify] MaxHeap - 이미 힙이면 변화 없음',
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
    name: '[buildHeap] MinHeap - 빈 배열',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([]);
      return [h.heap.length, h.heap[0]];
    },
    expect: [0, undefined],
  },
  {
    name: '[buildHeap] MinHeap - 원소 1개',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([42]);
      return [h.heap[0], h.heap.length];
    },
    expect: [42, 1],
  },
  {
    name: '[buildHeap] MinHeap - 원소 2개 후 루트',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([5, 3]);
      return h.heap[0];
    },
    expect: 3,
  },
  {
    name: '[buildHeap] MinHeap - 섞인 순서 후 루트·길이',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([3, 1, 4, 1, 5, 9, 2, 6]);
      return [h.heap[0], h.heap.length];
    },
    expect: [1, 8],
  },
  {
    name: '[buildHeap] MinHeap - 원본 배열 변경 없음',
    run: ({ MinHeap }) => {
      const arr = [3, 1, 2];
      const h = new MinHeap();
      h.buildHeap(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: '[buildHeap] MinHeap - 7개 섞인 후 extract 순서',
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
    name: '[buildHeap] MaxHeap - 빈 배열',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([]);
      return [h.heap.length, h.heap[0]];
    },
    expect: [0, undefined],
  },
  {
    name: '[buildHeap] MaxHeap - 원소 1개',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([42]);
      return [h.heap[0], h.heap.length];
    },
    expect: [42, 1],
  },
  {
    name: '[buildHeap] MaxHeap - 원소 2개 후 루트',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([3, 5]);
      return h.heap[0];
    },
    expect: 5,
  },
  {
    name: '[buildHeap] MaxHeap - 섞인 순서 후 루트·길이',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([3, 1, 4, 1, 5, 9, 2, 6]);
      return [h.heap[0], h.heap.length];
    },
    expect: [9, 8],
  },
  {
    name: '[buildHeap] MaxHeap - 원본 배열 변경 없음',
    run: ({ MaxHeap }) => {
      const arr = [3, 1, 2];
      const h = new MaxHeap();
      h.buildHeap(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: '[buildHeap] MaxHeap - 7개 섞인 후 extract 순서',
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
  // 정렬 결과는 유일 → 항상 오름차순 배열로 검증. 입력은 전부 섞인 순서.
  {
    name: '[sort] MinHeap - 빈 배열',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([]);
    },
    expect: [],
  },
  {
    name: '[sort] MinHeap - 원소 1개',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([7]);
    },
    expect: [7],
  },
  {
    name: '[sort] MinHeap - 섞인 (3,1,4,2,5) → 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([3, 1, 4, 2, 5]);
    },
    expect: [1, 2, 3, 4, 5],
  },
  {
    name: '[sort] MinHeap - 섞인 (2,5,1,4,3) → 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([2, 5, 1, 4, 3]);
    },
    expect: [1, 2, 3, 4, 5],
  },
  {
    name: '[sort] MinHeap - 섞인 (3,1,4,1,5,9,2,6) → 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([3, 1, 4, 1, 5, 9, 2, 6]);
    },
    expect: [1, 1, 2, 3, 4, 5, 6, 9],
  },
  {
    name: '[sort] MinHeap - 중복 (2,2,2,1,1,3,3,3) → 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([2, 2, 2, 1, 1, 3, 3, 3]);
    },
    expect: [1, 1, 2, 2, 2, 3, 3, 3],
  },
  {
    name: '[sort] MinHeap - 음수 섞인 (-1,2,-3,0,4) → 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([-1, 2, -3, 0, 4]);
    },
    expect: [-3, -1, 0, 2, 4],
  },
  {
    name: '[sort] MinHeap - 원본 변경 없음',
    run: ({ MinHeap }) => {
      const arr = [3, 1, 2];
      const h = new MinHeap();
      h.sort(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: '[sort] MinHeap - 길이 10 섞인 → 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([6, 2, 8, 0, 4, 7, 1, 5, 3, 9]);
    },
    expect: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    name: '[sort] MaxHeap - 빈 배열',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([]);
    },
    expect: [],
  },
  {
    name: '[sort] MaxHeap - 원소 1개',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([7]);
    },
    expect: [7],
  },
  {
    name: '[sort] MaxHeap - 섞인 (4,2,5,1,3) → 내림차순',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([4, 2, 5, 1, 3]);
    },
    expect: [5, 4, 3, 2, 1],
  },
  {
    name: '[sort] MaxHeap - 섞인 (3,1,4,1,5,9,2,6) → 내림차순',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([3, 1, 4, 1, 5, 9, 2, 6]);
    },
    expect: [9, 6, 5, 4, 3, 2, 1, 1],
  },
  {
    name: '[sort] MaxHeap - 음수 섞인 (-1,2,-3,0,4) → 내림차순',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([-1, 2, -3, 0, 4]);
    },
    expect: [4, 2, 0, -1, -3],
  },
  {
    name: '[sort] MaxHeap - 원본 변경 없음',
    run: ({ MaxHeap }) => {
      const arr = [3, 1, 2];
      const h = new MaxHeap();
      h.sort(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: '[sort] MaxHeap - 길이 10 섞인 → 내림차순',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([6, 2, 8, 0, 4, 7, 1, 5, 3, 9]);
    },
    expect: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  },
];
