/**
 * 알고리즘 섹션별 테스트 러너
 * 사용: node scripts/test.js [섹션명]
 *   섹션명 생략 시 모든 섹션 테스트
 *   예: node scripts/test.js heap
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import assert from "assert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const algorithmsDir = path.join(rootDir, "algorithms");

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

function getSections() {
  if (!fs.existsSync(algorithmsDir)) return [];
  return fs
    .readdirSync(algorithmsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

async function runSection(sectionName) {
  const sectionPath = path.join(algorithmsDir, sectionName);
  const implPath = path.join(sectionPath, `${sectionName}.js`);
  const casesPath = path.join(sectionPath, `${sectionName}.test-cases.js`);

  if (!fs.existsSync(implPath) || !fs.existsSync(casesPath)) {
    console.warn(`⚠ ${sectionName}: 구현 또는 테스트 케이스 파일 없음`);
    return { section: sectionName, passed: 0, failed: 0, total: 0, errors: [] };
  }

  const implModule = await import(path.toNamespacedPath(implPath));
  const casesModule = await import(path.toNamespacedPath(casesPath));
  const testCases = casesModule.testCases || [];

  if (!Array.isArray(testCases) || testCases.length === 0) {
    console.warn(`⚠ ${sectionName}: testCases 배열 없음`);
    return { section: sectionName, passed: 0, failed: 0, errors: [] };
  }

  const errors = [];
  let passed = 0;

  function isSorted(arr, order) {
    if (order !== "asc" && order !== "desc") return false;
    for (let i = 1; i < arr.length; i++) {
      if (order === "asc" && arr[i] < arr[i - 1]) return false;
      if (order === "desc" && arr[i] > arr[i - 1]) return false;
    }
    return true;
  }
  function sameElements(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort((x, y) => x - y);
    const sortedB = [...b].sort((x, y) => x - y);
    return sortedA.every((v, i) => v === sortedB[i]);
  }

  for (const tc of testCases) {
    try {
      const result = tc.run(implModule, tc);
      if (tc.expectSorted != null) {
        // sort 테스트: 결과가 올바른 방향으로 정렬되어 있고, 원본과 동일한 원소 multiset이면 통과
        assert(Array.isArray(result), `expected array, got ${typeof result}`);
        assert(
          isSorted(result, tc.expectSorted),
          `result not sorted ${tc.expectSorted}: ${JSON.stringify(result)}`
        );
        assert(
          sameElements(result, tc.input),
          `result has different elements from input. input: ${JSON.stringify(
            tc.input
          )}, result: ${JSON.stringify(result)}`
        );
      } else {
        assert.deepStrictEqual(result, tc.expect, tc.name || "unnamed");
      }
      passed++;
      console.log(green(`  ✓ ${tc.name || "(unnamed)"}`));
    } catch (err) {
      const name = tc.name || "(unnamed)";
      const actual =
        err.actual !== undefined ? err.actual : err.stack || String(err);
      errors.push({ name, message: err.message, expected: tc.expect, actual });
      console.log(red(`  ✗ ${name}`));
      if (tc.expectSorted != null) {
        console.log(
          `    expectSorted: ${tc.expectSorted}, input: ${JSON.stringify(
            tc.input
          )}`
        );
        console.log(`    actual:       ${JSON.stringify(actual)}`);
      } else {
        console.log(`    expected: ${JSON.stringify(tc.expect)}`);
        console.log(`    actual:   ${JSON.stringify(actual)}`);
      }
    }
  }

  return {
    section: sectionName,
    passed,
    failed: errors.length,
    total: testCases.length,
    errors,
  };
}

async function main() {
  const sectionArg = process.argv[2];
  const sections = sectionArg ? [sectionArg] : getSections();

  if (sections.length === 0) {
    console.log("실행할 알고리즘 섹션이 없습니다.");
    process.exit(0);
  }

  let totalPassed = 0;
  let totalFailed = 0;

  for (const name of sections) {
    const result = await runSection(name);
    totalPassed += result.passed;
    totalFailed += result.failed;

    const status = result.failed === 0 ? green("PASS") : red("FAIL");
    console.log(
      `\n[${result.section}] ${status} ${result.passed}/${result.total}`
    );
  }

  console.log("\n---");
  if (totalFailed > 0) {
    console.log(red(`총 ${totalPassed} 통과, ${totalFailed} 실패`));
  } else {
    console.log(green(`총 ${totalPassed} 통과`));
  }
  process.exit(totalFailed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
