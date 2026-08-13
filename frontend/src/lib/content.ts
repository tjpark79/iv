// 콘텐츠를 DB 대신 코드에 직접 고정한다 (정적 사이트).
// 문구를 바꿀 때는 이 파일을 수정하고 다시 배포한다.

export type Service = {
  id: number;
  order: number;
  icon: string;
  title: string;
  description: string;
};

export type PortfolioItem = {
  id: number;
  order: number;
  /** /services 안의 앵커. 홈에서 개별 항목으로 링크할 때 쓴다. */
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** description 다음에 이어지는 상세 본문. /services에서만 노출한다. */
  detail: string;
  /** 실제 진행 순서나 구성 요소. /services에서 목록으로 노출한다. */
  steps: string[];
  category: string;
  duration: string;
  thumbnail_url: string;
  full_image_url: string;
};

export type TimelineEntry = {
  id: number;
  order: number;
  period: string;
  organization: string;
  description: string;
  highlights: string;
  image_url: string;
};

export type TeamMember = {
  id: number;
  order: number;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
};

export type Client = {
  id: number;
  order: number;
  name: string;
  logo_url: string;
  link_url: string;
};

const SERVICES: Service[] = [
  {
    id: 1,
    order: 1,
    icon: "compass",
    title: "경영전략기획",
    description: "기업 성장전략 수립 및 지원",
  },
  {
    id: 2,
    order: 2,
    icon: "briefcase",
    title: "Virtual CFO",
    description: "경영기획, 자금관리, 투자유치\n사업계획 수립 및 실행",
  },
  {
    id: 3,
    order: 3,
    icon: "trending-up",
    title: "Running Mate",
    description: "창업부터 상장까지\n어느 단계이든 함께",
  },
];

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    order: 1,
    slug: "management-strategy",
    title: "경영전략 컨설팅",
    summary: "사업계획 수립과 자원 배분",
    description:
      "초기 창업팀에 필수적이지만 구하기 어려운 CFO, CSO의 업무 - 경영계획, 예산 관리, 기업 내 자원 배분, 투자유치 계획 등 - 를 수행합니다.",
    detail:
      "초기 기업이 CFO나 CSO를 정규직으로 채용하기는 쉽지 않습니다. 사람을 구하기도 어렵지만, 그만한 인건비를 감당할 단계가 아닌 경우가 대부분입니다. 인터벤처스는 외부 파트너로서 그 역할을 맡아 연간 경영계획과 예산을 함께 세우고, 부문별로 돈과 사람을 어디에 먼저 배분할지 정리합니다. 계획을 세우는 것으로 끝내지 않고 정기적으로 실적과 계획의 차이를 짚어, 다음 분기의 우선순위를 다시 조정합니다.",
    steps: [
      "현황 진단 — 재무 상태, 조직 구성, 자금 소진 속도 점검",
      "연간 경영계획 및 예산 수립",
      "부문별 자원 배분 기준 정리",
      "정기 점검 — 계획 대비 실적 차이 분석과 우선순위 재조정",
    ],
    category: "Finance, Strategy, Consulting",
    duration: "업무협약 기간 내 지속",
    thumbnail_url: "/portfolio/01-thumbnail.jpg",
    full_image_url: "/portfolio/01-full.jpg",
  },
  {
    id: 2,
    order: 2,
    slug: "financial-planning",
    title: "재무기획 컨설팅",
    summary: "재무관련 토탈솔루션",
    description:
      "투자자와의 미팅에 필요한 1) 다년간의 재무예측(Financial Projection)과, 2) 증권사의 Global Standard Valuation 기법을 기반으로 한 기업가치 산출 등을 제공합니다.",
    detail:
      "투자자는 추정치의 크기보다 그 숫자가 만들어진 논리를 봅니다. 매출을 고객 수와 단가, 전환율 같은 동인으로 분해해 다년간 재무예측을 만들고, 증권사에서 실제로 쓰는 방식으로 기업가치를 산출합니다. 가정을 바꾸면 결과가 어떻게 달라지는지도 함께 정리하기 때문에, 투자 심사 과정에서 나오는 질문에 근거를 갖고 답할 수 있습니다.",
    steps: [
      "매출 동인 분해와 가정 설정",
      "3~5개년 추정 재무제표 작성",
      "DCF 및 유사기업 비교 방식 기업가치 산출",
      "가정 변경에 따른 민감도 분석",
    ],
    category: "Finance, Consulting",
    duration: "평균 2개월 이내",
    thumbnail_url: "/portfolio/02-thumbnail.jpg",
    full_image_url: "/portfolio/02-full.jpg",
  },
  {
    id: 3,
    order: 3,
    slug: "ma-strategy",
    title: "M&A 전략 컨설팅",
    summary: "기업 성장전략 수립",
    description:
      "SI · FI 투자유치, M&A, 유동화 채권 발행 등 상황에 맞는 전략을 제시하고 이를 통한 기업의 성장전략 수립을 지원합니다",
    detail:
      "자금이 필요한 모든 상황의 답이 투자유치는 아닙니다. 전략적 투자자(SI)와 재무적 투자자(FI)는 기대하는 바가 다르고, 경우에 따라서는 M&A나 유동화 채권 발행이 더 나은 선택이 됩니다. 현재 단계와 주주 구성, 회수 시점을 함께 놓고 어떤 방법이 맞는지부터 가려낸 뒤, 지분 희석과 경영권에 미치는 영향까지 따져 성장전략을 세웁니다.",
    steps: [
      "조달 방식별 장단점 비교 (SI · FI · M&A · 채권)",
      "지분구조 및 희석 시뮬레이션",
      "잠재 파트너 후보 정리",
      "협상 단계 자문",
    ],
    category: "Strategy, Consulting",
    duration: "업무협약 기간 내 지속",
    thumbnail_url: "/portfolio/03-thumbnail.jpg",
    full_image_url: "/portfolio/03-full.jpg",
  },
  {
    id: 4,
    order: 4,
    slug: "lecture",
    title: "강의",
    summary: "창업팀이 반드시 알아야 할 노하우",
    description:
      "창업팀이 반드시 알아야 할 노하우를 1) 지분관리 편, 2) 자료작성 편, 3) Global Standard(재무전망) 편 등으로 세분화한 강의를 진행합니다.",
    detail:
      "정부지원센터와 대학 창업 프로그램에서 진행해 온 내용을 주제별로 나눠 강의합니다. 지분관리 편은 창업 초기의 지분 배분과 스톡옵션 설계처럼 되돌리기 어려운 결정을 다룹니다. 자료작성 편은 투자자가 실제로 읽는 순서에 맞춰 자료를 구성하는 방법과 자주 반복되는 실수를 짚습니다. Global Standard 편은 재무전망을 만드는 절차 자체를 다뤄, 강의 후에 직접 만들 수 있도록 합니다.",
    steps: [
      "지분관리 편 — 지분 배분, 스톡옵션, 주주간 계약",
      "자료작성 편 — IR 자료 구성과 흔한 실수",
      "Global Standard 편 — 재무전망 작성 실습",
      "대상과 시간에 맞춘 구성 조정",
    ],
    category: "Lecture",
    duration: "1회 시간별 맞춤 가능",
    thumbnail_url: "/portfolio/04-thumbnail.jpg",
    full_image_url: "/portfolio/04-full.jpg",
  },
  {
    id: 5,
    order: 5,
    slug: "ir-report",
    title: "IR",
    summary: "IR 리포트 작성",
    description:
      "글로벌 증권사에서 사용하는 양식을 기반으로 한 IR 리포트 혹은 기업백서를 작성해 드립니다.",
    detail:
      "증권사 리서치센터가 기업을 분석할 때 쓰는 리포트 형식을 그대로 가져와, 사업 구조와 시장, 경쟁 구도, 재무 추정, 기업가치를 하나의 문서로 정리합니다. 회사를 처음 보는 사람이 순서대로 읽어 내려가며 이해할 수 있게 쓰는 것이 목적입니다. 분량과 깊이에 따라 IR 리포트와 기업백서 중에서 고를 수 있습니다.",
    steps: [
      "자료 수집 및 경영진 인터뷰",
      "산업 구조와 경쟁 구도 분석",
      "재무 추정 및 기업가치 산출",
      "리포트 또는 백서 형태로 작성",
    ],
    category: "Reporting",
    duration: "IR 리포트 1달 내외 / 백서 2달 내외",
    thumbnail_url: "/portfolio/05-thumbnail.jpg",
    full_image_url: "/portfolio/05-full.jpg",
  },
  {
    id: 6,
    order: 6,
    slug: "mentoring",
    title: "멘토링",
    summary: "투자유치에 임하는 기본자세",
    description:
      "투자유치에 필요한 발표자료 수정, 발표스킬 개선, BM 피봇팅 등의 멘토링 진행",
    detail:
      "심사역 앞에서 같은 자료로 발표해도 반응이 갈리는 이유는 대체로 자료가 아니라 순서와 강조점에 있습니다. 발표자료를 함께 고치고, 예상 질문을 미리 받아보는 방식으로 발표를 다듬습니다. 사업 모델 자체를 다시 봐야 하는 경우에는 피봇팅 방향까지 함께 검토합니다.",
    steps: [
      "발표자료 구성과 메시지 점검",
      "예상 질의응답 연습",
      "발표 전달력 개선",
      "필요 시 사업 모델 피봇팅 검토",
    ],
    category: "Mentoring",
    duration: "유동적",
    thumbnail_url: "/portfolio/06-thumbnail.jpg",
    full_image_url: "/portfolio/06-full.jpg",
  },
];

