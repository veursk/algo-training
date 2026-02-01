/**
 * Quicksort 테스트 케이스
 * - sort: expectSorted + input 사용. 결과가 오름차순이고 원소 multiset이 input과 같으면 통과.
 *   빈 배열, 원소 1개, 원본 변경 없음은 expect로 정확 비교.
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
  {
    name: "[sort] 2개 섞인 (2,1) → 오름차순",
    input: [2, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 3개 섞인 (3,1,2) → 오름차순",
    input: [3, 1, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 5개 섞인 (3,1,4,2,5) → 오름차순",
    input: [3, 1, 4, 2, 5],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 5개 섞인 (2,5,1,4,3) → 오름차순",
    input: [2, 5, 1, 4, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 8개 섞인 (3,1,4,1,5,9,2,6) → 오름차순",
    input: [3, 1, 4, 1, 5, 9, 2, 6],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 10개 섞인 → 오름차순",
    input: [6, 2, 8, 0, 4, 7, 1, 5, 3, 9],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 이미 오름차순 (1,2,3,4,5) → 변화 없음",
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
    name: "[sort] 중복 많음 (2,2,2,1,1,3,3,3) → 오름차순",
    input: [2, 2, 2, 1, 1, 3, 3, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 전부 동일 (7,7,7,7) → 오름차순",
    input: [7, 7, 7, 7],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 음수 섞인 (-1,2,-3,0,4) → 오름차순",
    input: [-1, 2, -3, 0, 4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 전부 음수 (-5,-1,-3,-2,-4) → 오름차순",
    input: [-5, -1, -3, -2, -4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 0 포함 (0,3,-2,0,1) → 오름차순",
    input: [0, 3, -2, 0, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 큰 수 섞인 (100,1,999,50,0) → 오름차순",
    input: [100, 1, 999, 50, 0],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 길이 15 섞인 → 오름차순",
    input: [14, 2, 11, 7, 0, 9, 5, 12, 3, 8, 1, 10, 6, 13, 4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 한 쪽 치우침 (1,1,1,1,9) → 오름차순",
    input: [1, 1, 1, 1, 9],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] pivot이 최소 (0,9,2,5,4) → 오름차순",
    input: [0, 9, 2, 5, 4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] pivot이 최대 (8,1,3,2,9) → 오름차순",
    input: [8, 1, 3, 2, 9],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 길이·순서 변형 -----
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
    name: "[sort] 4개 완전 섞인 (4,1,3,2)",
    input: [4, 1, 3, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 4개 (2,4,1,3) - pivot 중간값",
    input: [2, 4, 1, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 6개 섞인 (6,2,5,1,4,3)",
    input: [6, 2, 5, 1, 4, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 7개 역순 (7,6,5,4,3,2,1)",
    input: [7, 6, 5, 4, 3, 2, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 9개 섞인 (9,1,8,2,7,3,6,4,5)",
    input: [9, 1, 8, 2, 7, 3, 6, 4, 5],
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
    name: "[sort] 길이 25 역순",
    input: [
      25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7,
      6, 5, 4, 3, 2, 1,
    ],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 거의 정렬 / 거의 역순 -----
  {
    name: "[sort] 거의 오름차순 - 한 쌍만 뒤바뀜 (1,2,4,3,5)",
    input: [1, 2, 4, 3, 5],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 거의 오름차순 (1,3,2,4,5)",
    input: [1, 3, 2, 4, 5],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 거의 역순 (5,4,2,3,1)",
    input: [5, 4, 2, 3, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 앞만 정렬 (1,2,3, 5,4)",
    input: [1, 2, 3, 5, 4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 뒤만 정렬 (3,1,2, 4,5)",
    input: [3, 1, 2, 4, 5],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 값 2종 / 반복 패턴 -----
  {
    name: "[sort] 1과 2 번갈아 (1,2,1,2,1,2)",
    input: [1, 2, 1, 2, 1, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 5와 3 번갈아 (5,3,5,3,5,3)",
    input: [5, 3, 5, 3, 5, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 2종만 - 한쪽 많음 (1,2,2,2,2,2)",
    input: [1, 2, 2, 2, 2, 2],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 2종만 - 한쪽 많음 (2,1,1,1,1,1)",
    input: [2, 1, 1, 1, 1, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] pivot이 여러 번 등장 (3,1,3,2,3,4,3)",
    input: [3, 1, 3, 2, 3, 4, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 5,3만 반복 (5,5,3,3,5,3,5,3)",
    input: [5, 5, 3, 3, 5, 3, 5, 3],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 0·음수·범위 -----
  {
    name: "[sort] 0만 여러 개 (0,0,0,0)",
    input: [0, 0, 0, 0],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 0와 1 섞인 (0,1,0,1,0,1)",
    input: [0, 1, 0, 1, 0, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] -1~1 섞인 (-1,0,1,-1,0,1)",
    input: [-1, 0, 1, -1, 0, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] -5~5 범위 섞인 (-3,5,-1,2,0,4,-2,1,3,-4)",
    input: [-3, 5, -1, 2, 0, 4, -2, 1, 3, -4],
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
    name: "[sort] 큰 수들만 (1e6, 999999, 1000000, 1)",
    input: [1e6, 999999, 1000000, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 한쪽 치우침·끝만 다름 -----
  {
    name: "[sort] 앞에만 최소 (0,9,8,7,6,5)",
    input: [0, 9, 8, 7, 6, 5],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 맨 끝에만 최소 (9,8,7,6,5,0)",
    input: [9, 8, 7, 6, 5, 0],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 맨 앞에만 최대 (9,0,1,2,3,4)",
    input: [9, 0, 1, 2, 3, 4],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 맨 끝에만 최대 (0,1,2,3,4,9)",
    input: [0, 1, 2, 3, 4, 9],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 같은 값 7개 + 1 (7,7,7,1,7,7,7,7)",
    input: [7, 7, 7, 1, 7, 7, 7, 7],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 같은 값 7개 + 9 (7,7,7,7,9,7,7,7)",
    input: [7, 7, 7, 7, 9, 7, 7, 7],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 3종 이상 중복 -----
  {
    name: "[sort] 1,2,3 각 3개씩 섞인",
    input: [2, 1, 3, 2, 3, 1, 2, 3, 1],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 10,20,30 각 2개씩 (20,10,30,10,20,30)",
    input: [20, 10, 30, 10, 20, 30],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 길이 30+ (재귀·파티션 검증) -----
  {
    name: "[sort] 길이 30 랜덤형 (한 번에 골고루)",
    input: [
      23, 8, 29, 3, 16, 1, 27, 12, 5, 20, 9, 25, 2, 18, 7, 30, 14, 4, 21, 11,
      26, 6, 19, 10, 28, 15, 22, 13, 17, 24,
    ],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 길이 32 역순 (2의 거듭제곱)",
    input: [
      32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15,
      14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },
  {
    name: "[sort] 길이 40 - 0~39 셔플",
    input: [
      7, 32, 0, 19, 4, 25, 11, 36, 2, 28, 15, 39, 8, 22, 5, 31, 18, 1, 34, 12,
      27, 6, 21, 38, 9, 24, 13, 30, 3, 16, 35, 10, 26, 17, 23, 14, 29, 20, 33,
      37,
    ],
    expectSorted: "asc",
    run: ({ sort }, tc) => sort(tc.input),
  },

  // ----- 원소 1개·2개 추가 엣지 -----
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
];
