import { useState, useCallback } from "react";
import { ConfigProvider, Layout, Tabs, theme, type TabsProps } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";
import DashboardHeader from "./components/layout/DashboardHeader";
import DashboardSidebar from "./components/layout/DashboardSidebar";
import PortfolioOverview from "./components/portfolio/PortfolioOverview";
import AssetAllocationTable from "./components/portfolio/AssetAllocationTable";
import TransactionHistory from "./components/transactions/TransactionHistory";
import SecurityMetricsTable from "./components/securities/SecurityMetricsTable";
import RiskMetricsDashboard from "./components/risk/RiskMetricsDashboard";
import CashFlowChart from "./components/cash/CashFlowChart";
import TradeModal from "./components/trading/TradeModal";
import MarketInsightsDrawer from "./components/insights/MarketInsightsDrawer";
import ComponentShowcase from "./components/showcase/ComponentShowcase";
import ThemeCustomizer from "./components/theme/ThemeCustomizer";
import {
  mockPortfolios,
  mockAssets,
  mockTransactions,
  mockSecurityMetrics,
  mockCashFlows,
  mockRiskMetrics,
  mockMarketInsights,
} from "./data/mockData";

const { Content } = Layout;

// Create theme configurations for red and green themes
const createTheme = (
  primaryColor: string,
  primaryBg: string,
  primaryBgHover: string,
  primaryBorder: string,
  primaryBorderHover: string,
  primaryHover: string,
  primaryActive: string
): ThemeConfig => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    // Primary Colors
    colorPrimary: primaryColor,
    colorPrimaryBg: primaryBg,
    colorPrimaryBgHover: primaryBgHover,
    colorPrimaryBorder: primaryBorder,
    colorPrimaryBorderHover: primaryBorderHover,
    colorPrimaryHover: primaryHover,
    colorPrimaryActive: primaryActive,

    // Success Colors (Green scale)
    colorSuccess: "#4caf50",
    colorSuccessBg: "#e8f5e9",
    colorSuccessBorder: "#a5d6a7",
    colorSuccessHover: "#388e3c",
    colorSuccessActive: "#2e7d32",

    // Warning Colors (Orange/Yellow scale)
    colorWarning: "#ff9800",
    colorWarningBg: "#fff3e0",
    colorWarningBorder: "#ffcc02",
    colorWarningHover: "#f57c00",
    colorWarningActive: "#ef6c00",

    // Error Colors (Using primary red)
    colorError: "#d6002a",
    colorErrorBg: "#ffebee",
    colorErrorBorder: "#ef9a9a",
    colorErrorHover: "#b71c1c",
    colorErrorActive: "#8d0000",

    // Info Colors (Blue scale)
    colorInfo: "#2196f3",
    colorInfoBg: "#e3f2fd",
    colorInfoBorder: "#90caf9",
    colorInfoHover: "#1976d2",
    colorInfoActive: "#1565c0",

    // colorBgBase: "#ffffff", // White
    // colorBgContainer: "#fafafa", // Gray 5
    // colorBgElevated: "#ffffff",
    // colorBgLayout: "#f5f5f5", // Gray 10
    // colorBorder: "#e0e0e0", // Gray 30
    // colorBorderSecondary: "#f0f0f0", // Gray 15
    // colorSplit: "#f0f0f0",
    // colorText: "#212121", // Gray 90
    // colorTextSecondary: "#757575", // Gray 60
    // colorTextTertiary: "#9e9e9e", // Gray 50
    // colorTextQuaternary: "#bdbdbd", // Gray 40
    // colorFill: "#f5f5f5",
    // colorFillSecondary: "#fafafa",
    // colorFillTertiary: "#f0f0f0",
    // colorFillQuaternary: "#e0e0e0",

    // Typography (from your design system)
    fontFamily:
      '"Segoe UI", BlinkMacSystemFont, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontSize: 14, // Base font size
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 32, // XXLarge
    fontSizeHeading2: 24, // XLarge
    fontSizeHeading3: 20, // Large
    fontSizeHeading4: 16, // Medium
    fontSizeHeading5: 14, // Small

    // Line Heights
    lineHeight: 1.5,
    lineHeightLG: 1.5,
    lineHeightSM: 1.25,

    // Font Weights
    fontWeightStrong: 600,

    // Spacing (4px base scale from your design system)
    padding: 16, // 4 tokens
    paddingXXS: 4, // 1 token
    paddingXS: 8, // 2 tokens
    paddingSM: 12, // 3 tokens
    paddingMD: 20, // 5 tokens
    paddingLG: 24, // 6 tokens
    paddingXL: 32, // 8 tokens
    margin: 16,
    marginXXS: 4,
    marginXS: 8,
    marginSM: 12,
    marginMD: 20,
    marginLG: 24,
    marginXL: 32,
    marginXXL: 40,

    // Border Radius
    borderRadius: 4,
    borderRadiusXS: 2,
    borderRadiusSM: 4,
    borderRadiusLG: 8,
    borderRadiusOuter: 4,

    // Shadows (Elevation system - 4 layers)
    boxShadow: "none", // Layer 0 - Alert
    boxShadowSecondary: "0 2px 4px rgba(0, 0, 0, 0.1)", // Layer 1 - Select menu (SM)
    boxShadowTertiary: "0 4px 8px rgba(0, 0, 0, 0.12)", // Layer 2 - Dropdown, Toast (MD)

    // Control Heights
    controlHeight: 32,
    controlHeightSM: 24,
    controlHeightLG: 40,
    controlHeightXS: 16,

    // Motion
    motionDurationFast: "0.1s",
    motionDurationMid: "0.2s",
    motionDurationSlow: "0.3s",

    // Z-index (matching your elevation layers)
    zIndexBase: 0,
    zIndexPopupBase: 1000, // Layer 1
  },
  components: {
    // Button customizations
    Button: {
      borderRadius: 4,
      fontWeight: 500,
      paddingContentHorizontal: 16,
      paddingContentVertical: 8,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },
    // Card customizations
    Card: {
      borderRadius: 8,
      paddingLG: 24,
      headerBg: "transparent",
      boxShadowTertiary: "0 2px 8px rgba(0, 0, 0, 0.06)",
    },
    // Modal customizations (Layer 3)
    Modal: {
      borderRadius: 8,
      paddingContentHorizontal: 24,
      paddingMD: 20,
    },
    // Drawer customizations (Layer 3)
    Drawer: {
      borderRadius: 0,
      paddingLG: 24,
    },
    // Dropdown customizations (Layer 2)
    Dropdown: {
      borderRadius: 4,
      paddingSM: 8,
    },
    // Select customizations (Layer 1)
    Select: {
      borderRadius: 4,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },
    // Input customizations
    Input: {
      borderRadius: 4,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
      paddingContentHorizontal: 12,
    },
    // Table customizations
    Table: {
      borderRadius: 4,
      headerBg: "#fafafa",
      headerSplitColor: "#e0e0e0",
      rowHoverBg: "#f5f5f5",
    },
    // Menu customizations
    Menu: {
      borderRadius: 4,
      itemBorderRadius: 4,
      itemPaddingInline: 12,
      itemMarginInline: 4,
    },
    // Tooltip customizations (Sublayer)
    Tooltip: {
      borderRadius: 4,
      paddingSM: 8,
      fontSize: 12,
    },
    // Popover customizations
    Popover: {
      borderRadius: 8,
      paddingLG: 16,
    },
    // Alert customizations (Layer 0)
    Alert: {
      borderRadius: 4,
      paddingContentHorizontal: 16,
      paddingContentVertical: 8,
    },
    // Message/Toast customizations (Layer 2)
    Message: {
      borderRadius: 4,
      paddingContentHorizontal: 16,
      paddingContentVertical: 8,
    },
    // Notification customizations (Layer 2)
    Notification: {
      borderRadius: 8,
      paddingLG: 16,
    },
    // Typography customizations
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 24,
    },
  },
});

