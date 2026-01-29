/**
 * 알고리즘 섹션별 테스트 러너
 * 사용: node scripts/test.js [섹션명]
 *   섹션명 생략 시 모든 섹션 테스트
 *   예: node scripts/test.js heap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const algorithmsDir = path.join(rootDir, 'algorithms');

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

function getSections() {
  if (!fs.existsSync(algorithmsDir)) return [];
  return fs.readdirSync(algorithmsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
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

  for (const tc of testCases) {
    try {
      const result = tc.run(implModule);
      assert.deepStrictEqual(result, tc.expect, tc.name || 'unnamed');
      passed++;
      console.log(green(`  ✓ ${tc.name || '(unnamed)'}`));
    } catch (err) {
      const name = tc.name || '(unnamed)';
      const actual = err.actual !== undefined ? err.actual : (err.stack || String(err));
      errors.push({ name, message: err.message, expected: tc.expect, actual });
      console.log(red(`  ✗ ${name}`));
      console.log(`    expected: ${JSON.stringify(tc.expect)}`);
      console.log(`    actual:   ${JSON.stringify(actual)}`);
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
  const sections = sectionArg
    ? [sectionArg]
    : getSections();

  if (sections.length === 0) {
    console.log('실행할 알고리즘 섹션이 없습니다.');
    process.exit(0);
  }

  let totalPassed = 0;
  let totalFailed = 0;

  for (const name of sections) {
    const result = await runSection(name);
    totalPassed += result.passed;
    totalFailed += result.failed;

    const status = result.failed === 0 ? green('PASS') : red('FAIL');
    console.log(`\n[${result.section}] ${status} ${result.passed}/${result.total}`);

  }

  console.log('\n---');
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
