# interVentures (inter.vc) 프로젝트 정리

마지막 업데이트: 2026-07-15

## 0. 중요: 백엔드가 FastAPI → Next.js로 전환됨 (2026-07-15)

Hostinger 비즈니스 플랜 hPanel에서 **Python App 기능 자체를 지원하지 않는 것으로 확인**되어(Node.js App만 가능), 기존 FastAPI 백엔드를 폐기하고 그 역할을 Next.js 안으로 흡수했다. `/Users/tj/P/iv/backend` (FastAPI)는 더 이상 배포에 쓰이지 않는 레거시 코드 — 삭제 여부는 아직 미결정.

**새 아키텍처**: 프론트엔드 = 백엔드 = Next.js 앱 하나
- DB 접근: Node 22 내장 `node:sqlite` 모듈 사용 (네이티브 컴파일 불필요, 공유호스팅 CageFS 샌드박스에서도 안전)
- 공개 페이지(`page.tsx`)는 `lib/content.ts`를 통해 **DB를 직접 조회** (fetch/HTTP 왕복 없음)
- 문의폼 제출, 관리자 로그인/CRUD는 Next.js Route Handler(`app/api/**/route.ts`)로 구현, 기존 FastAPI 라우트와 동일한 경로/동작 유지
- 인증은 `jose` 라이브러리로 JWT 발급/검증 (기존 FastAPI의 Bearer 토큰 방식과 동일하게 유지)
- DB 파일: `frontend/data/interventures.db` (gitignore 처리, `node scripts/seed.mjs`로 초기 시딩)

이 교훈은 bs/mt5(둘 다 FastAPI)에도 그대로 적용됨 — 같은 서버에 올리려면 동일하게 Next.js API Route로 포팅하거나, Python이 되는 다른 곳에 백엔드를 둬야 함.

## 1. 스택 & 프로젝트 구조

- 프론트엔드 + 백엔드: Next.js (App Router, TypeScript, Tailwind CSS v4, `node:sqlite`) — `/Users/tj/P/iv/frontend`
- ~~백엔드: FastAPI + SQLite~~ — `/Users/tj/P/iv/backend` (2026-07-15부로 미사용, 위 0번 항목 참고)
- 레거시 자료: `/Users/tj/P/iv/iv_h` (2019년 Bootstrap Agency 템플릿 기반 구 홈페이지, 콘텐츠 이관 완료)

### 코드 구조 (Next.js)
- `src/lib/db.ts`: `node:sqlite` 연결 + 스키마 생성
- `src/lib/content.ts`: 공개 콘텐츠 조회 함수 (Server Component가 직접 호출, HTTP 없음) + 문의 관련 DB 함수
- `src/lib/auth.ts`: JWT 발급/검증(`jose`), 관리자 자격증명 확인
- `src/lib/adminCrud.ts`: 관리자 CRUD 라우트 핸들러 제너레이터 (테이블/필드만 넘기면 GET/POST/PUT/DELETE 생성)
- `src/app/api/contact/route.ts`, `src/app/api/auth/login/route.ts`, `src/app/api/admin/**/route.ts`: 실제 HTTP 엔드포인트
- `scripts/seed.mjs`: 초기 콘텐츠 시딩 스크립트 (`node scripts/seed.mjs`)
- 로컬 개발 포트: 4173 하나만 사용 (백엔드 프로세스 별도 실행 불필요)

## 2. 디자인 방향

- 브랜드 컬러: 로고 기준 딥 그린 `#234d20` + 화이트
- 로고 워드마크 폰트: Tahoma (볼드)
- 최종 채택 디자인 방향: **C안 — 다크그린 리듬 (Mercury/Ramp 스타일)**
  - 히어로 섹션과 (현재는 삭제된) 연락처 섹션을 `#234d20` 풀블리드 다크 섹션으로 처리해 화이트 섹션들과 리듬 부여
  - 보더박스 카드 대신 넘버링(01/02/03) + 얇은 구분선 위주의 에디토리얼 레이아웃
  - 포트폴리오는 모달 대신 클릭 시 인라인 확장되는 리스트형
  - 검토했으나 채택 안 한 안: A(에디토리얼 미니멀 — Stripe/Linear), B(VC 에디토리얼 — a16z/Bessemer)

