# interVentures (inter.vc) 프로젝트 정리

마지막 업데이트: 2026-10-16

> 이 저장소는 **PUBLIC**이다. 서버 접속 정보, 다른 프로젝트(bs·mt5)의 인증·DB 설계 같은
> 내부 메모는 리포 루트의 `PRIVATE_NOTES.md`(`.gitignore`로 제외)에 둔다.
> 자격증명은 `PRODUCTION_CREDENTIALS.md`(역시 제외)에 둔다.

## 0. 다시 올리지 않는 것

**Our Partners(파트너 명단)와 「함께한 기업」(클라이언트 로고) 섹션은 사이트에 다시 만들지 않는다.**

- 2026-08-13 대표 지시로 코드·데이터·이미지를 삭제했고, 2026-08-29에 git 이력에서도
  제거했다(`git filter-repo` 후 리포 삭제·재생성). 같은 명단이 있던 `backend/`도 함께 지웠다.
- 이미지까지 지운 이유: 섹션만 빼면 `public/` 파일이 URL로 직접 열린다.
- 로컬 백업은 `P/iv-backups/20260829/`. **어떤 경로로도 복구하지 않는다.**
- 푸터·`/contact`·`/privacy`의 「박태준」(대표자, 개인정보 보호책임자)은 법정 기재사항이라 유지한다.

## 1. 아키텍처

- **Next.js(App Router) 정적 사이트. DB·백엔드·API 라우트 없음.** — `frontend/`
- 2026-07-15에 DB를 걷어냈다. Hostinger가 배포마다 앱 폴더를 재생성해 SQLite 파일이
  초기화됐고, 관리자 화면도 없어 실시간 편집을 아무도 쓰지 않았기 때문이다.
- 모든 페이지가 빌드 때 만들어진다. 인사이트 글은 `generateStaticParams`로 미리 만들고,
  목록에 없는 slug는 렌더하지 않고 404를 낸다(`dynamicParams = false`).

### 콘텐츠 위치

| 무엇 | 파일 |
|---|---|
| 서비스·대표 이력·소개 문구 | `frontend/src/lib/content.ts` |
| 인사이트 글 | `frontend/content/insights/*.md` (파일명 = slug, 소문자·숫자·하이픈) |
| 모음집(투자 도구) 목록 | `frontend/src/lib/collection.ts` |
| 사업자 정보·도메인·시행일 | `frontend/src/lib/site.ts` |
| 보안 헤더 | `frontend/next.config.ts` |

자세한 추가 방법은 `frontend/CLAUDE.md`.

### 페이지

`/` · `/about` · `/services` · `/collection` · `/insights` · `/insights/[slug]` ·
`/contact` · `/privacy` · `/terms` (`/investment`는 `/collection`으로 308)

## 2. 디자인

- 브랜드 컬러 `#234d20`(P/CLAUDE.md 공통 규칙). **헤더·푸터 바탕은 브랜드 초록으로 고정.**
- 로고 워드마크: Tahoma 볼드
- 방향: 다크그린 풀블리드 섹션과 흰 섹션의 리듬, 넘버링(01/02/03)과 얇은 구분선 위주의
  에디토리얼 레이아웃

## 3. 배포

- GitHub `tjpark79/iv`(PUBLIC, main) → **Hostinger** 자동배포: push하면 pull →
  `npm install` → `next build` → 재시작. 반영까지 60~150초.
- Node.js 앱이 Passenger로 구동, 응답 서버는 LiteSpeed. 도메인은 가비아에서 Hostinger로 연결.
- 2026-08-29 이력 재작성 직후 서버의 `git pull`이 실패해 배포가 한동안 멈췄다
  (공통 조상 없음). 2026-10-16에 라이브 반영을 확인했다.
- 이미지 최적화는 꺼 두었다(`images.unoptimized`). Hostinger 공유호스팅에서 sharp가
  실패해 503이 났다.

### 남은 서버 작업 (확인 필요)

- [ ] 서버 `.htaccess`의 `JWT_SECRET`·`ADMIN_USERNAME`·`ADMIN_PASSWORD`·
      `ACCESS_TOKEN_EXPIRE_MINUTES` SetEnv 줄 제거 (백엔드가 없어 쓰지 않음)
- [ ] 서버 잔여 파일 `nodejs/data/`, `nodejs/seed.mjs` 삭제 — **`seed.mjs`에는 삭제한
      팀원 실명·고객사 명단이 들어 있다.** 웹 경로로는 404지만 서버에서 지운다.
- [ ] SSH가 키 인증 전용인지 확인

## 4. 레지스트리

`project.yml`과 `.github/workflows/report-to-registry.yml`이 push마다 `tjpark79/registry`에
배포 정보를 보고한다. 값·키는 넣지 않고 환경 변수 이름만 적는다.
