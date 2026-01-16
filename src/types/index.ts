// API Response Types
export interface UploadResponse {
  id: string;
  status: string;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}

// Tax Report Types
export interface TaxReportDTO {
  brokers: string[];
  tax_boxes: TaxBoxes;
  taxes: TaxCalculation;
  broker_breakdown: BrokerBreakdownDTO[];
  commissions: CommissionsDTO;
}

export interface TaxBoxes {
  box_0029_gross_dividends: string;
  box_0025_spanish_withholdings: string;
  box_0588_foreign_withholdings: string;
  box_0328_gains_losses: string;
}

export interface TaxCalculation {
  gross_dividend_tax: string;
  foreign_deduction: string;
  spanish_deduction: string;
  net_dividend_tax: string;
  capital_gains_tax: string;
  total_to_pay: string;
}

export interface BrokerBreakdownDTO {
  name: string;
  gross_dividends: string;
  foreign_withholdings: string;
  spanish_withholdings: string;
  gains_losses: string;
}

export interface CommissionsDTO {
  total_buy: string;
  total_sell: string;
  by_broker: Record<string, CommissionBroker>;
}

export interface CommissionBroker {
  buy: string;
  sell: string;
}

// Component Props
export interface FileUploadProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
  error?: string | null;
  onShowTutorial?: () => void;
}

export interface ReportViewerProps {
  htmlContent: string;
  reportId: string;
}

export interface LoadingProps {
  message?: string;
}

export interface AppState {
  step: 'upload' | 'loading' | 'report';
  reportId: string | null;
  reportHtml: string | null;
  error: string | null;
}