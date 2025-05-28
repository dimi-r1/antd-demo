export interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  dayChange: number;
  dayChangePercent: number;
  riskLevel: "Low" | "Medium" | "High";
  lastUpdated: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: "Stock" | "Bond" | "ETF" | "Crypto" | "Real Estate";
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  allocation: number;
  sector: string;
  region: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: "Buy" | "Sell" | "Dividend" | "Transfer";
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  amount: number;
  fee: number;
  portfolioId: string;
}

export interface SecurityMetrics {
  symbol: string;
  name: string;
  totalRevenue: number;
  ebitda: number;
  tev: number; // Total Enterprise Value
  pe: number;
  pb: number;
  roe: number;
  debtToEquity: number;
  currentRatio: number;
  sector: string;
  marketCap: number;
}

export interface CashFlow {
  date: string;
  inflow: number;
  outflow: number;
  netFlow: number;
  category: string;
  description: string;
}

export interface EntityRelationship {
  id: string;
  parentId?: string;
  name: string;
  type: "Fund" | "Company" | "Division" | "Portfolio" | "Account";
  level: number;
  children?: EntityRelationship[];
}

export interface RiskMetric {
  metric: string;
  value: number;
  benchmark: number;
  status: "Good" | "Warning" | "Critical";
  description: string;
}

export interface MarketInsight {
  id: string;
  title: string;
  type: "Alert" | "Opportunity" | "Risk" | "News";
  priority: "High" | "Medium" | "Low";
  message: string;
  timestamp: string;
  relatedSymbols: string[];
}
