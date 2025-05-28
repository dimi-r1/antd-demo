import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  PieChartOutlined,
  TableOutlined,
  BarChartOutlined,
  WalletOutlined,
  AlertOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const DashboardSidebar = ({
  activeTab,
  onTabChange,
  collapsed,
  onCollapse,
}: DashboardSidebarProps) => {
  const menuItems = [
    {
      key: "overview",
      icon: <DashboardOutlined />,
      label: "Portfolio Overview",
    },
    {
      key: "assets",
      icon: <PieChartOutlined />,
      label: "Asset Allocation",
    },
    {
      key: "transactions",
      icon: <TableOutlined />,
      label: "Transactions",
    },
    {
      key: "securities",
      icon: <BarChartOutlined />,
      label: "Securities Analysis",
    },
    {
      key: "risk",
      icon: <AlertOutlined />,
      label: "Risk Management",
    },
    {
      key: "cashflow",
      icon: <WalletOutlined />,
      label: "Cash Flow",
    },
    {
      key: "showcase",
      icon: <AppstoreOutlined />,
      label: "Component Showcase",
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={256}
      style={{
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e0e0e0",
      }}
      trigger={null} // Remove default trigger
    >
      {/* Custom collapse trigger */}
      <div
        style={{
          height: 20,
          width: 20,
          margin: collapsed ? "12px auto" : "12px 16px 12px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          borderRadius: 2,
          color: "#666",
          transition: "all 0.15s",
        }}
        onClick={() => onCollapse(!collapsed)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f0f0f0";
          e.currentTarget.style.color = "#333";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#666";
        }}
      >
        {collapsed ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        onClick={({ key }) => onTabChange(key)}
        style={{ borderRight: "none", height: "calc(100% - 44px)" }}
        items={menuItems}
      />
    </Sider>
  );
};

export default DashboardSidebar;
