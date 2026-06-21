export interface Usuario {
  id: string;
  displayName: string;
  email: string;
  statusPremium: boolean;
  searchesCount: number;
}

export interface BuscaRecente {
  id: string;
  url: string;
  scamDetected: boolean;
  scamType: "Phishing" | "Golpe do Pix" | "Venda Falsa" | "Clonagem de Marca" | "None";
  riskScore: number;
  analysisText: string;
  timestamp: string;
  detectedBrand?: string;
  maliciousIndicators?: string[];
}

export type PageName = "home" | "admin" | "usuarios" | "pagamento" | "paywall" | "recuperacao" | "sobre";

export interface AppStateContextType {
  // Navigation
  currentPage: PageName;
  navigationHistory: PageName[];
  pushPage: (page: PageName) => void;
  popPage: () => void;
  
  // App variables
  isPremium: boolean;
  setPremiumGlobal: (value: boolean) => void;
  pesquisasRestantes: number;
  setPesquisasRestantes: (value: number) => void;
  anunciosVistos: number;
  setAnunciosVistos: (value: number) => void;
  
  // Simulated DB
  usuarios: Usuario[];
  toggleUserPremium: (id: string, value: boolean) => void;
  addUsuario: (displayName: string, email: string) => void;
  
  // Searches
  recentSearches: BuscaRecente[];
  addSearch: (url: string, scamDetected: boolean, scamType: any, riskScore: number, analysisText: string, brand?: string, indicators?: string[]) => void;
  clearSearches: () => void;

  // Configuration
  maintenanceMode: boolean;
  setMaintenanceMode: (value: boolean) => void;
  kiwifyLink: string;
  setKiwifyLink: (value: string) => void;
  paymentPlatform: string;
  setPaymentPlatform: (value: string) => void;
}
