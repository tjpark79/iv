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
  title: string;
  summary: string;
  description: string;
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
    title: "경영전략 컨설팅",
    summary: "사업계획 수립과 자원 배분",
    description:
      "초기 창업팀에 필수적이지만 구하기 어려운 CFO, CSO의 업무 - 경영계획, 예산 관리, 기업 내 자원 배분, 투자유치 계획 등 - 를 수행합니다.",
    category: "Finance, Strategy, Consulting",
    duration: "업무협약 기간 내 지속",
    thumbnail_url: "/portfolio/01-thumbnail.jpg",
    full_image_url: "/portfolio/01-full.jpg",
  },
  {
    id: 2,
    order: 2,
    title: "재무기획 컨설팅",
    summary: "재무관련 토탈솔루션",
    description:
      "투자자와의 미팅에 필요한 1) 다년간의 재무예측(Financial Projection)과, 2) 증권사의 Global Standard Valuation 기법을 기반으로 한 기업가치 산출 등을 제공합니다.",
    category: "Finance, Consulting",
    duration: "평균 2개월 이내",
    thumbnail_url: "/portfolio/02-thumbnail.jpg",
    full_image_url: "/portfolio/02-full.jpg",
  },
  {
    id: 3,
    order: 3,
    title: "M&A 전략 컨설팅",
    summary: "기업 성장전략 수립",
    description:
      "SI · FI 투자유치, M&A, 유동화 채권 발행 등 상황에 맞는 전략을 제시하고 이를 통한 기업의 성장전략 수립을 지원합니다",
    category: "Strategy, Consulting",
    duration: "업무협약 기간 내 지속",
    thumbnail_url: "/portfolio/03-thumbnail.jpg",
    full_image_url: "/portfolio/03-full.jpg",
  },
  {
    id: 4,
    order: 4,
    title: "강의",
    summary: "창업팀이 반드시 알아야 할 노하우",
    description:
      "창업팀이 반드시 알아야 할 노하우를 1) 지분관리 편, 2) 자료작성 편, 3) Global Standard(재무전망) 편 등으로 세분화한 강의를 진행합니다.",
    category: "Lecture",
    duration: "1회 시간별 맞춤 가능",
    thumbnail_url: "/portfolio/04-thumbnail.jpg",
    full_image_url: "/portfolio/04-full.jpg",
  },
  {
    id: 5,
    order: 5,
    title: "IR",
    summary: "IR 리포트 작성",
    description: "글로벌 증권사에서 사용하는 양식을 기반으로 한 IR 리포트 혹은 기업백서를 작성해 드립니다.",
    category: "Reporting",
    duration: "IR 리포트 1달 내외 / 백서 2달 내외",
    thumbnail_url: "/portfolio/05-thumbnail.jpg",
    full_image_url: "/portfolio/05-full.jpg",
  },
  {
    id: 6,
    order: 6,
    title: "멘토링",
    summary: "투자유치에 임하는 기본자세",
    description: "투자유치에 필요한 발표자료 수정, 발표스킬 개선, BM 피봇팅 등의 멘토링 진행",
    category: "Mentoring",
    duration: "유동적",
    thumbnail_url: "/portfolio/06-thumbnail.jpg",
    full_image_url: "/portfolio/06-full.jpg",
  },
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
