@AGENTS.md

## 🚫 사이트에 다시 올리지 않는 것

**Our Partners(파트너 명단)와 「함께한 기업」(클라이언트 로고) 섹션을 다시 만들지 않습니다.**

2026-08-13에 대표 지시로 완전히 삭제했습니다 (커밋 `55e717d`). 코드·데이터·이미지가 모두 제거된 상태입니다.

* 삭제된 것: `Team.tsx`, `Clients.tsx`, `content.ts`의 `TEAM_MEMBERS`·`CLIENTS`,
  `TeamMember`·`Client` 타입, `getTeam`·`getClients`, `public/team/`, `public/logos/`
* git 이력에 남아 있어도 **복구하지 않습니다.**
* 페이지 분량을 늘려야 하는 상황에서도 이 섹션의 부활을 제안하지 않습니다.
  회사 소개·일하는 방식·인사이트 글로 채웁니다.
* 이유: 외부 파트너와 고객사의 실명·소속·사진·로고를 동의 없이 노출하는 상태였습니다.
  섹션만 빼면 `public/` 파일이 URL로 직접 접근되므로 이미지까지 지웠습니다.
* 푸터·`/contact`·`/privacy`의 「박태준」(대표자, 개인정보 보호책임자)은 별개이며
  법정 기재사항이므로 유지합니다.

## 콘텐츠 추가 방법

* **인사이트 글**: `content/insights/*.md` 에 파일 하나를 추가하면 목록·sitemap·홈
  최신글에 자동 반영됩니다. 프론트매터(`title`, `description`, `date`, `series`)가
  빠지면 빌드가 실패합니다. `series`는 `equity` / `finance` / `fundraising` /
  `operations` 중 하나입니다.
* **서비스·이력 문구**: `src/lib/content.ts`
* **모음집(투자 도구) 목록**: `src/lib/collection.ts` (P/world의 `categories.ts`와 같은 규약).
  페이지는 `/collection`이며 `/investment`는 308로 넘어옵니다.
* **사업자 정보·도메인**: `src/lib/site.ts`

## 배포

`git push` 하면 Hostinger가 자동으로 pull → `npm install` → `next build` → 재시작까지
합니다. **반영까지 60~150초** 걸리므로, 그 사이에 확인하면 옛 화면이 보입니다.
성급히 배포 실패로 판단하지 마세요.
