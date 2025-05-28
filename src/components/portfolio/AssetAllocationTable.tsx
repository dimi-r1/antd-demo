import { useState } from "react";
import {
  Table,
  Tag,
  Progress,
  Space,
  Button,
  Typography,
  Dropdown,
  Input,
  Select,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoreOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Asset } from "../../types/financial";

const { Text } = Typography;
const { Search } = Input;

interface AssetAllocationTableProps {
  assets: Asset[];
  onTradeClick: (asset: Asset) => void;
}

const AssetAllocationTable = ({
  assets,
  onTradeClick,
}: AssetAllocationTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filteredAssets, setFilteredAssets] = useState(assets);

  // Filter assets based on search and type filter
  const handleSearch = (value: string) => {
    setSearchText(value);
    filterAssets(value, filterType);
  };

  const handleTypeFilter = (value: string) => {
    setFilterType(value);
    filterAssets(searchText, value);
  };

  const filterAssets = (search: string, type: string) => {
    let filtered = assets;

    if (search) {
      filtered = filtered.filter(
        (asset) =>
          asset.symbol.toLowerCase().includes(search.toLowerCase()) ||
          asset.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter((asset) => asset.type === type);
    }

    setFilteredAssets(filtered);
  };

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

  const getTypeColor = (type: Asset["type"]): string => {
    switch (type) {
      case "Stock":
        return "blue";
      case "ETF":
        return "green";
      case "Bond":
        return "orange";
      case "Crypto":
        return "purple";
      case "Real Estate":
        return "brown";
      default:
        return "default";
    }
  };

  const actionMenuItems = (asset: Asset) => [
    {
      key: "trade",
      label: "Execute Trade",
      onClick: () => onTradeClick(asset),
    },
    {
      key: "analyze",
      label: "View Analysis",
    },
    {
      key: "alerts",
      label: "Set Price Alert",
    },
    {
      type: "divider" as const,
    },
    {
      key: "remove",
      label: "Remove from Portfolio",
      danger: true,
    },
  ];

  const columns: ColumnsType<Asset> = [
    {
      title: "Asset",
      key: "asset",
      fixed: "left",
      width: 200,
      render: (_, asset) => (
        <Space direction="vertical" size={0}>
          <Space>
            <Text strong>{asset.symbol}</Text>
            <Tag color={getTypeColor(asset.type)}>{asset.type}</Tag>
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {asset.name}
          </Text>
        </Space>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      render: (quantity: number) => <Text>{quantity.toLocaleString()}</Text>,
    },
    {
      title: "Avg Price",
      dataIndex: "avgPrice",
      key: "avgPrice",
      width: 120,
      render: (price: number) => <Text>{formatCurrency(price)}</Text>,
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      width: 120,
      render: (price: number) => <Text>{formatCurrency(price)}</Text>,
    },
    {
      title: "Market Value",
      dataIndex: "marketValue",
      key: "marketValue",
      width: 140,
      sorter: (a, b) => a.marketValue - b.marketValue,
      render: (value: number) => <Text strong>{formatCurrency(value)}</Text>,
    },
    {
      title: "Day Change",
      key: "dayChange",
      width: 120,
      sorter: (a, b) => a.dayChangePercent - b.dayChangePercent,
      render: (_, asset) => (
        <Space direction="vertical" size={0}>
          <Text style={{ color: asset.dayChange >= 0 ? "#4caf50" : "#d6002a" }}>
            {formatCurrency(asset.dayChange)}
          </Text>
          <Text
            style={{
              color: asset.dayChange >= 0 ? "#4caf50" : "#d6002a",
              fontSize: 12,
            }}
          >
            {asset.dayChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{" "}
            {formatPercent(asset.dayChangePercent)}
          </Text>
        </Space>
      ),
    },
    {
      title: "Total Return",
      key: "totalReturn",
      width: 120,
      sorter: (a, b) => a.totalReturnPercent - b.totalReturnPercent,
      render: (_, asset) => (
        <Space direction="vertical" size={0}>
          <Text
            style={{ color: asset.totalReturn >= 0 ? "#4caf50" : "#d6002a" }}
          >
            {formatCurrency(asset.totalReturn)}
          </Text>
          <Text
            style={{
              color: asset.totalReturn >= 0 ? "#4caf50" : "#d6002a",
              fontSize: 12,
            }}
          >
            {formatPercent(asset.totalReturnPercent)}
          </Text>
        </Space>
      ),
    },
    {
      title: "Allocation",
      dataIndex: "allocation",
      key: "allocation",
      width: 120,
      sorter: (a, b) => a.allocation - b.allocation,
      render: (allocation: number) => (
        <Space direction="vertical" style={{ width: "100%" }} size={4}>
          <Text>{allocation.toFixed(1)}%</Text>
          <Progress
            percent={allocation}
            showInfo={false}
            size="small"
            strokeColor="#d6002a"
          />
        </Space>
      ),
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      width: 120,
      filters: [
        { text: "Technology", value: "Technology" },
        { text: "Healthcare", value: "Healthcare" },
        { text: "Financial", value: "Financial" },
        { text: "Real Estate", value: "Real Estate" },
        { text: "Diversified", value: "Diversified" },
      ],
      onFilter: (value, record) => record.sector === value,
      render: (sector: string) => <Text type="secondary">{sector}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 80,
      render: (_, asset) => (
        <Dropdown
          menu={{ items: actionMenuItems(asset) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {/* Filter and Search Controls */}
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Search
            placeholder="Search assets..."
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
            suffixIcon={<FilterOutlined />}
          >
            <Select.Option value="all">All Types</Select.Option>
            <Select.Option value="Stock">Stocks</Select.Option>
            <Select.Option value="ETF">ETFs</Select.Option>
            <Select.Option value="Bond">Bonds</Select.Option>
            <Select.Option value="Crypto">Crypto</Select.Option>
            <Select.Option value="Real Estate">Real Estate</Select.Option>
          </Select>
        </Space>
        <Button type="primary" onClick={() => onTradeClick(assets[0])}>
          New Trade
        </Button>
      </Space>

      {/* Assets Table */}
      <Table
        columns={columns}
        dataSource={filteredAssets}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} assets`,
        }}
        size="middle"
      />
    </div>
  );
};

export default AssetAllocationTable;
