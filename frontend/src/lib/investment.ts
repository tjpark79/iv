/**
 * 투자 도구 레지스트리 — /investment 페이지의 단일 진실 공급원.
 *
 * P/world의 src/config/categories.ts와 같은 규약을 쓴다. 도구가 늘어나면 이
 * 파일에 항목 하나만 추가하면 페이지와 sitemap에 함께 반영된다.
 *
 * 규칙
 *   - 항목의 url이 없으면 「준비중」으로 표시된다. 미리 적어 두어도 된다.
 *   - url은 전부 외부(별개 사이트)로 나가므로 새 탭 + rel="noopener"로 연다.
 */

export type ItemKind = "대시보드" | "자료" | "시뮬레이터" | "계산기";

export type InvestmentItem = {
  title: string;
  desc: string;
  kind: ItemKind;
  /** 없으면 준비중으로 표시된다 */
  url?: string;
  /** 표시용 호스트. 없으면 url에서 뽑아 쓴다 */
  host?: string;
};

export type InvestmentGroup = {
  slug: string;
  name: string;
  desc: string;
  items: InvestmentItem[];
};

export const INVESTMENT_GROUPS: InvestmentGroup[] = [
  {
    slug: "etf",
    name: "ETF",
    desc: "국내외 상장 ETF의 지표를 한자리에 모으고, 자산군별로 어떻게 나눠 담을지 살펴봅니다.",
    items: [
      {
        title: "ETF Asset Allocation",
        desc: "국내·해외 주요 ETF의 수익률과 변동성을 한 화면에서 비교합니다. 위험 대비 수익률로 자산군별 비중을 잡아볼 수 있습니다.",
        kind: "대시보드",
        url: "https://etf.inter.vc",
      },
      {
        title: "포트폴리오 가상 시뮬레이션",
        desc: "구성한 포트폴리오를 과거 구간에 대입해 어떤 결과가 나왔을지 확인합니다.",
        kind: "시뮬레이터",
        url: "https://etf.inter.vc/portfolio.php",
      },
    ],
  },
  {
    slug: "pension",
    name: "연금과 절세계좌",
    desc: "연금저축·IRP·ISA는 계좌마다 한도와 세제가 다릅니다. 무엇을 어느 계좌에 담을지부터 정리합니다.",
    items: [
      {
        title: "연금저축·IRP·ISA 포트폴리오 가이드",
        desc: "절세계좌별 성격에 맞춰 무엇을 어떤 기준으로 담을지 정리하고, 조건에 맞는 국내 상장 ETF를 찾아봅니다.",
        kind: "자료",
        url: "https://etf.inter.vc/pension_portfolio.php",
      },
      {
        title: "절세·연금수령액 계산기",
        desc: "납입액과 수령 조건을 넣어 절세 효과와 실제 수령액을 계산합니다.",
        kind: "계산기",
        url: "https://etf.inter.vc/tax_calculator.php",
      },
    ],
  },
];

export function itemHost(item: InvestmentItem): string | undefined {
  if (item.host) return item.host;
  if (!item.url) return undefined;
  return new URL(item.url).host;
}
