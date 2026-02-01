/**
 * Counting sort 테스트 케이스
 * - sort: expectSorted + input 사용. 결과가 오름차순이고 원소 multiset이 input과 같으면 통과.
 * - 정수 배열 전제. 빈 배열·원소 1개·원본 불변은 expect로 정확 비교.
 */

export const testCases = [
  // ===================== sort =====================
  {
    name: "[sort] 빈 배열",
    run: ({ sort }) => sort([]),
    expect: [],
  },
  {
    name: "[sort] 원소 1개",
    run: ({ sort }) => sort([7]),
    expect: [7],
  },
  {
    name: "[sort] 원본 변경 없음",
    run: ({ sort }) => {
      const arr = [3, 1, 2];
      sort(arr);
      return arr;
    },
    expect: [3, 1, 2],
  },

  // ----- 비음수·작은 범위 (counting sort에 적합) -----
  {
    name: "[sort] 2개 (2,1) → 오름차순",
    input: [2, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 3개 (3,1,2) → 오름차순",
    input: [3, 1, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 5개 (3,1,4,2,5) → 오름차순",
    input: [3, 1, 4, 2, 5],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 이미 오름차순 (1,2,3,4,5)",
    input: [1, 2, 3, 4, 5],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 역순 (5,4,3,2,1) → 오름차순",
    input: [5, 4, 3, 2, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 중복 많음 (2,2,2,1,1,3,3,3)",
    input: [2, 2, 2, 1, 1, 3, 3, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 전부 동일 (7,7,7,7)",
    input: [7, 7, 7, 7],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 0 포함 (0,3,1,2)",
    input: [0, 3, 1, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 0만 여러 개 (0,0,0,0)",
    input: [0, 0, 0, 0],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 0과 1만 (0,1,0,1,0,1)",
    input: [0, 1, 0, 1, 0, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 작은 범위 0~4 (4,1,0,3,2)",
    input: [4, 1, 0, 3, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 한 값만 여러 번 (1,1,1,1,9)",
    input: [1, 1, 1, 1, 9],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 음수 포함 (min~max 범위 추론) -----
  {
    name: "[sort] 음수 섞인 (-1,2,-3,0,4)",
    input: [-1, 2, -3, 0, 4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 전부 음수 (-5,-1,-3,-2,-4)",
    input: [-5, -1, -3, -2, -4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 0과 음수 (0,3,-2,0,1)",
    input: [0, 3, -2, 0, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] -1~1 (-1,0,1,-1,0,1)",
    input: [-1, 0, 1, -1, 0, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] -5~5 범위 (-3,5,-1,2,0,4,-2,1,3,-4)",
    input: [-3, 5, -1, 2, 0, 4, -2, 1, 3, -4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 원소 1개 - 0",
    run: ({ sort }) => sort([0]),
    expect: [0],
  },
  {
    name: "[sort] 원소 1개 - 음수",
    run: ({ sort }) => sort([-99]),
    expect: [-99],
  },

  // ----- 길이·패턴 변형 -----
  {
    name: "[sort] 2개 이미 오름차순 (1,2)",
    input: [1, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 4개 역순 (4,3,2,1)",
    input: [4, 3, 2, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 4개 섞인 (4,1,3,2)",
    input: [4, 1, 3, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 6개 (6,2,5,1,4,3)",
    input: [6, 2, 5, 1, 4, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 8개 (3,1,4,1,5,9,2,6)",
    input: [3, 1, 4, 1, 5, 9, 2, 6],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 10개 (6,2,8,0,4,7,1,5,3,9)",
    input: [6, 2, 8, 0, 4, 7, 1, 5, 3, 9],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 1과 2 번갈아 (1,2,1,2,1,2)",
    input: [1, 2, 1, 2, 1, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 2종만 한쪽 많음 (1,2,2,2,2,2)",
    input: [1, 2, 2, 2, 2, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 2종만 한쪽 많음 (2,1,1,1,1,1)",
    input: [2, 1, 1, 1, 1, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 범위·큰 수 (counting sort는 범위가 크면 비효율이지만 결과는 동일) -----
  {
    name: "[sort] 큰 수 섞인 (100,1,999,50,0)",
    input: [100, 1, 999, 50, 0],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 큰 음수~큰 양수 (-100,50,0,-50,100)",
    input: [-100, 50, 0, -50, 100],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 길이 15 (0~14 섞인)",
    input: [14, 2, 11, 7, 0, 9, 5, 12, 3, 8, 1, 10, 6, 13, 4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 길이 20 섞인",
    input: [
      20, 3, 17, 8, 12, 1, 19, 6, 14, 4, 11, 18, 2, 16, 9, 5, 13, 7, 10, 15,
    ],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 1,2,3 각 3개씩",
    input: [2, 1, 3, 2, 3, 1, 2, 3, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 10,20,30 각 2개씩",
    input: [20, 10, 30, 10, 20, 30],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
];
