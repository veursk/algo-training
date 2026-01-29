/**
 * Heap 테스트 케이스
 * 각 케이스: { name, run(module), expect }
 * run({ MinHeap, MaxHeap }) 의 반환값이 expect와 일치해야 통과
 */

export const testCases = [
  // ---------- extract / isEmpty (sort 내부 사용) ----------
  {
    name: 'MinHeap 빈 heap extract는 undefined',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.extract();
    },
    expect: undefined,
  },
  {
    name: 'MaxHeap 빈 heap extract는 undefined',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.extract();
    },
    expect: undefined,
  },

  // ---------- MinHeap heapify ----------
  {
    name: 'MinHeap heapify - 리프만 있으면 변화 없음',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [10, 20, 30];
      h.heapify(0);
      return h.toArray();
    },
    expect: [10, 20, 30],
  },
  {
    name: 'MinHeap heapify(0) - 루트가 자식보다 크면 내려감',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [5, 1, 2];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 1,
  },
  {
    name: 'MinHeap heapify(0) - 깊은 서브트리까지 정렬',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [10, 2, 3, 4, 5, 6, 7];
      h.heapify(0);
      return h.toArray();
    },
    expect: [2, 4, 3, 10, 5, 6, 7],
  },
  {
    name: 'MinHeap heapify(1) - 중간 인덱스만 복구',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.heap = [1, 9, 2, 3, 4];
      h.heapify(1);
      return h.toArray();
    },
    expect: [1, 3, 2, 9, 4],
  },

  // ---------- MinHeap buildHeap ----------
  {
    name: 'MinHeap buildHeap - 빈 배열',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([]);
      return [h.heap.length, h.heap[0]];
    },
    expect: [0, undefined],
  },
  {
    name: 'MinHeap buildHeap - 원소 1개',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([42]);
      return [h.heap[0], h.heap.length];
    },
    expect: [42, 1],
  },
  {
    name: 'MinHeap buildHeap - 원소 2개',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([5, 3]);
      return h.toArray();
    },
    expect: [3, 5],
  },
  {
    name: 'MinHeap buildHeap - 이미 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([1, 2, 3, 4, 5]);
      return h.heap[0];
    },
    expect: 1,
  },
  {
    name: 'MinHeap buildHeap - 내림차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([5, 4, 3, 2, 1]);
      return h.heap[0];
    },
    expect: 1,
  },
  {
    name: 'MinHeap buildHeap - 랜덤 순서',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([3, 1, 4, 1, 5, 9, 2, 6]);
      return h.heap[0];
    },
    expect: 1,
  },
  {
    name: 'MinHeap buildHeap 후 extract 순서',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([5, 2, 8, 1, 9]);
      const out = [];
      while (!h.isEmpty()) out.push(h.extract());
      return out;
    },
    expect: [1, 2, 5, 8, 9],
  },
  {
    name: 'MinHeap buildHeap - 원본 배열 변경 없음',
    run: ({ MinHeap }) => {
      const arr = [3, 1, 2];
      const h = new MinHeap();
      h.buildHeap(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },

  // ---------- MinHeap sort ----------
  {
    name: 'MinHeap sort - 빈 배열',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([]);
    },
    expect: [],
  },
  {
    name: 'MinHeap sort - 원소 1개',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([7]);
    },
    expect: [7],
  },
  {
    name: 'MinHeap sort - 오름차순 유지',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([1, 2, 3, 4, 5]);
    },
    expect: [1, 2, 3, 4, 5],
  },
  {
    name: 'MinHeap sort - 내림차순 입력',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([5, 4, 3, 2, 1]);
    },
    expect: [1, 2, 3, 4, 5],
  },
  {
    name: 'MinHeap sort - 랜덤',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([3, 1, 4, 1, 5, 9, 2, 6]);
    },
    expect: [1, 1, 2, 3, 4, 5, 6, 9],
  },
  {
    name: 'MinHeap sort - 중복 많음',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([2, 2, 2, 1, 1, 3, 3, 3]);
    },
    expect: [1, 1, 2, 2, 2, 3, 3, 3],
  },
  {
    name: 'MinHeap sort - 음수 포함',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      return h.sort([-1, 2, -3, 0, 4]);
    },
    expect: [-3, -1, 0, 2, 4],
  },
  {
    name: 'MinHeap sort - 원본 배열 변경 없음',
    run: ({ MinHeap }) => {
      const arr = [3, 1, 2];
      const h = new MinHeap();
      h.sort(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: 'MinHeap sort 후 heap 비어있음',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.sort([1, 2, 3]);
      return [h.isEmpty(), h.heap.length];
    },
    expect: [true, 0],
  },

  // ---------- MaxHeap heapify ----------
  {
    name: 'MaxHeap heapify(0) - 루트가 자식보다 작으면 내려감',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [1, 5, 4];
      h.heapify(0);
      return h.heap[0];
    },
    expect: 5,
  },
  {
    name: 'MaxHeap heapify(1) - 중간 인덱스 복구',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.heap = [9, 1, 8, 7, 6];
      h.heapify(1);
      return h.toArray();
    },
    expect: [9, 7, 8, 1, 6],
  },

  // ---------- MaxHeap buildHeap ----------
  {
    name: 'MaxHeap buildHeap - 빈 배열',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([]);
      return [h.heap.length, h.heap[0]];
    },
    expect: [0, undefined],
  },
  {
    name: 'MaxHeap buildHeap - 원소 1개',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([42]);
      return [h.heap[0], h.heap.length];
    },
    expect: [42, 1],
  },
  {
    name: 'MaxHeap buildHeap - 원소 2개',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([3, 5]);
      return h.toArray();
    },
    expect: [5, 3],
  },
  {
    name: 'MaxHeap buildHeap - 랜덤 순서',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([3, 1, 4, 1, 5, 9, 2, 6]);
      return h.heap[0];
    },
    expect: 9,
  },
  {
    name: 'MaxHeap buildHeap 후 extract 순서',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.buildHeap([5, 2, 8, 1, 9]);
      const out = [];
      while (!h.isEmpty()) out.push(h.extract());
      return out;
    },
    expect: [9, 8, 5, 2, 1],
  },
  {
    name: 'MaxHeap buildHeap - 원본 배열 변경 없음',
    run: ({ MaxHeap }) => {
      const arr = [3, 1, 2];
      const h = new MaxHeap();
      h.buildHeap(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },

  // ---------- MaxHeap sort ----------
  {
    name: 'MaxHeap sort - 빈 배열',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([]);
    },
    expect: [],
  },
  {
    name: 'MaxHeap sort - 원소 1개',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([7]);
    },
    expect: [7],
  },
  {
    name: 'MaxHeap sort - 오름차순 결과 (내림 입력)',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([5, 4, 3, 2, 1]);
    },
    expect: [1, 2, 3, 4, 5],
  },
  {
    name: 'MaxHeap sort - 랜덤',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([3, 1, 4, 1, 5, 9, 2, 6]);
    },
    expect: [1, 1, 2, 3, 4, 5, 6, 9],
  },
  {
    name: 'MaxHeap sort - 음수 포함',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      return h.sort([-1, 2, -3, 0, 4]);
    },
    expect: [-3, -1, 0, 2, 4],
  },
  {
    name: 'MaxHeap sort - 원본 배열 변경 없음',
    run: ({ MaxHeap }) => {
      const arr = [3, 1, 2];
      const h = new MaxHeap();
      h.sort(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },
  {
    name: 'MaxHeap sort 후 heap 비어있음',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      h.sort([1, 2, 3]);
      return [h.isEmpty(), h.heap.length];
    },
    expect: [true, 0],
  },

  // ---------- buildHeap / sort 연속 사용 ----------
  {
    name: 'MinHeap buildHeap 후 sort 호출 시 오름차순',
    run: ({ MinHeap }) => {
      const h = new MinHeap();
      h.buildHeap([5, 2, 8, 1]);
      return h.sort([9, 0, 4]);
    },
    expect: [0, 4, 9],
  },
  {
    name: 'MaxHeap buildHeap 후 extract와 sort 결과 일치',
    run: ({ MaxHeap }) => {
      const h = new MaxHeap();
      const arr = [4, 2, 7, 1, 5];
      h.buildHeap(arr);
      const byExtract = [];
      while (!h.isEmpty()) byExtract.push(h.extract());
      const sorted = new MaxHeap().sort(arr);
      return [byExtract.reverse(), sorted];
    },
    expect: [[1, 2, 4, 5, 7], [1, 2, 4, 5, 7]],
  },
];
