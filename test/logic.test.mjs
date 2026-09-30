// 실행: node test/logic.test.mjs — 2026-09-30 data09-06 으로 통합: index.html 이 안내 + 자동 이동 페이지인지 검사
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const TO = 'https://aebonlee.github.io/data09-06/';
let passed = 0;
function test(name, fn) { try { fn(); passed++; console.log('  ok  ' + name); } catch (e) { console.error('  FAIL ' + name + '\n       ' + e.message); process.exitCode = 1; } }
test('meta refresh 로 data09-06 에 자동 이동', () => assert.match(html, new RegExp(`<meta http-equiv="refresh" content="\\d+; url=${TO}"`)));
test('누를 수 있는 링크 · canonical 도 같은 주소', () => { assert.ok(html.includes(`<a class="go" href="${TO}">`)); assert.ok(html.includes(`<link rel="canonical" href="${TO}"`)); });
test('안내 문구 — 통합 사실과 날짜', () => { assert.match(html, /data09-06 으로 옮겼습니다/); assert.match(html, /2026-09-30/); });
test('바깥 스크립트 · 스타일 파일을 부르지 않음', () => assert.doesNotMatch(html, /<script|<link rel="stylesheet"/));
console.log(`\n${passed}개 통과` + (process.exitCode ? ' — 실패 있음' : ''));
