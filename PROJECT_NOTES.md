# interVentures (inter.vc) 프로젝트 정리

마지막 업데이트: 2026-07-14

## 1. 스택 & 프로젝트 구조

- 프론트엔드: Next.js (App Router, TypeScript, Tailwind CSS v4) — `/Users/tj/P/iv/frontend`
- 백엔드: FastAPI + SQLite — `/Users/tj/P/iv/backend`
- 레거시 자료: `/Users/tj/P/iv/iv_h` (2019년 Bootstrap Agency 템플릿 기반 구 홈페이지, 콘텐츠 이관 완료)

### 백엔드 구조
- `app/models.py`: `Service`, `PortfolioItem`, `TimelineEntry`, `TeamMember`, `Client`, `ContactSubmission`
- `app/routers/public.py`: 공개 GET 엔드포인트
- `app/routers/contact.py`: 문의 제출
- `app/routers/auth.py`: 관리자 로그인 (JWT, 환경변수 기반 단일 관리자 계정)
- `app/routers/admin.py`: 콘텐츠 CRUD (인증 필요), 문의함 관리
- `app/seed.py`: 초기 콘텐츠 시딩 스크립트 (DB 재생성 시 사용)
- 로컬 개발 포트: 프론트 4173, 백엔드 8123 (원래 3000/8000에서 변경함)

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

**설립 목적 (3종)**
1. Virtual CFO — 경영기획, 자금관리, 투자유치 / 사업계획 수립 및 실행
2. Running Mate — 창업부터 상장까지 / 어느 단계이든 함께
3. 경영전략기획 — 기업 성장전략 수립 및 지원

**서비스 상세 (6종)**
1. 경영전략 컨설팅 — "초기 창업팀에 필수적이지만 구하기 어려운 CFO, CSO의 업무 - 경영계획, 예산 관리, 기업 내 자원 배분, 투자유치 계획 등 - 를 수행합니다."
2. 재무기획 컨설팅 — 기존 내용 유지
3. M&A 전략 컨설팅 — "비상장 투자유치, M&A, 구조화채권 발행 등을 통한 기업 성장전략 수립을 지원합니다"
4. 강의, 5. IR, 6. 멘토링 — 기존 내용 유지

**대표 이력 (최신순으로 역순 배열됨)**
1. 인터벤처스 (2018 ~ 현재) — "다수의 정부지원센터와 협업하여 스타트업 지원 / 경영 전략 수립, 재무 모델링 도입 등 다수의 비상장사 성장 지원"
2. 신한BNPParibas자산운용 (2012~2016)
3. 우리투자증권 (現 NH투자증권) (2008~2012)
4. 삼성전자 (2005~2007)

모든 콘텐츠 변경은 실행 중인 DB(admin API로 직접 PUT)와 `backend/app/seed.py` 양쪽에 동기화 완료.

## 4. 배포 계획

- **GitHub**에 코드 푸시
- **Hostinger 비즈니스 플랜** (Node.js 구동 가능 확인됨, hPanel에서 "Setup Node.js App" / "Setup Python App" 기능으로 서브디렉토리 단위 앱 바인딩 가능할 것으로 예상)
- 도메인은 **가비아**에서 관리 중인 `inter.vc` → Hostinger 서버로 네임서버/DNS 연결
- 만약 Node.js 구동이 안 되면 PHP로 재작성 검토 (지금 결정할 사안 아님, 실제 부딪혔을 때 판단)

### 멀티 프로젝트 서브패스 호스팅 계획

- `inter.vc` (루트) — interVentures 메인 사이트
- `inter.vc/bs` — bs 프로젝트 (재무 분석 플랫폼)
- `inter.vc/autotrade` — mt5 프로젝트 (자동매매 시스템)
- 방식: Hostinger hPanel의 Node.js/Python App 생성 시 "Application URL"을 서브디렉토리로 지정 (Passenger가 라우팅) — 별도 리버스 프록시 구성 불필요할 것으로 예상 (비즈니스 플랜 한정, 실제 hPanel에서 확인 필요)
- 각 프로젝트가 서브패스 배포를 위해 필요한 것:
  - 프레임워크의 base path 설정 (Next.js는 `basePath`)
  - 정적 자산 경로가 서브패스를 따라가도록 설정
  - Google OAuth 리다이렉트 URI를 서브패스 URL로 재등록
  - 쿠키 domain/path 설정 (도메인 전체 공유 여부 결정)
  - Passenger가 요구하는 앱 엔트리포인트 구조 준수
  - 앱별 환경변수 hPanel에 개별 등록
  - SQLite 등 파일 기반 DB의 쓰기 권한 범위 확인

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

## 6. 다음 단계 (미착수)

- [ ] bs 미커밋 변경사항 정리 상태 확인 후 인증 통합 작업 착수 지시 대기 중
- [ ] mt5 인증을 bs 스타일로 전환 (tier 체계 재설계 + 데이터 마이그레이션 포함) — **코드 작업 미시작, 사용자 지시 대기**
- [ ] interVentures 관리자 UI (로그인 화면 + 콘텐츠 CRUD 화면 + 문의함) — API는 준비됐으나 화면 미구현
- [ ] GitHub 저장소 생성/푸시, Hostinger 배포 — 미착수
- [ ] mt5 GitHub 원격 저장소 연결 여부 결정 필요