// Default red theme configuration
const redTheme = createTheme(
  "#d6002a", // Primary red 100
  "#ffebee", // Light red background
  "#ffcdd2",
  "#ef9a9a",
  "#e57373",
  "#b71c1c", // Darker red for hover
  "#8d0000" // Even darker for active
);

// Default green theme configuration
const greenTheme = createTheme(
  "#4caf50", // Primary green 100
  "#e8f5e9", // Light green background
  "#c8e6c9",
  "#a5d6a7",
  "#81c784",
  "#388e3c", // Darker green for hover
  "#2e7d32" // Even darker for active
);

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("overview");
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [isInsightsDrawerVisible, setIsInsightsDrawerVisible] = useState(false);

  // Initialize theme state from localStorage or defaults
  const [themeState, setThemeState] = useState<{
    currentTheme: "red" | "green" | "custom";
    customThemeConfig: ThemeConfig;
  }>(() => {
    try {
      const saved = localStorage.getItem("antd-theme-customizer");
      if (saved) {
        const savedTheme = JSON.parse(saved) as ThemeConfig;
        if (savedTheme && typeof savedTheme === "object") {
          return {
            currentTheme: "custom",
            customThemeConfig: savedTheme,
          };
        }
      }
    } catch (_error) {
      // Fallback to default if saved theme is invalid
    }
    return {
      currentTheme: "red",
      customThemeConfig: redTheme,
    };
  });

  const { currentTheme, customThemeConfig } = themeState;

  const handleTabChange = (key: string) => {
    if (key === "trade") {
      setIsTradeModalVisible(true);
    } else if (key === "insights") {
      setIsInsightsDrawerVisible(true);
    } else {
      setActiveKey(key);
    }
  };

  const handleColorToggle = useCallback((theme: "red" | "green") => {
    const selectedTheme = theme === "red" ? redTheme : greenTheme;
    setThemeState({
      currentTheme: theme,
      customThemeConfig: selectedTheme,
    });
    // Clear localStorage when switching to presets
    localStorage.removeItem("antd-theme-customizer");
  }, []);

  const handleThemeChange = useCallback((newTheme: ThemeConfig) => {
    setThemeState({
      currentTheme: "custom",
      customThemeConfig: newTheme,
    });
    // Save custom theme to localStorage immediately
    localStorage.setItem("antd-theme-customizer", JSON.stringify(newTheme));
  }, []);

  const handlePresetSelect = useCallback((_preset: "red") => {
    setThemeState({
      currentTheme: "red",
      customThemeConfig: redTheme,
    });
    // Clear localStorage when switching to presets
    localStorage.removeItem("antd-theme-customizer");
  }, []);

  // Select the current theme - use red, green, or custom theme
  const selectedTheme =
    currentTheme === "red"
      ? redTheme
      : currentTheme === "green"
      ? greenTheme
      : customThemeConfig;

  const tabItems: TabsProps["items"] = [
    {
      key: "overview",
      label: "Portfolio Overview",
      children: <PortfolioOverview portfolios={mockPortfolios} />,
    },
    {
      key: "assets",
      label: "Asset Allocation",
      children: (
        <AssetAllocationTable
          assets={mockAssets}
          onTradeClick={() => setIsTradeModalVisible(true)}
        />
      ),
    },
    {
      key: "transactions",
      label: "Transactions",
      children: <TransactionHistory transactions={mockTransactions} />,
    },
    {
      key: "securities",
      label: "Securities Analysis",
      children: <SecurityMetricsTable securities={mockSecurityMetrics} />,
    },
    {
      key: "risk",
      label: "Risk Management",
      children: <RiskMetricsDashboard riskMetrics={mockRiskMetrics} />,
    },
    {
      key: "cashflow",
      label: "Cash Flow",
      children: <CashFlowChart cashFlows={mockCashFlows} />,
    },
    {
      key: "theme",
      label: "Theme Designer",
      children: (
        <ThemeCustomizer
          currentTheme={selectedTheme}
          onThemeChange={handleThemeChange}
          onPresetSelect={handlePresetSelect}
          currentPreset={currentTheme}
        />
      ),
    },
  ];

  return (
    <ConfigProvider theme={selectedTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <DashboardHeader
          onNotificationClick={() => setIsInsightsDrawerVisible(true)}
          notificationCount={mockMarketInsights.length}
          onColorToggle={handleColorToggle}
          currentTheme={currentTheme}
        />

        <Layout>
          <DashboardSidebar
            activeTab={activeKey}
            onTabChange={handleTabChange}
            collapsed={collapsed}
            onCollapse={setCollapsed}
          />

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
              overflow: "auto",
            }}
          >
            {activeKey === "showcase" ? (
              <ComponentShowcase />
            ) : (
              <Tabs
                activeKey={activeKey}
                onChange={setActiveKey}
                items={tabItems}
                size="large"
                style={{ height: "100%" }}
              />
            )}
          </Content>
        </Layout>

        <TradeModal
          visible={isTradeModalVisible}
          onClose={() => setIsTradeModalVisible(false)}
          onSubmit={(_tradeData) => {
            // Handle trade submission - in a real app, this would call an API
            setIsTradeModalVisible(false);
          }}
        />

        <MarketInsightsDrawer
          visible={isInsightsDrawerVisible}
          onClose={() => setIsInsightsDrawerVisible(false)}
          insights={mockMarketInsights}
        />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
