import { useState } from "react";
import {
  Table,
  Tag,
  Space,
  DatePicker,
  Select,
  Input,
  Typography,
  Statistic,
  Row,
  Col,
  Card,
} from "antd";
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SwapOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Transaction } from "../../types/financial";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Text, Title } = Typography;

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, filterType, dateRange);
  };

  const handleTypeFilter = (value: string) => {
    setFilterType(value);
    applyFilters(searchText, value, dateRange);
  };

  const handleDateFilter = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    setDateRange(dates);
    applyFilters(searchText, filterType, dates);
  };

  const applyFilters = (
    search: string,
    type: string,
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    let filtered = transactions;

    if (search) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.symbol.toLowerCase().includes(search.toLowerCase()) ||
          transaction.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter((transaction) => transaction.type === type);
    }

    if (dates && dates[0] && dates[1]) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = dayjs(transaction.date);
        return (
          transactionDate.isAfter(dates[0], "day") &&
          transactionDate.isBefore(dates[1], "day")
        );
      });
    }

    setFilteredTransactions(filtered);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "Buy":
        return <ArrowDownOutlined style={{ color: "#d6002a" }} />;
      case "Sell":
        return <ArrowUpOutlined style={{ color: "#4caf50" }} />;
      case "Dividend":
        return <DollarOutlined style={{ color: "#4caf50" }} />;
      case "Transfer":
        return <SwapOutlined style={{ color: "#2196f3" }} />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: Transaction["type"]): string => {
    switch (type) {
      case "Buy":
        return "red";
      case "Sell":
        return "green";
      case "Dividend":
        return "blue";
      case "Transfer":
        return "orange";
      default:
        return "default";
    }
  };

  // Calculate summary statistics
  const totalBuys = filteredTransactions
    .filter((t) => t.type === "Buy")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSells = filteredTransactions
    .filter((t) => t.type === "Sell")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDividends = filteredTransactions
    .filter((t) => t.type === "Dividend")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalFees = filteredTransactions.reduce((sum, t) => sum + t.fee, 0);

  const columns: ColumnsType<Transaction> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      defaultSortOrder: "descend",
      render: (date: string) => (
        <Text>{dayjs(date).format("MMM DD, YYYY")}</Text>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      filters: [
        { text: "Buy", value: "Buy" },
        { text: "Sell", value: "Sell" },
        { text: "Dividend", value: "Dividend" },
        { text: "Transfer", value: "Transfer" },
      ],
      onFilter: (value, record) => record.type === value,
      render: (type: Transaction["type"]) => (
        <Space>
          {getTypeIcon(type)}
          <Tag color={getTypeColor(type)}>{type}</Tag>
        </Space>
      ),
    },
    {
      title: "Security",
      key: "security",
      width: 200,
      render: (_, transaction) => (
        <Space direction="vertical" size={0}>
          <Text strong>{transaction.symbol}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {transaction.name}
          </Text>
        </Space>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      align: "right",
      render: (quantity: number, record) => (
        <Text>
          {record.type === "Dividend" ? "-" : quantity.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "right",
      render: (price: number) => <Text>{formatCurrency(price)}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 140,
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number, record) => (
        <Text
          style={{
            color:
              record.type === "Buy"
                ? "#d6002a"
                : record.type === "Sell" || record.type === "Dividend"
                ? "#4caf50"
                : "#2196f3",
            fontWeight: 500,
          }}
        >
          {record.type === "Buy" ? "-" : "+"}
          {formatCurrency(amount)}
        </Text>
      ),
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      width: 100,
      align: "right",
      render: (fee: number) => (
        <Text type="secondary">{fee > 0 ? formatCurrency(fee) : "-"}</Text>
      ),
    },
    {
      title: "Net Amount",
      key: "netAmount",
      width: 140,
      align: "right",
      render: (_, record) => {
        const netAmount =
          record.type === "Buy"
            ? -(record.amount + record.fee)
            : record.amount - record.fee;

        return (
          <Text
            strong
            style={{
              color: netAmount >= 0 ? "#4caf50" : "#d6002a",
            }}
          >
            {netAmount >= 0 ? "+" : ""}
            {formatCurrency(netAmount)}
          </Text>
        );
      },
    },
  ];

  return (
    <div>
      <Title level={3}>Transaction History</Title>

      {/* Summary Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Purchases"
              value={totalBuys}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#d6002a" }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={totalSells}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#4caf50" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Dividends"
              value={totalDividends}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#2196f3" }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Fees"
              value={totalFees}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#757575" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filter Controls */}
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space wrap>
          <Search
            placeholder="Search by symbol or name..."
            allowClear
            style={{ width: 250 }}
            onSearch={handleSearch}
            prefix={<SearchOutlined />}
          />
          <Select
            value={filterType}
            onChange={handleTypeFilter}
            style={{ width: 150 }}
            placeholder="Filter by type"
          >
            <Select.Option value="all">All Types</Select.Option>
            <Select.Option value="Buy">Buy Orders</Select.Option>
            <Select.Option value="Sell">Sell Orders</Select.Option>
            <Select.Option value="Dividend">Dividends</Select.Option>
            <Select.Option value="Transfer">Transfers</Select.Option>
          </Select>
          <RangePicker
            onChange={handleDateFilter}
            placeholder={["Start Date", "End Date"]}
            style={{ width: 250 }}
          />
        </Space>
      </Space>

      {/* Transactions Table */}
      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="id"
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} transactions`,
        }}
        scroll={{ x: 1000 }}
        size="middle"
      />
    </div>
  );
};

export default TransactionHistory;