## 3. 현재 페이지 구성 (2026-07-14 기준)

순서: 헤더 → 히어로 → 설립 목적(서비스 3종) → 서비스 상세(6종) → 대표 이력 → 푸터

- **파트너(팀), 연락처(문의폼), 클라이언트 로고 섹션은 사용자 요청으로 전부 삭제됨** (컴포넌트 파일 자체는 `src/components/Team.tsx`, `ContactForm.tsx`, `Clients.tsx`로 남아있고 `page.tsx`에서 렌더링만 제외한 상태 — 필요시 다시 추가 가능)
- 헤더 내비게이션도 "파트너", "연락처" 메뉴 제거됨 (현재: 목적/서비스/이력)
- 푸터에서 페이스북/링크드인 아이콘 삭제됨

### 확정된 콘텐츠 (반복 수정 반영 완료)

**우리의 Vision (3종, 원래 "설립 목적"에서 제목 변경)**
1. 경영전략기획 — 기업 성장전략 수립 및 지원
2. Virtual CFO — 경영기획, 자금관리, 투자유치 / 사업계획 수립 및 실행
3. Running Mate — 창업부터 상장까지 / 어느 단계이든 함께

**서비스 상세 (6종)**
1. 경영전략 컨설팅 — "초기 창업팀에 필수적이지만 구하기 어려운 CFO, CSO의 업무 - 경영계획, 예산 관리, 기업 내 자원 배분, 투자유치 계획 등 - 를 수행합니다."
2. 재무기획 컨설팅 — 기존 내용 유지
3. M&A 전략 컨설팅 — "SI · FI 투자유치, M&A, 유동화 채권 발행 등 상황에 맞는 전략을 제시하고 이를 통한 기업의 성장전략 수립을 지원합니다"
4. 강의, 5. IR, 6. 멘토링 — 기존 내용 유지

**대표 이력 (최신순으로 역순 배열됨)**
1. 인터벤처스 (2018 ~ 현재) — "다수의 정부지원센터와 협업하여 스타트업 지원 / 경영 전략 수립, 재무 모델링 도입 등 다수의 비상장사 성장 지원" + 하단에 활동 이력 불릿 리스트(`highlights` 필드): 빅뱅엔젤스 책임멘토, 포스코IMP 지도위원 역임, 한국특허정보원 보육기업 강사, 서울/울산/인천 창조경제혁신센터 컨설팅, 연세대 스타트업 분과 상임이사
2. 신한BNPParibas자산운용 (2012~2016)
3. 우리투자증권 (現 NH투자증권) (2008~2012)
4. 삼성전자 (2005~2007)

콘텐츠의 소스 오브 트루스는 이제 `frontend/scripts/seed.mjs` (기존 `backend/app/seed.py`는 더 이상 갱신 안 됨 — 참고용으로만 남아있음).

## 4. 배포 현황 (실제 진행된 내용, 2026-07-15 기준)

### 확인된 사실
- GitHub 저장소: `https://github.com/tjpark79/iv` (SSH remote, main 브랜치)
- **Hostinger hPanel Git 연동 자동배포가 이미 동작 중** — push하면 자동으로 pull + `npm install` + `next build` + 앱 재시작까지 됨 (별도 조치 불필요)
- **가비아 도메인 DNS가 이미 이 Hostinger 서버로 연결 완료** — `inter.vc` 실제 서비스 중
- Node.js 22 앱이 Passenger로 정상 구동 (`~/domains/inter.vc/nodejs`, `.htaccess`에 `PassengerAppType node` 등 설정)
- **hPanel에 Python App 기능이 없음** (Business 플랜 한계로 확인) → FastAPI 백엔드를 Next.js로 흡수하는 방식으로 전환 (위 0번 항목)
- 서버 SSH 접속 정보: `ssh -p 65002 u828282719@217.21.91.124` (hPanel → Advanced → SSH Access에서 확인/재발급 가능)

