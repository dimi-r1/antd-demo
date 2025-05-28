import {
  Table,
  Typography,
  Space,
  Tag,
  Progress,
  Tooltip,
  Card,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  InfoCircleOutlined,
  RiseOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SecurityMetrics } from "../../types/financial";

const { Text, Title } = Typography;

interface SecurityMetricsTableProps {
  securities: SecurityMetrics[];
}

const SecurityMetricsTable = ({ securities }: SecurityMetricsTableProps) => {
  const formatCurrency = (value: number): string => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const getRatioColor = (
    value: number,
    good: number,
    warning: number
  ): string => {
    if (value <= good) return "#4caf50";
    if (value <= warning) return "#ff9800";
    return "#d6002a";
  };

  const getROEColor = (roe: number): string => {
    if (roe >= 20) return "#4caf50";
    if (roe >= 15) return "#ff9800";
    return "#d6002a";
  };

  // Calculate aggregate metrics
  const avgPE =
    securities.reduce((sum, s) => sum + s.pe, 0) / securities.length;
  const avgROE =
    securities.reduce((sum, s) => sum + s.roe, 0) / securities.length;
  const totalMarketCap = securities.reduce((sum, s) => sum + s.marketCap, 0);
  const totalRevenue = securities.reduce((sum, s) => sum + s.totalRevenue, 0);

  const columns: ColumnsType<SecurityMetrics> = [
    {
      title: "Security",
      key: "security",
      fixed: "left",
      width: 180,
      render: (_, security) => (
        <Space direction="vertical" size={0}>
          <Text strong>{security.symbol}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {security.name}
          </Text>
          <Tag color="blue" style={{ fontSize: 10 }}>
            {security.sector}
          </Tag>
        </Space>
      ),
    },
    {
      title: (
        <Space>
          Market Cap
          <Tooltip title="Total market capitalization">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "marketCap",
      key: "marketCap",
      width: 120,
      sorter: (a, b) => a.marketCap - b.marketCap,
      render: (value: number) => <Text strong>{formatCurrency(value)}</Text>,
    },
    {
      title: (
        <Space>
          Revenue
          <Tooltip title="Total annual revenue">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      width: 120,
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
      render: (value: number) => <Text>{formatCurrency(value)}</Text>,
    },
    {
      title: (
        <Space>
          EBITDA
          <Tooltip title="Earnings Before Interest, Taxes, Depreciation, and Amortization">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "ebitda",
      key: "ebitda",
      width: 120,
      sorter: (a, b) => a.ebitda - b.ebitda,
      render: (value: number) => <Text>{formatCurrency(value)}</Text>,
    },
    {
      title: (
        <Space>
          TEV
          <Tooltip title="Total Enterprise Value">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "tev",
      key: "tev",
      width: 120,
      sorter: (a, b) => a.tev - b.tev,
      render: (value: number) => <Text>{formatCurrency(value)}</Text>,
    },
    {
      title: (
        <Space>
          P/E Ratio
          <Tooltip title="Price-to-Earnings Ratio">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "pe",
      key: "pe",
      width: 100,
      sorter: (a, b) => a.pe - b.pe,
      render: (value: number) => (
        <Text style={{ color: getRatioColor(value, 15, 25) }}>
          {value.toFixed(1)}x
        </Text>
      ),
    },
    {
      title: (
        <Space>
          P/B Ratio
          <Tooltip title="Price-to-Book Ratio">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "pb",
      key: "pb",
      width: 100,
      sorter: (a, b) => a.pb - b.pb,
      render: (value: number) => (
        <Text style={{ color: getRatioColor(value, 3, 5) }}>
          {value.toFixed(1)}x
        </Text>
      ),
    },
    {
      title: (
        <Space>
          ROE
          <Tooltip title="Return on Equity">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "roe",
      key: "roe",
      width: 120,
      sorter: (a, b) => a.roe - b.roe,
      render: (value: number) => (
        <Space direction="vertical" size={0} style={{ width: "100%" }}>
          <Text style={{ color: getROEColor(value) }}>
            {formatPercent(value)}
          </Text>
          <Progress
            percent={Math.min(value, 50) * 2}
            showInfo={false}
            size="small"
            strokeColor={getROEColor(value)}
          />
        </Space>
      ),
    },
    {
      title: (
        <Space>
          D/E Ratio
          <Tooltip title="Debt-to-Equity Ratio">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "debtToEquity",
      key: "debtToEquity",
      width: 100,
      sorter: (a, b) => a.debtToEquity - b.debtToEquity,
      render: (value: number) => (
        <Text style={{ color: getRatioColor(value, 50, 100) }}>
          {formatPercent(value)}
        </Text>
      ),
    },
    {
      title: (
        <Space>
          Current Ratio
          <Tooltip title="Current Assets / Current Liabilities">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: "currentRatio",
      key: "currentRatio",
      width: 120,
      sorter: (a, b) => a.currentRatio - b.currentRatio,
      render: (value: number) => {
        const color =
          value >= 2.0 ? "#4caf50" : value >= 1.0 ? "#ff9800" : "#d6002a";
        return <Text style={{ color }}>{value.toFixed(2)}x</Text>;
      },
    },
  ];

  return (
    <div>
      <Title level={3}>Securities Financial Analysis</Title>

      {/* Summary Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Market Cap"
              value={totalMarketCap}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#212121" }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#212121" }}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg P/E Ratio"
              value={avgPE}
              precision={1}
              valueStyle={{ color: getRatioColor(avgPE, 15, 25) }}
              suffix="x"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg ROE"
              value={avgROE}
              precision={1}
              valueStyle={{ color: getROEColor(avgROE) }}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Metrics Table */}
      <Table
        columns={columns}
        dataSource={securities}
        rowKey="symbol"
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} securities`,
        }}
        size="middle"
      />

      {/* Legend */}
      <Card size="small" style={{ marginTop: 16 }}>
        <Space wrap>
          <Text type="secondary">Legend:</Text>
          <Tag color="#4caf50">Good</Tag>
          <Tag color="#ff9800">Warning</Tag>
          <Tag color="#d6002a">Poor</Tag>
          <Text type="secondary" style={{ fontSize: 12 }}>
            • P/E: Good ≤15, Warning ≤25 • P/B: Good ≤3, Warning ≤5 • ROE: Good
            ≥20%, Warning ≥15% • D/E: Good ≤50%, Warning ≤100% • Current Ratio:
            Good ≥2.0, Warning ≥1.0
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default SecurityMetricsTable;