/** 홈 히어로 아래 한 줄. 사이트에 들어온 사람이 회사를 한 문장으로 알게 한다. */
export const HOME_HERO_LEAD =
  "초기 기업의 CFO와 CSO 역할을 외부에서 맡습니다. 경영계획과 재무추정, 기업가치 산출, 투자유치까지 숫자가 필요한 자리에 함께합니다.";

/**
 * 홈의 회사 소개 요약. /about의 본문과 겹치지 않도록 다른 문장으로 쓴다.
 * 같은 문단을 두 페이지에 두면 중복 콘텐츠가 된다.
 */
export const HOME_ABOUT_SUMMARY =
  "2018년부터 정부지원센터와 협업해 스타트업을 지원하고, 비상장 기업의 경영 전략과 재무 모델링을 함께해 왔습니다. 여의도 증권사 리서치센터와 자산운용사에서 기업을 분석하던 경험을 창업 기업 쪽에서 쓰고 있습니다.";

/** /about 페이지 상단 리드 문단. */
export const ABOUT_INTRO = [
  "인터벤처스는 2018년부터 초기 기업의 경영과 재무를 옆에서 맡아 온 회사입니다. 정부지원센터와 협업해 스타트업을 지원하고, 비상장 기업의 경영 전략 수립과 재무 모델링 도입을 함께해 왔습니다.",
  "창업팀에게 가장 부족한 자리는 대개 CFO와 CSO입니다. 제품을 만들 사람은 어떻게든 구하지만, 숫자로 회사를 설명하고 자본을 설계할 사람은 초기에 채용하기가 어렵습니다. 그 공백을 외부에서 메우는 것이 인터벤처스가 하는 일입니다.",
  "여의도 증권사 리서치센터와 자산운용사에서 기업을 분석하고 투자해 온 경험을, 이제 막 시장에 나선 기업 쪽에서 쓰고 있습니다. 투자자가 무엇을 근거로 판단하는지 아는 상태에서 자료를 만들면 같은 사업도 다르게 전달됩니다.",
];

