import { useState } from "react";
import {
  Layout,
  Badge,
  Dropdown,
  Avatar,
  Space,
  Typography,
  Button,
  Tooltip,
} from "antd";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  GlobalOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

interface DashboardHeaderProps {
  onNotificationClick: () => void;
  notificationCount: number;
  onColorToggle: (theme: "red" | "green") => void;
  currentTheme?: "red" | "green";
}

const DashboardHeader = ({
  onNotificationClick,
  notificationCount,
  onColorToggle,
  currentTheme = "red",
}: DashboardHeaderProps) => {
  const [selectedMarket] = useState("US");

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile Settings",
    },
    {
      key: "preferences",
      icon: <SettingOutlined />,
      label: "Preferences",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const marketMenuItems = [
    { key: "US", label: "US Markets" },
    { key: "EU", label: "European Markets" },
    { key: "ASIA", label: "Asian Markets" },
    { key: "GLOBAL", label: "Global Markets" },
  ];

  return (
    <Header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo and Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#d6002a",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
            F
          </Text>
        </div>
        <div>
          <div style={{ lineHeight: "20px" }}>
            <Text strong style={{ fontSize: 18 }}>
              FinanceOS
            </Text>
          </div>
          <div style={{ lineHeight: "16px", marginTop: 2 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Portfolio Management Platform
            </Text>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <Space size="large">
        {/* Theme Toggle */}
        <Space size="small">
          <Text style={{ fontSize: 12, color: "#666" }}>Theme:</Text>
          <Button
            size="small"
            type={currentTheme === "red" ? "primary" : "default"}
            onClick={() => onColorToggle("red")}
            style={{
              borderRadius: 2,
              height: 24,
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            Red
          </Button>
          <Button
            size="small"
            type={currentTheme === "green" ? "primary" : "default"}
            onClick={() => onColorToggle("green")}
            style={{
              borderRadius: 2,
              height: 24,
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            Green
          </Button>
        </Space>

        {/* Market Selector */}
        <Dropdown
          menu={{
            items: marketMenuItems,
            selectable: true,
            defaultSelectedKeys: [selectedMarket],
          }}
          placement="bottomRight"
        >
          <Button type="text" icon={<GlobalOutlined />}>
            {selectedMarket} Markets
          </Button>
        </Dropdown>

        {/* Search */}
        <Tooltip title="Search securities, portfolios, and accounts">
          <Button type="text" icon={<SearchOutlined />} />
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Market insights and alerts">
          <Badge count={notificationCount} size="small">
            <Button
              type="text"
              icon={<BellOutlined />}
              onClick={onNotificationClick}
            />
          </Badge>
        </Tooltip>

        {/* User Menu */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Avatar size="small" icon={<UserOutlined />} />
            <Text>Portfolio Manager</Text>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default DashboardHeader;
