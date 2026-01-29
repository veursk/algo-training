/**
 * ========== 구현할 메서드 (매일 지우고 새로 구현 연습) ==========
 *
 * [ MinHeap / MaxHeap 공통 ]
 *
 * 1. heapify(i)
 *    - 인덱스 i를 루트로 하는 서브트리를 힙으로 만든다.
 *    - i의 왼쪽/오른쪽 자식 서브트리는 이미 힙이라고 가정.
 *    - i에서부터 자식과 비교하며 아래로 내려가며 자리 맞춤 (sift down).
 *
 * 2. buildHeap(arr)
 *    - 배열 arr을 복사해 this.heap에 넣고, 배열 전체를 힙 구조로 만든다.
 *    - 마지막 비리프 노드(인덱스 floor(n/2)-1)부터 인덱스 0까지 순서대로 heapify(i) 호출.
 *
 * 3. sort(arr)
 *    - 배열 arr을 오름차순으로 정렬한 새 배열을 반환한다.
 *    - buildHeap(arr)로 힙을 만든 뒤, extract()를 n번 호출해 꺼낸 값들을 순서대로 모아 반환.
 *    - MinHeap: extract가 최솟값이므로 그대로 순서대로 모으면 오름차순.
 *    - MaxHeap: extract가 최댓값이므로 모은 배열을 reverse() 해서 오름차순으로 반환.
 *
 * (insert, peek, size, isEmpty, toArray 등은 연습 대상 아님. extract/isEmpty는 sort용으로 제공.)
 *
 * =============================================================
 *
 * MinHeap: 부모 <= 자식. 루트가 최솟값.
 * MaxHeap: 부모 >= 자식. 루트가 최댓값.
 */
