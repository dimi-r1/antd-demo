import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Tag,
  Space,
  Typography,
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { Portfolio } from "../../types/financial";

const { Text, Title } = Typography;

interface PortfolioOverviewProps {
  portfolios: Portfolio[];
}

const PortfolioOverview = ({ portfolios }: PortfolioOverviewProps) => {
  // Calculate total metrics across all portfolios
  const totalValue = portfolios.reduce((sum, p) => sum + p.totalValue, 0);
  const totalReturn = portfolios.reduce((sum, p) => sum + p.totalReturn, 0);
  const totalDayChange = portfolios.reduce((sum, p) => sum + p.dayChange, 0);
  const avgReturnPercent =
    portfolios.reduce((sum, p) => sum + p.totalReturnPercent, 0) /
    portfolios.length;
  const avgDayChangePercent =
    portfolios.reduce((sum, p) => sum + p.dayChangePercent, 0) /
    portfolios.length;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const getRiskColor = (risk: Portfolio["riskLevel"]): string => {
    switch (risk) {
      case "Low":
        return "#4caf50";
      case "Medium":
        return "#ff9800";
      case "High":
        return "#d6002a";
      default:
        return "#757575";
    }
  };

  return (
    <div>
      <Title level={3}>Portfolio Overview</Title>

      {/* Summary Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Portfolio Value"
              value={totalValue}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#212121" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Return"
              value={totalReturn}
              formatter={(value) => formatCurrency(Number(value))}
              prefix={
                totalReturn >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
              valueStyle={{ color: totalReturn >= 0 ? "#4caf50" : "#d6002a" }}
              suffix={
                <Text
                  style={{
                    fontSize: 14,
                    color: totalReturn >= 0 ? "#4caf50" : "#d6002a",
                  }}
                >
                  ({formatPercent(avgReturnPercent)})
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Day Change"
              value={totalDayChange}
              formatter={(value) => formatCurrency(Number(value))}
              prefix={
                totalDayChange >= 0 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              valueStyle={{
                color: totalDayChange >= 0 ? "#4caf50" : "#d6002a",
              }}
              suffix={
                <Text
                  style={{
                    fontSize: 14,
                    color: totalDayChange >= 0 ? "#4caf50" : "#d6002a",
                  }}
                >
                  ({formatPercent(avgDayChangePercent)})
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Portfolios"
              value={portfolios.length}
              valueStyle={{ color: "#212121" }}
              suffix="portfolios"
            />
          </Card>
        </Col>
      </Row>

      {/* Individual Portfolio Cards */}
      <Row gutter={[24, 24]}>
        {portfolios.map((portfolio) => (
          <Col xs={24} lg={8} key={portfolio.id}>
            <Card
              title={
                <div style={{ lineHeight: 1.2 }}>
                  <div>
                    <Text strong style={{ fontSize: 16 }}>
                      {portfolio.name}
                    </Text>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <Tag
                      color={getRiskColor(portfolio.riskLevel)}
                      style={{ fontSize: 11 }}
                    >
                      {portfolio.riskLevel} Risk
                    </Tag>
                  </div>
                </div>
              }
              extra={
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Updated:{" "}
                  {new Date(portfolio.lastUpdated).toLocaleTimeString()}
                </Text>
              }
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                {/* Portfolio Value */}
                <div>
                  <Text type="secondary">Portfolio Value</Text>
                  <div>
                    <Text strong style={{ fontSize: 20 }}>
                      {formatCurrency(portfolio.totalValue)}
                    </Text>
                  </div>
                </div>

                {/* Performance Metrics */}
                <Row gutter={16}>
                  <Col span={12}>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Total Return
                      </Text>
                      <div>
                        <Text
                          style={{
                            color:
                              portfolio.totalReturn >= 0
                                ? "#4caf50"
                                : "#d6002a",
                            fontWeight: 500,
                          }}
                        >
                          {formatCurrency(portfolio.totalReturn)}
                        </Text>
                      </div>
                      <Text
                        style={{
                          color:
                            portfolio.totalReturn >= 0 ? "#4caf50" : "#d6002a",
                          fontSize: 12,
                        }}
                      >
                        {formatPercent(portfolio.totalReturnPercent)}
                      </Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Day Change
                      </Text>
                      <div>
                        <Text
                          style={{
                            color:
                              portfolio.dayChange >= 0 ? "#4caf50" : "#d6002a",
                            fontWeight: 500,
                          }}
                        >
                          {formatCurrency(portfolio.dayChange)}
                        </Text>
                      </div>
                      <Text
                        style={{
                          color:
                            portfolio.dayChange >= 0 ? "#4caf50" : "#d6002a",
                          fontSize: 12,
                        }}
                      >
                        {formatPercent(portfolio.dayChangePercent)}
                      </Text>
                    </div>
                  </Col>
                </Row>

                {/* Performance Bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Performance
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      {formatPercent(portfolio.totalReturnPercent)}
                    </Text>
                  </div>
                  <Progress
                    percent={Math.min(
                      Math.abs(portfolio.totalReturnPercent) * 10,
                      100
                    )}
                    strokeColor={
                      portfolio.totalReturnPercent >= 0 ? "#4caf50" : "#d6002a"
                    }
                    showInfo={false}
                    size="small"
                  />
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PortfolioOverview;
