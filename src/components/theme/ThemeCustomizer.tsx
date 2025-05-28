import React from "react";
import {
  Card,
  Tabs,
  Input,
  Button,
  Space,
  Typography,
  Modal,
  Row,
  Col,
  Tag,
  Tooltip,
  Alert,
  Form,
} from "antd";
import {
  DownloadOutlined,
  ReloadOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import type { ThemeConfig } from "antd/es/config-provider/context";
import { useThemeCustomizer } from "../../hooks/useThemeCustomizer";
import {
  useThemeConfiguration,
  type TokenGroup,
  type ComponentGroup,
} from "../../hooks/useThemeConfiguration";
import { ThemeFormField } from "./ThemeFormField";

const { Title, Text } = Typography;
const { TextArea } = Input;

// Type definitions
type ThemeTokenValue = string | number;

interface ThemeCustomizerProps {
  currentTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
  onPresetSelect: (preset: "red") => void;
  currentPreset: "red" | "green" | "custom";
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  currentTheme,
  onThemeChange,
  onPresetSelect,
  currentPreset,
}) => {
  const {
    activeTab,
    setActiveTab,
    isExportModalVisible,
    setIsExportModalVisible,
    exportCode,
    displayTheme,
    hasPendingChanges,
    handleTokenChange,
    applyChanges,
    discardChanges,
    resetToRed,
    generateExportCode,
    copyToClipboard,
  } = useThemeCustomizer({
    currentTheme,
    onThemeChange,
    onPresetSelect,
    currentPreset,
  });

  const { tokenGroups, componentGroups } = useThemeConfiguration();

  // Get value from theme object using path - use displayTheme for pending changes
  const getValue = (path: string[]): ThemeTokenValue => {
    let current: unknown = displayTheme;
    for (const key of path) {
      if (current && typeof current === "object" && current !== null) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return "";
      }
    }
    return (current as ThemeTokenValue) || "";
  };

  // Render form field for token/component property
  const renderFormField = (
    property: {
      key: string;
      label: string;
      type: "color" | "number" | "string" | "select";
      description?: string;
      options?: { label: string; value: string | number }[];
      min?: number;
      max?: number;
      step?: number;
      unit?: string;
    },
    path: string[]
  ) => {
    const value = getValue(path);
    return (
      <ThemeFormField
        property={property}
        value={value}
        onChange={(newValue) => handleTokenChange(path, newValue)}
      />
    );
  };

  // Render token group
  const renderTokenGroup = (group: TokenGroup) => (
    <Card key={group.title} size="small" style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Title
          level={5}
          style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}
        >
          <span>{group.icon}</span>
          {group.title}
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {group.description}
        </Text>
      </div>

      <Row gutter={[12, 8]}>
        {group.tokens.map((token) => (
          <Col span={12} key={token.key}>
            <Form.Item
              label={
                <Tooltip title={token.description}>
                  <span style={{ fontSize: 12 }}>{token.label}</span>
                </Tooltip>
              }
              style={{ marginBottom: 8 }}
            >
              {renderFormField(token, ["token", token.key])}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Card>
  );

  // Render component group
  const renderComponentGroup = (group: ComponentGroup) => (
    <Card key={group.component} size="small" style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0 }}>
          {group.title}
        </Title>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {group.description}
        </Text>
      </div>

      <Row gutter={[12, 8]}>
        {group.properties.map((property) => (
          <Col span={12} key={property.key}>
            <Form.Item
              label={
                <Tooltip title={property.description}>
                  <span style={{ fontSize: 12 }}>{property.label}</span>
                </Tooltip>
              }
              style={{ marginBottom: 8 }}
            >
              {renderFormField(property, [
                "components",
                group.component,
                property.key,
              ])}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Card>
  );

  // Create a comprehensive key for forcing re-renders when theme changes
  const themeKey = `${currentTheme?.token?.colorPrimary || ""}-${
    currentTheme?.token?.fontSize || ""
  }-${currentTheme?.token?.borderRadius || ""}`;

  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Theme Customizer
            </Title>
            <Text type="secondary">
              Customize your Ant Design theme in real-time. Current preset:
              <Tag
                color={
                  currentPreset === "red"
                    ? "red"
                    : currentPreset === "green"
                    ? "green"
                    : "blue"
                }
                style={{ marginLeft: 8 }}
              >
                {currentPreset === "red"
                  ? "Red Theme"
                  : currentPreset === "green"
                  ? "Green Theme"
                  : "Custom Theme"}
              </Tag>
            </Text>
          </div>

          <Space>
            {hasPendingChanges && (
              <>
                <Button
                  onClick={applyChanges}
                  type="primary"
                  icon={<DownloadOutlined />}
                >
                  Apply Changes
                </Button>
                <Button onClick={discardChanges}>Discard</Button>
              </>
            )}
            <Button onClick={resetToRed} icon={<ReloadOutlined />}>
              Reset
            </Button>
            <Button
              onClick={generateExportCode}
              icon={<DownloadOutlined />}
              type={hasPendingChanges ? "default" : "primary"}
            >
              Export Theme
            </Button>
          </Space>
        </div>

        {hasPendingChanges ? (
          <Alert
            message="Pending Changes"
            description="You have unsaved theme customizations. Click 'Apply Changes' to apply them to the interface, or 'Discard' to cancel your changes."
            type="warning"
            showIcon
            style={{ marginBottom: 24 }}
          />
        ) : (
          <Alert
            message="Theme Customization"
            description="Make changes to colors, spacing, and component styles below. Changes will be staged until you click 'Apply Changes' to see them in the interface."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          key={themeKey} // Force re-render when theme changes
          items={[
            {
              key: "tokens",
              label: "Design Tokens",
              children: (
                <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  {tokenGroups.map(renderTokenGroup)}
                </div>
              ),
            },
            {
              key: "components",
              label: "Component Styles",
              children: (
                <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  {componentGroups.map(renderComponentGroup)}
                </div>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title="Export Theme Configuration"
        open={isExportModalVisible}
        onCancel={() => setIsExportModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsExportModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="copy"
            type="primary"
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Text strong>Generated Theme Configuration</Text>
          <br />
          <Text type="secondary">
            Copy this code and use it in your application's ConfigProvider
            component.
          </Text>
        </div>

        <TextArea
          value={exportCode}
          readOnly
          rows={20}
          style={{ fontFamily: "monospace", fontSize: 12 }}
        />
      </Modal>
    </div>
  );
};

export default ThemeCustomizer;