/** /about 페이지의 '일하는 방식' 섹션. */
export const WORKING_PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "숫자는 만든 사람이 설명할 수 있어야 합니다",
    body: "대신 만들어 드린 재무추정이라도 투자자 앞에서 답하는 사람은 대표님입니다. 그래서 결과 파일만 넘기지 않고 어떤 가정에서 그 숫자가 나왔는지, 가정이 바뀌면 어디가 움직이는지를 함께 정리합니다.",
  },
  {
    title: "되돌리기 어려운 것부터 봅니다",
    body: "제품과 사업 모델은 언제든 바꿀 수 있지만 지분 배분과 자본구조는 한 번 정하면 상대의 동의 없이 되돌릴 수 없습니다. 그래서 급해 보이는 일보다 나중에 비용이 큰 결정을 먼저 점검합니다.",
  },
  {
    title: "단계에 맞지 않는 것은 권하지 않습니다",
    body: "대기업에서 쓰는 관리 체계를 5인 회사에 그대로 옮기면 일만 늘어납니다. 지금 단계에서 실제로 효과가 있는 범위까지만 도입하고, 회사가 커지는 속도에 맞춰 넓혀 갑니다.",
  },
  {
    title: "결정은 대표가 합니다",
    body: "외부 파트너가 회사의 판단을 대신할 수는 없습니다. 저희 역할은 선택지와 각각의 대가를 분명히 드러내는 것까지이고, 그 위에서 결정하실 수 있도록 근거를 남깁니다.",
  },
];

