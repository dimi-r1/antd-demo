import { useState } from "react";
import {
  Modal,
  Form,
  Select,
  InputNumber,
  Input,
  Radio,
  Space,
  Typography,
  Card,
  Divider,
  Alert,
  Button,
  Row,
  Col,
} from "antd";
import { DollarOutlined, StockOutlined } from "@ant-design/icons";
import type { Asset } from "../../types/financial";

const { Text, Title } = Typography;
const { TextArea } = Input;

interface TradeModalProps {
  visible: boolean;
  onClose: () => void;
  asset?: Asset;
  onSubmit: (tradeData: TradeFormData) => void;
}

interface TradeFormData {
  type: "Buy" | "Sell";
  symbol: string;
  quantity: number;
  orderType: "Market" | "Limit" | "Stop";
  limitPrice?: number;
  stopPrice?: number;
  timeInForce: "Day" | "GTC" | "IOC";
  notes?: string;
}

const TradeModal = ({ visible, onClose, asset, onSubmit }: TradeModalProps) => {
  const [form] = Form.useForm();
  const [tradeType, setTradeType] = useState<"Buy" | "Sell">("Buy");
  const [orderType, setOrderType] = useState<"Market" | "Limit" | "Stop">(
    "Market"
  );
  const [quantity, setQuantity] = useState<number>(0);
  const [limitPrice, setLimitPrice] = useState<number>(
    asset?.currentPrice || 0
  );

  const handleSubmit = (values: TradeFormData) => {
    const tradeData: TradeFormData = {
      ...values,
      type: tradeType,
      orderType,
      symbol: asset?.symbol || "",
    };
    onSubmit(tradeData);
    form.resetFields();
    onClose();
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const estimatedValue =
    quantity * (orderType === "Market" ? asset?.currentPrice || 0 : limitPrice);
  const estimatedFees = estimatedValue * 0.001; // 0.1% fee estimate

  const maxSellQuantity = asset?.quantity || 0;

  return (
    <Modal
      title={
        <Space>
          <StockOutlined />
          <span>Execute Trade - {asset?.symbol}</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={700}
      footer={null}
    >
      {asset && (
        <div>
          {/* Asset Information Header */}
          <Card size="small" style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Space direction="vertical" size={0}>
                  <Text type="secondary">Current Price</Text>
                  <Title level={4} style={{ margin: 0 }}>
                    {formatCurrency(asset.currentPrice)}
                  </Title>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size={0}>
                  <Text type="secondary">Current Holdings</Text>
                  <Title level={4} style={{ margin: 0 }}>
                    {asset.quantity.toLocaleString()} shares
                  </Title>
                </Space>
              </Col>
            </Row>
          </Card>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              timeInForce: "Day",
              limitPrice: asset.currentPrice,
            }}
          >
            {/* Trade Type */}
            <Form.Item label="Trade Type" name="type">
              <Radio.Group
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value)}
                size="large"
              >
                <Radio.Button value="Buy">Buy</Radio.Button>
                <Radio.Button value="Sell">Sell</Radio.Button>
              </Radio.Group>
            </Form.Item>

            {/* Order Type */}
            <Form.Item label="Order Type" name="orderType">
              <Radio.Group
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <Radio.Button value="Market">Market</Radio.Button>
                <Radio.Button value="Limit">Limit</Radio.Button>
                <Radio.Button value="Stop">Stop</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Row gutter={16}>
              {/* Quantity */}
              <Col span={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    { required: true, message: "Please enter quantity" },
                    {
                      type: "number",
                      min: 1,
                      message: "Quantity must be at least 1",
                    },
                    ...(tradeType === "Sell"
                      ? [
                          {
                            type: "number" as const,
                            max: maxSellQuantity,
                            message: `Cannot sell more than ${maxSellQuantity} shares`,
                          },
                        ]
                      : []),
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter quantity"
                    min={1}
                    max={tradeType === "Sell" ? maxSellQuantity : undefined}
                    onChange={(value) => setQuantity(value || 0)}
                  />
                </Form.Item>
              </Col>

              {/* Limit/Stop Price */}
              {orderType !== "Market" && (
                <Col span={12}>
                  <Form.Item
                    label={orderType === "Limit" ? "Limit Price" : "Stop Price"}
                    name={orderType === "Limit" ? "limitPrice" : "stopPrice"}
                    rules={[
                      {
                        required: true,
                        message: `Please enter ${orderType.toLowerCase()} price`,
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder={`Enter ${orderType.toLowerCase()} price`}
                      min={0.01}
                      step={0.01}
                      prefix="$"
                      onChange={(value) => {
                        if (orderType === "Limit") {
                          setLimitPrice(value || 0);
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>

            {/* Time in Force */}
            <Form.Item label="Time in Force" name="timeInForce">
              <Select>
                <Select.Option value="Day">Day Order</Select.Option>
                <Select.Option value="GTC">Good Till Canceled</Select.Option>
                <Select.Option value="IOC">Immediate or Cancel</Select.Option>
              </Select>
            </Form.Item>

            {/* Order Summary */}
            {quantity > 0 && (
              <>
                <Divider>Order Summary</Divider>
                <Card size="small" style={{ backgroundColor: "#fafafa" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Row justify="space-between">
                      <Text>Estimated Value:</Text>
                      <Text strong>{formatCurrency(estimatedValue)}</Text>
                    </Row>
                    <Row justify="space-between">
                      <Text>Estimated Fees:</Text>
                      <Text>{formatCurrency(estimatedFees)}</Text>
                    </Row>
                    <Divider style={{ margin: "8px 0" }} />
                    <Row justify="space-between">
                      <Text strong>
                        Total {tradeType === "Buy" ? "Cost" : "Proceeds"}:
                      </Text>
                      <Text strong>
                        {formatCurrency(
                          tradeType === "Buy"
                            ? estimatedValue + estimatedFees
                            : estimatedValue - estimatedFees
                        )}
                      </Text>
                    </Row>
                  </Space>
                </Card>
              </>
            )}

            {/* Notes */}
            <Form.Item label="Notes (Optional)" name="notes">
              <TextArea
                rows={3}
                placeholder="Add any notes about this trade..."
              />
            </Form.Item>

            {/* Warnings */}
            {tradeType === "Sell" && quantity > maxSellQuantity && (
              <Alert
                type="error"
                message="Insufficient Holdings"
                description={`You can only sell up to ${maxSellQuantity} shares of ${asset.symbol}.`}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            {orderType === "Market" && (
              <Alert
                type="info"
                message="Market Order"
                description="This order will execute immediately at the current market price."
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            {/* Action Buttons */}
            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<DollarOutlined />}
                  disabled={tradeType === "Sell" && quantity > maxSellQuantity}
                >
                  {tradeType === "Buy" ? "Buy" : "Sell"} {asset.symbol}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default TradeModal;
