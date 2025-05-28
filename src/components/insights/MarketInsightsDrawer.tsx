import {
  Drawer,
  List,
  Tag,
  Space,
  Typography,
  Badge,
  Button,
  Empty,
  Tooltip,
  Divider,
} from "antd";
import {
  AlertOutlined,
  RiseOutlined,
  WarningOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  StockOutlined,
} from "@ant-design/icons";
import type { MarketInsight } from "../../types/financial";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { Text } = Typography;

interface MarketInsightsDrawerProps {
  visible: boolean;
  onClose: () => void;
  insights: MarketInsight[];
  onInsightClick?: (insight: MarketInsight) => void;
}

const MarketInsightsDrawer = ({
  visible,
  onClose,
  insights,
  onInsightClick,
}: MarketInsightsDrawerProps) => {
  const getInsightIcon = (type: MarketInsight["type"]) => {
    switch (type) {
      case "Alert":
        return <AlertOutlined style={{ color: "#d6002a" }} />;
      case "Opportunity":
        return <RiseOutlined style={{ color: "#4caf50" }} />;
      case "Risk":
        return <WarningOutlined style={{ color: "#ff9800" }} />;
      case "News":
        return <FileTextOutlined style={{ color: "#2196f3" }} />;
      default:
        return <FileTextOutlined />;
    }
  };

  const getInsightColor = (type: MarketInsight["type"]): string => {
    switch (type) {
      case "Alert":
        return "red";
      case "Opportunity":
        return "green";
      case "Risk":
        return "orange";
      case "News":
        return "blue";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: MarketInsight["priority"]): string => {
    switch (priority) {
      case "High":
        return "#d6002a";
      case "Medium":
        return "#ff9800";
      case "Low":
        return "#4caf50";
      default:
        return "#757575";
    }
  };

  const getPriorityBadge = (priority: MarketInsight["priority"]) => {
    const count = priority === "High" ? 3 : priority === "Medium" ? 2 : 1;
    return (
      <Badge
        count={count}
        style={{
          backgroundColor: getPriorityColor(priority),
          fontSize: 10,
          height: 16,
          minWidth: 16,
          lineHeight: "16px",
        }}
      />
    );
  };

  // Sort insights by priority and timestamp
  const sortedInsights = [...insights].sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const highPriorityCount = insights.filter(
    (i) => i.priority === "High"
  ).length;
  const mediumPriorityCount = insights.filter(
    (i) => i.priority === "Medium"
  ).length;

  return (
    <Drawer
      title={
        <Space>
          <AlertOutlined />
          <span>Market Insights & Alerts</span>
          <Badge
            count={insights.length}
            showZero
            style={{ backgroundColor: "#d6002a" }}
          />
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={480}
      extra={
        <Space>
          <Button size="small" onClick={() => console.log("Mark all as read")}>
            Mark All Read
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => console.log("Settings")}
          >
            Settings
          </Button>
        </Space>
      }
    >
      {/* Summary */}
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Tag color="red">{highPriorityCount} High Priority</Tag>
          <Tag color="orange">{mediumPriorityCount} Medium Priority</Tag>
          <Tag color="blue">{insights.length} Total Insights</Tag>
        </Space>
      </div>

      <Divider />

      {/* Insights List */}
      {sortedInsights.length === 0 ? (
        <Empty
          description="No market insights available"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <List
          dataSource={sortedInsights}
          renderItem={(insight) => (
            <List.Item
              key={insight.id}
              style={{
                cursor: onInsightClick ? "pointer" : "default",
                padding: "12px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
              onClick={() => onInsightClick?.(insight)}
            >
              <List.Item.Meta
                avatar={
                  <Space direction="vertical" align="center" size={4}>
                    {getInsightIcon(insight.type)}
                    {getPriorityBadge(insight.priority)}
                  </Space>
                }
                title={
                  <Space
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ fontSize: 14 }}>
                        {insight.title}
                      </Text>
                      <div>
                        <Tag
                          color={getInsightColor(insight.type)}
                          style={{ marginTop: 4 }}
                        >
                          {insight.type}
                        </Tag>
                      </div>
                    </div>
                    <Tooltip
                      title={dayjs(insight.timestamp).format(
                        "MMM DD, YYYY HH:mm"
                      )}
                    >
                      <Text
                        type="secondary"
                        style={{
                          fontSize: 11,
                          whiteSpace: "nowrap",
                          marginLeft: 8,
                        }}
                      >
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        {dayjs(insight.timestamp).fromNow()}
                      </Text>
                    </Tooltip>
                  </Space>
                }
                description={
                  <div>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#666",
                        display: "block",
                        marginBottom: 8,
                        lineHeight: 1.4,
                      }}
                    >
                      {insight.message}
                    </Text>
                    {insight.relatedSymbols.length > 0 && (
                      <div>
                        <Space size={4} wrap>
                          <StockOutlined
                            style={{ fontSize: 12, color: "#999" }}
                          />
                          {insight.relatedSymbols.map((symbol) => (
                            <Tag
                              key={symbol}
                              style={{
                                fontSize: 10,
                                lineHeight: "16px",
                                height: 18,
                                margin: "0 2px 2px 0",
                              }}
                            >
                              {symbol}
                            </Tag>
                          ))}
                        </Space>
                      </div>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}

      {/* Action Buttons */}
      {sortedInsights.length > 0 && (
        <div
          style={{
            marginTop: 24,
            padding: "16px 0",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Space style={{ width: "100%" }} direction="vertical">
            <Button
              type="primary"
              block
              onClick={() => console.log("View detailed analytics")}
            >
              View Detailed Analytics
            </Button>
            <Button block onClick={() => console.log("Export insights")}>
              Export Insights Report
            </Button>
          </Space>
        </div>
      )}
    </Drawer>
  );
};

export default MarketInsightsDrawer;