/** /services 페이지 상단 리드 문단. */
export const SERVICES_INTRO = [
  "인터벤처스는 증권사 리서치센터와 자산운용사에서 기업을 분석하고 투자해 온 방식을, 이제 막 시장에 나선 기업의 상황에 맞게 옮겨 적용합니다. 투자자가 무엇을 근거로 판단하는지를 아는 쪽에서 자료를 만들면, 같은 사업이라도 설명이 달라집니다.",
  "아래 여섯 가지가 저희가 맡아 온 일입니다. 한 가지만 단발성으로 진행하기도 하고, 경영전략과 재무기획처럼 묶어서 업무협약 기간 동안 계속 함께 가기도 합니다. 어느 쪽이 맞을지는 기업의 단계와 지금 풀어야 할 문제에 따라 다르므로, 먼저 현황을 듣고 범위를 정합니다.",
];

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 1,
    order: 1,
    period: "2018 ~ 현재",
    organization: "인터벤처스",
    description:
      "다수의 정부지원센터와 협업하여 스타트업 지원\n경영 전략 수립, 재무 모델링 도입 등 다수의 비상장사 성장 지원",
    highlights:
      "빅뱅엔젤스 책임멘토\n포스코IMP 지도위원 역임\n한국특허정보원 보육기업 강사\n서울창조경제혁신센터 민간 투자유치 연계지원사업 컨설팅\n울산창조경제혁신센터 U-STAR 글로벌 프로그램 컨설팅, 보육기업 강의\n인천창조경제혁신센터 글로벌 엑셀러레이팅 베트남 진출 컨설팅 및 IR리포트 제작\n연세대학교 제30대, 31대 스타트업/창업 분과 상임이사",
    image_url: "/about/4.jpg",
  },
  {
    id: 2,
    order: 2,
    period: "2012 ~ 2016",
    organization: "신한BNPParibas자산운용",
    description: "Equity Fund Manager\nEquity Analyst",
    highlights: "",
    image_url: "/about/3.jpg",
  },
  {
    id: 3,
    order: 3,
    period: "2008 ~ 2012",
    organization: "우리투자증권 (現 NH투자증권)",
    description: "Research Center\nIT Analyst",
    highlights: "",
    image_url: "/about/2.jpg",
  },
  {
    id: 4,
    order: 4,
    period: "2005 ~ 2007",
    organization: "삼성전자",
    description: "생산관리\nSCM 최적화 및 고도화 업무",
    highlights: "",
    image_url: "/about/1.jpg",
  },
];

const TEAM_MEMBERS: TeamMember[] = [];

const CLIENTS: Client[] = [];

export const getServices = () => SERVICES;
export const getPortfolio = () => PORTFOLIO_ITEMS;
export const getTimeline = () => TIMELINE_ENTRIES;
export const getTeam = () => TEAM_MEMBERS;
export const getClients = () => CLIENTS;