### 남은 배포 작업
- [ ] 이번 마이그레이션(FastAPI 제거, node:sqlite로 전환) 커밋 후 push → 자동배포 확인
- [ ] Hostinger 서버의 `.htaccess`에 프로덕션용 환경변수(`JWT_SECRET`, `ACCESS_TOKEN_EXPIRE_MINUTES`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`) `SetEnv`로 등록
- [ ] 서버에서 `node scripts/seed.mjs` 실행해 프로덕션 DB 시딩
- [ ] `https://inter.vc` 정상 응답(200) 확인

### 멀티 프로젝트 서브패스 호스팅 계획 (재검토 필요)

- `inter.vc` (루트) — interVentures 메인 사이트
- `inter.vc/bs` — bs 프로젝트 (재무 분석 플랫폼)
- `inter.vc/autotrade` — mt5 프로젝트 (자동매매 시스템)
- **Python App이 안 되는 게 확인됐으므로, bs/mt5도 올리려면 두 프로젝트 다 Next.js API Route로 백엔드를 포팅해야 함** (이 프로젝트에서 한 것과 동일한 패턴) — 아직 미착수, 별도 논의 필요
- 서브패스 배포 시 필요한 것(여전히 유효):
  - 프레임워크의 base path 설정 (Next.js는 `basePath`)
  - 정적 자산 경로가 서브패스를 따라가도록 설정
  - Google OAuth 리다이렉트 URI를 서브패스 URL로 재등록
  - 쿠키 domain/path 설정 (도메인 전체 공유 여부 결정)
  - hPanel Node.js App 생성 시 "Application URL"을 서브디렉토리로 지정

## 5. bs / mt5 프로젝트 현황 및 정리 작업

### Git 정리 (완료)

| 항목 | bs | mt5 |
|---|---|---|
| 위치 | `/Users/tj/P/bs` | `/Users/tj/P/mt5` |
| git 상태 | clean (GitHub `tjpark79/bs` 원격 연결, 2커밋 푸시 대기) | clean (신규 `git init` 완료, 원격 없음) |
| 특이사항 | — | 원래 `frontend/`에 별도 중첩 `.git` 저장소가 있었음 → 스캐폴딩 커밋 1개뿐이라 제거하고 루트에 통합 저장소로 재구성 |
| .gitignore | venv/, .env, ledger.db, uploads/, 샘플 재무제표 등 제외 확인 | venv/, .env, trading.db(79MB), node_modules/, __pycache__ 등 제외 확인 |

### 프레임워크

- 둘 다 Next.js(프론트) + FastAPI(백엔드, 추정) 동일 스택
- bs, mt5, iv 모두 같은 조합이라 향후 서브패스 통합 배포에 유리

### 구글 로그인 구현 방식 비교

| | bs | mt5 |
|---|---|---|
| 로그인 방식 | Google Identity Services(GIS) 클라이언트 버튼 → ID 토큰 서명 검증 | 서버사이드 Authorization Code 리다이렉트 |
| 필요 환경변수 | `GOOGLE_CLIENT_ID`만 | `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` + `GOOGLE_REDIRECT_URI` |
| 세션 방식 | DB 저장 불투명 토큰(`auth_sessions`) — 즉시 강제 로그아웃 가능 | 무상태 JWT — 만료 전 강제 차단 불가 |
| 권한 모델 | `tiers` 테이블 + `admin_permissions` 세분화 | `role` + `tier`(정수 1~5) 단순 모델 |
| 절대자(superadmin) 동기화 | 로그인마다 양방향(등록/해제) 자동 동기화 | 승격만 자동, 강등은 수동 |
| DB 접근 방식 | 원본 sqlite3 (dict row) | SQLAlchemy ORM |
| 개발 편의 | 없음 | `dev-login` 우회 엔드포인트 (구글 앱 검수 전 로컬 테스트용) |

### 인증 통합 방향 결론

**mt5의 인증 방식을 bs 스타일(GIS 클라이언트 + DB 세션)로 전환하는 것을 추천.**

이유:
1. 서브패스 다중 호스팅과 궁합이 좋음 — GIS는 redirect_uri 등록이 필요 없어 `inter.vc/bs`, `inter.vc/autotrade`처럼 경로가 여러 개여도 도메인만 맞으면 됨. mt5 방식(정확한 redirect_uri 매칭 필요)은 서브패스마다 구글 콘솔 등록이 번거로움
2. 즉시 강제 로그아웃/차단 가능 — 개인정보보호법이 요구하는 "즉시 파기/접근차단" 대응에 유리
3. 장기적으로 bs/mt5(+ interVentures)가 공용 인증 서비스(SSO)로 통합될 때, DB 세션 기반 구조가 여러 앱을 상대하는 중앙 서비스로 확장하기 더 자연스러움

반대 방향(bs → mt5 스타일)은 서브패스 배포와 궁합이 나쁘고, 즉시 차단 기능을 잃는(개인정보보호법 대응 후퇴) 리스크가 있어 비추천.

### mt5 DB 스타일 전환(SQLAlchemy → bs의 raw sqlite3) 영향도 분석

- SQLAlchemy는 mt5 백엔드 19개 파일(트레이딩 엔진 전체)에 쓰이지만, **`User`(회원) 테이블을 실제로 다루는 파일은 5개뿐**: `database.py`, `models/models.py`, `auth/dependencies.py`, `routers/auth.py`, `routers/admin.py`
- 나머지 라우터(`paper_trading.py`, `backtest.py`, `reports.py`, `ktr.py`, `market.py`)는 `require_tier(...)`/`require_role(...)`를 권한 게이트로만 쓰고 반환값을 `_user`/`_admin`으로 버림 → **트레이딩 로직은 이 전환에 영향받지 않음** (당초 우려보다 안전한 범위)

**주요 리스크 / 예상 오류**
1. 반환 타입이 SQLAlchemy 객체(`user.email`)에서 dict/`sqlite3.Row`(`user["email"]`)로 바뀌므로 `routers/auth.py`, `routers/admin.py`의 속성접근 코드 전부 수정 필요 — 안 하면 `AttributeError`
2. **tier 체계 차이가 최대 난관**: mt5는 정수(1~5) 등급 비교(`require_tier(3)`)가 여러 라우터에 박혀 있음. bs는 문자열 `tier_code` + `tiers` 테이블 방식이라, 그대로 옮기면 숫자 비교 로직이 다 깨짐 → 문자열 등급에 순서를 매핑하는 로직 재작성 필요
3. raw sqlite3는 커넥션을 직접 관리해야 해서, 잘못 다루면 `database is locked` 오류 위험 (SQLAlchemy의 `Depends(get_db)` 자동관리와 다름)
4. `database.py`의 `create_tables()`가 SQLAlchemy `Base.metadata`로 User 테이블도 함께 생성 중 — User를 raw sqlite3로 분리하면 이 등록 로직도 따로 떼어내야 함
5. 기존 가입자 데이터가 있다면 새 스키마(`auth_sessions`, `tiers`)로 마이그레이션 필요 — `trading.db`(79MB, 운영 데이터 있음) 백업 후 작업 필수
6. 세션 방식이 JWT→DB 토큰으로 바뀌므로 배포 시점에 기존 로그인 사용자 전원 재로그인 필요 (사전 공지 권장)

## 6. 다음 단계

- [x] GitHub 저장소 생성/푸시 (`tjpark79/iv`)
- [x] FastAPI → Next.js(node:sqlite) 백엔드 마이그레이션
- [ ] Hostinger 프로덕션 환경변수 설정 + 배포 확인 (섹션 4 참고)
- [ ] bs 미커밋 변경사항 정리 상태 확인 후 인증 통합 작업 착수 지시 대기 중
- [ ] mt5 인증을 bs 스타일로 전환 (tier 체계 재설계 + 데이터 마이그레이션 포함) — **코드 작업 미시작, 사용자 지시 대기**
- [ ] bs/mt5도 Python App 미지원 이슈에 걸림 — Next.js API Route 포팅 여부 논의 필요
- [ ] interVentures 관리자 UI (로그인 화면 + 콘텐츠 CRUD 화면 + 문의함) — API는 준비됐으나 화면 미구현
- [ ] mt5 GitHub 원격 저장소 연결 여부 결정 필요
- [ ] `/Users/tj/P/iv/backend` (구 FastAPI 코드) 삭제 여부 결정 필요
