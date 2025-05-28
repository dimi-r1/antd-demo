import {
  Row,
  Col,
  Card,
  Progress,
  Statistic,
  Tag,
  Space,
  Typography,
  Alert,
  Descriptions,
  Tooltip,
} from "antd";
import {
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import type { RiskMetric } from "../../types/financial";

const { Text, Title } = Typography;

interface RiskMetricsDashboardProps {
  riskMetrics: RiskMetric[];
}

const RiskMetricsDashboard = ({ riskMetrics }: RiskMetricsDashboardProps) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusIcon = (status: RiskMetric["status"]) => {
    switch (status) {
      case "Good":
        return <CheckCircleOutlined style={{ color: "#4caf50" }} />;
      case "Warning":
        return <WarningOutlined style={{ color: "#ff9800" }} />;
      case "Critical":
        return <ExclamationCircleOutlined style={{ color: "#d6002a" }} />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const getStatusColor = (status: RiskMetric["status"]): string => {
    switch (status) {
      case "Good":
        return "#4caf50";
      case "Warning":
        return "#ff9800";
      case "Critical":
        return "#d6002a";
      default:
        return "#757575";
    }
  };

  const getProgressColor = (status: RiskMetric["status"]): string => {
    switch (status) {
      case "Good":
        return "#4caf50";
      case "Warning":
        return "#ff9800";
      case "Critical":
        return "#d6002a";
      default:
        return "#2196f3";
    }
  };

  const calculateProgress = (
    value: number,
    benchmark: number,
    isInverse = false
  ): number => {
    if (isInverse) {
      // For metrics where lower is better (like VaR, volatility)
      return Math.max(0, Math.min(100, (benchmark / value) * 100));
    } else {
      // For metrics where higher is better (like Sharpe ratio)
      return Math.max(0, Math.min(100, (value / benchmark) * 100));
    }
  };

  const criticalMetrics = riskMetrics.filter((m) => m.status === "Critical");
  const warningMetrics = riskMetrics.filter((m) => m.status === "Warning");
  const goodMetrics = riskMetrics.filter((m) => m.status === "Good");

  return (
    <div>
      <Title level={3}>Risk Management Dashboard</Title>

      {/* Risk Status Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8} lg={6}>
          <Card>
            <Statistic
              title="Risk Metrics"
              value={riskMetrics.length}
              valueStyle={{ color: "#212121" }}
              prefix={<SafetyCertificateOutlined />}
              suffix="total"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <Card>
            <Statistic
              title="Good Status"
              value={goodMetrics.length}
              valueStyle={{ color: "#4caf50" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <Card>
            <Statistic
              title="Warnings"
              value={warningMetrics.length}
              valueStyle={{ color: "#ff9800" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <Card>
            <Statistic
              title="Critical"
              value={criticalMetrics.length}
              valueStyle={{ color: "#d6002a" }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Risk Alerts */}
      {criticalMetrics.length > 0 && (
        <Alert
          type="error"
          message="Critical Risk Alert"
          description={`${criticalMetrics.length} risk metric(s) require immediate attention.`}
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {warningMetrics.length > 0 && (
        <Alert
          type="warning"
          message="Risk Warning"
          description={`${warningMetrics.length} risk metric(s) are above normal thresholds.`}
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Risk Metrics Cards */}
      <Row gutter={[24, 24]}>
        {riskMetrics.map((metric, index) => {
          const isInverse =
            metric.metric.toLowerCase().includes("risk") ||
            metric.metric.toLowerCase().includes("drawdown") ||
            metric.metric.toLowerCase().includes("volatility");

          const progress = calculateProgress(
            metric.value,
            metric.benchmark,
            isInverse
          );

          return (
            <Col xs={24} lg={12} xl={8} key={index}>
              <Card
                title={
                  <Space>
                    {getStatusIcon(metric.status)}
                    <Text strong>{metric.metric}</Text>
                  </Space>
                }
                extra={
                  <Tag color={getStatusColor(metric.status)}>
                    {metric.status}
                  </Tag>
                }
              >
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  size="middle"
                >
                  {/* Metric Value */}
                  <div>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Text type="secondary">Current Value</Text>
                      </Col>
                      <Col>
                        <Text type="secondary">Benchmark</Text>
                      </Col>
                    </Row>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Text
                          strong
                          style={{
                            fontSize: 20,
                            color: getStatusColor(metric.status),
                          }}
                        >
                          {metric.metric.toLowerCase().includes("risk") &&
                          typeof metric.value === "number" &&
                          metric.value > 1000
                            ? formatCurrency(metric.value)
                            : typeof metric.value === "number" &&
                              metric.value < 10
                            ? metric.value.toFixed(2)
                            : metric.value.toFixed(1)}
                          {metric.metric.toLowerCase().includes("%") ||
                          metric.metric.toLowerCase().includes("drawdown") ||
                          metric.metric.toLowerCase().includes("volatility")
                            ? "%"
                            : ""}
                        </Text>
                      </Col>
                      <Col>
                        <Text>
                          {metric.metric.toLowerCase().includes("risk") &&
                          typeof metric.benchmark === "number" &&
                          metric.benchmark > 1000
                            ? formatCurrency(metric.benchmark)
                            : typeof metric.benchmark === "number" &&
                              metric.benchmark < 10
                            ? metric.benchmark.toFixed(2)
                            : metric.benchmark.toFixed(1)}
                          {metric.metric.toLowerCase().includes("%") ||
                          metric.metric.toLowerCase().includes("drawdown") ||
                          metric.metric.toLowerCase().includes("volatility")
                            ? "%"
                            : ""}
                        </Text>
                      </Col>
                    </Row>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Performance vs Benchmark
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {progress.toFixed(0)}%
                      </Text>
                    </div>
                    <Progress
                      percent={progress}
                      strokeColor={getProgressColor(metric.status)}
                      showInfo={false}
                    />
                  </div>

                  {/* Description */}
                  <Tooltip title={metric.description}>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: 12,
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <InfoCircleOutlined style={{ marginRight: 4 }} />
                      {metric.description}
                    </Text>
                  </Tooltip>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Risk Summary */}
      <Card title="Risk Assessment Summary" style={{ marginTop: 24 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Overall Risk Level">
            <Space>
              {criticalMetrics.length > 0 ? (
                <>
                  <Tag color="red">High Risk</Tag>
                  <Text type="secondary">Immediate action required</Text>
                </>
              ) : warningMetrics.length > 0 ? (
                <>
                  <Tag color="orange">Moderate Risk</Tag>
                  <Text type="secondary">Monitor closely</Text>
                </>
              ) : (
                <>
                  <Tag color="green">Low Risk</Tag>
                  <Text type="secondary">Within acceptable limits</Text>
                </>
              )}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Risk Score">
            <Space>
              <Progress
                type="circle"
                size={60}
                percent={Math.max(
                  0,
                  100 -
                    (criticalMetrics.length * 30 + warningMetrics.length * 10)
                )}
                strokeColor={
                  criticalMetrics.length > 0
                    ? "#d6002a"
                    : warningMetrics.length > 0
                    ? "#ff9800"
                    : "#4caf50"
                }
              />
              <Text type="secondary">
                {criticalMetrics.length > 0
                  ? "High risk exposure"
                  : warningMetrics.length > 0
                  ? "Moderate risk exposure"
                  : "Low risk exposure"}
              </Text>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Next Review">
            <Text>Next business day</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            <Text>{new Date().toLocaleDateString()}</Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default RiskMetricsDashboard;
