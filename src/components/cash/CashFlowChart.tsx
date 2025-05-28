import {
  Card,
  Table,
  Typography,
  Space,
  Progress,
  Tag,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { CashFlow } from "../../types/financial";

const { Text, Title } = Typography;

interface CashFlowChartProps {
  cashFlows: CashFlow[];
}

const CashFlowChart = ({ cashFlows }: CashFlowChartProps) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate totals
  const totalInflow = cashFlows.reduce((sum, cf) => sum + cf.inflow, 0);
  const totalOutflow = cashFlows.reduce((sum, cf) => sum + cf.outflow, 0);
  const totalNetFlow = cashFlows.reduce((sum, cf) => sum + cf.netFlow, 0);

  const columns: ColumnsType<CashFlow> = [
    {
      title: "Period",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (date: string) => <Text strong>{date}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Inflow",
      dataIndex: "inflow",
      key: "inflow",
      width: 140,
      align: "right",
      render: (inflow: number) => (
        <Space>
          <ArrowUpOutlined style={{ color: "#4caf50" }} />
          <Text style={{ color: "#4caf50", fontWeight: 500 }}>
            {formatCurrency(inflow)}
          </Text>
        </Space>
      ),
    },
    {
      title: "Outflow",
      dataIndex: "outflow",
      key: "outflow",
      width: 140,
      align: "right",
      render: (outflow: number) => (
        <Space>
          <ArrowDownOutlined style={{ color: "#d6002a" }} />
          <Text style={{ color: "#d6002a", fontWeight: 500 }}>
            {formatCurrency(outflow)}
          </Text>
        </Space>
      ),
    },
    {
      title: "Net Flow",
      dataIndex: "netFlow",
      key: "netFlow",
      width: 140,
      align: "right",
      render: (netFlow: number) => (
        <Text
          strong
          style={{
            color: netFlow >= 0 ? "#4caf50" : "#d6002a",
          }}
        >
          {netFlow >= 0 ? "+" : ""}
          {formatCurrency(netFlow)}
        </Text>
      ),
    },
    {
      title: "Flow Ratio",
      key: "flowRatio",
      width: 180,
      render: (_, record) => {
        const ratio =
          record.outflow > 0 ? (record.inflow / record.outflow) * 100 : 100;
        const color =
          ratio >= 120 ? "#4caf50" : ratio >= 100 ? "#ff9800" : "#d6002a";

        return (
          <Space direction="vertical" style={{ width: "100%" }} size={4}>
            <Text style={{ fontSize: 12 }}>
              Inflow/Outflow: {ratio.toFixed(1)}%
            </Text>
            <Progress
              percent={Math.min(ratio, 200) / 2}
              strokeColor={color}
              showInfo={false}
              size="small"
            />
          </Space>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (description: string) => (
        <Text type="secondary">{description}</Text>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Cash Flow Management</Title>

      {/* Summary Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Inflow"
              value={totalInflow}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#4caf50" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Outflow"
              value={totalOutflow}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#d6002a" }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Net Cash Flow"
              value={totalNetFlow}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: totalNetFlow >= 0 ? "#4caf50" : "#d6002a" }}
              prefix={
                totalNetFlow >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Flow Efficiency"
              value={
                totalOutflow > 0 ? (totalInflow / totalOutflow) * 100 : 100
              }
              precision={1}
              valueStyle={{
                color:
                  totalOutflow > 0 && totalInflow / totalOutflow >= 1.2
                    ? "#4caf50"
                    : totalOutflow > 0 && totalInflow / totalOutflow >= 1.0
                    ? "#ff9800"
                    : "#d6002a",
              }}
              suffix="%"
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Cash Flow Table */}
      <Card title="Cash Flow History" size="small">
        <Table
          columns={columns}
          dataSource={cashFlows}
          rowKey="date"
          pagination={false}
          size="middle"
          scroll={{ x: 900 }}
        />
      </Card>

      {/* Cash Flow Analysis */}
      <Card title="Cash Flow Analysis" style={{ marginTop: 16 }} size="small">
        <Row gutter={16}>
          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Liquidity Status</Text>
              <Progress
                percent={
                  totalNetFlow > 0
                    ? 100
                    : Math.max(
                        0,
                        100 + (totalNetFlow / Math.abs(totalOutflow)) * 100
                      )
                }
                strokeColor={totalNetFlow > 0 ? "#4caf50" : "#d6002a"}
                format={() => (totalNetFlow > 0 ? "Positive" : "Negative")}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Cash Flow Trend</Text>
              <Space>
                {totalNetFlow > 0 ? (
                  <Tag color="green" icon={<ArrowUpOutlined />}>
                    Improving
                  </Tag>
                ) : (
                  <Tag color="red" icon={<ArrowDownOutlined />}>
                    Declining
                  </Tag>
                )}
                <Text type="secondary">
                  {totalNetFlow > 0
                    ? "Strong cash generation"
                    : "Cash outflow concern"}
                </Text>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CashFlowChart;
