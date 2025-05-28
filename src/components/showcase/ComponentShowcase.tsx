import React from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Select,
  DatePicker,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Rate,
  Upload,
  Progress,
  Tag,
  Badge,
  Avatar,
  Tooltip,
  Popover,
  Modal,
  Alert,
  message,
  notification,
  Table,
  Tabs,
  Menu,
  Breadcrumb,
  Steps,
  Timeline,
  Collapse,
  Tree,
  Transfer,
  Typography,
  Space,
  Divider,
  Statistic,
  Empty,
  Spin,
  Dropdown,
  TimePicker,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  BellOutlined,
  HeartOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { DataNode } from "antd/es/tree";

interface TableData {
  key: string;
  name: string;
  age: number;
  address: string;
}

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Step } = Steps;

const ComponentShowcase: React.FC = () => {
  // Sample data for tables
  const tableColumns: ColumnsType<TableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small">
            Edit
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const tableData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
    { key: "3", name: "Joe Black", age: 32, address: "Sidney No. 1 Lake Park" },
  ];

  // Tree data
  const treeData: DataNode[] = [
    {
      title: "Parent 1",
      key: "0-0",
      children: [
        { title: "Child 1-1", key: "0-0-0" },
        { title: "Child 1-2", key: "0-0-1" },
      ],
    },
    {
      title: "Parent 2",
      key: "0-1",
      children: [
        { title: "Child 2-1", key: "0-1-0" },
        { title: "Child 2-2", key: "0-1-1" },
      ],
    },
  ];

  const showMessage = () => {
    message.success("This is a success message");
  };

  const showNotification = () => {
    notification.info({
      message: "Notification Title",
      description: "This is the content of the notification.",
    });
  };

  const showModal = () => {
    Modal.info({
      title: "Modal Title",
      content: "This is a modal dialog example.",
    });
  };

  const menuItems = [
    { key: "1", label: "Option 1", icon: <SettingOutlined /> },
    { key: "2", label: "Option 2", icon: <UserOutlined /> },
    { key: "3", label: "Option 3", icon: <BellOutlined /> },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header with Theme Toggle */}
      <Card style={{ marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Component Showcase
          </Title>
        </div>
        <Paragraph style={{ marginTop: 16, marginBottom: 0 }}>
          This showcase demonstrates how our custom theme overrides affect all
          Ant Design components. Use the theme toggle in the header to switch
          between the red financial theme and green success theme to see the
          differences.
        </Paragraph>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Buttons & Actions */}
        <Col xs={24} lg={12}>
          <Card title="Buttons & Actions" size="small">
            <Space wrap>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="text">Text</Button>
              <Button type="link">Link</Button>
              <Button danger>Danger</Button>
              <Button type="primary" loading>
                Loading
              </Button>
              <Button type="primary" icon={<PlusOutlined />}>
                With Icon
              </Button>
            </Space>
            <Divider />
            <Space wrap>
              <Button size="large">Large</Button>
              <Button>Default</Button>
              <Button size="small">Small</Button>
            </Space>
          </Card>
        </Col>

        {/* Form Controls */}
        <Col xs={24} lg={12}>
          <Card title="Form Controls" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input placeholder="Input field" prefix={<UserOutlined />} />
              <Input.Password placeholder="Password field" />
              <TextArea rows={2} placeholder="Textarea" />
              <Select defaultValue="option1" style={{ width: "100%" }}>
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
              <DatePicker style={{ width: "100%" }} />
              <TimePicker style={{ width: "100%" }} />
            </Space>
          </Card>
        </Col>

        {/* Data Display */}
        <Col xs={24}>
          <Card title="Data Display" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Statistic title="Total Assets" value={1128450} prefix="$" />
                </Col>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Growth Rate"
                    value={11.28}
                    precision={2}
                    suffix="%"
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Statistic title="Active Users" value={93} suffix="/ 100" />
                </Col>
              </Row>

              <Progress percent={75} />
              <Progress percent={50} status="active" />
              <Progress percent={70} status="exception" />

              <Space wrap>
                <Tag>Default</Tag>
                <Tag color="success">Success</Tag>
                <Tag color="processing">Processing</Tag>
                <Tag color="error">Error</Tag>
                <Tag color="warning">Warning</Tag>
                <Tag color="default">Default</Tag>
              </Space>

              <Space wrap>
                <Badge count={5}>
                  <Avatar icon={<UserOutlined />} />
                </Badge>
                <Badge dot>
                  <Avatar icon={<UserOutlined />} />
                </Badge>
                <Badge count={999} overflowCount={99}>
                  <Avatar icon={<UserOutlined />} />
                </Badge>
              </Space>
            </Space>
          </Card>
        </Col>

        {/* Interactive Components */}
        <Col xs={24} lg={12}>
          <Card title="Interactive Components" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text>Switch: </Text>
                <Switch defaultChecked />
              </div>

              <div>
                <Text>Checkbox: </Text>
                <Checkbox.Group
                  options={["Option A", "Option B", "Option C"]}
                  defaultValue={["Option A"]}
                />
              </div>

              <div>
                <Text>Radio: </Text>
                <Radio.Group defaultValue="a">
                  <Radio value="a">A</Radio>
                  <Radio value="b">B</Radio>
                  <Radio value="c">C</Radio>
                </Radio.Group>
              </div>

              <div>
                <Text>Rate: </Text>
                <Rate defaultValue={3} />
              </div>

              <div>
                <Text>Slider: </Text>
                <Slider defaultValue={30} />
              </div>
            </Space>
          </Card>
        </Col>

        {/* Feedback */}
        <Col xs={24} lg={12}>
          <Card title="Feedback Components" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert message="Success Alert" type="success" showIcon closable />
              <Alert message="Info Alert" type="info" showIcon closable />
              <Alert message="Warning Alert" type="warning" showIcon closable />
              <Alert message="Error Alert" type="error" showIcon closable />

              <Space wrap>
                <Button onClick={showMessage}>Show Message</Button>
                <Button onClick={showNotification}>Show Notification</Button>
                <Button onClick={showModal}>Show Modal</Button>
              </Space>

              <div style={{ textAlign: "center", padding: 20 }}>
                <Spin size="large" />
              </div>
            </Space>
          </Card>
        </Col>

        {/* Navigation */}
        <Col xs={24} lg={12}>
          <Card title="Navigation" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Components</Breadcrumb.Item>
              </Breadcrumb>

              <Menu
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                items={menuItems}
              />

              <Steps current={1} size="small">
                <Step title="Finished" description="This is a description." />
                <Step
                  title="In Progress"
                  description="This is a description."
                />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </Space>
          </Card>
        </Col>

        {/* Data Entry */}
        <Col xs={24} lg={12}>
          <Card title="Data Entry" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>

              <Transfer
                dataSource={[
                  { key: "1", title: "Item 1" },
                  { key: "2", title: "Item 2" },
                  { key: "3", title: "Item 3" },
                ]}
                targetKeys={["2"]}
                render={(item) => item.title}
                style={{ marginBottom: 16 }}
              />
            </Space>
          </Card>
        </Col>

        {/* Complex Components */}
        <Col xs={24}>
          <Card title="Complex Components" size="small">
            <Tabs
              items={[
                {
                  key: "1",
                  label: "Table",
                  children: (
                    <Table
                      columns={tableColumns}
                      dataSource={tableData}
                      size="small"
                      pagination={{ pageSize: 3 }}
                    />
                  ),
                },
                {
                  key: "2",
                  label: "Tree",
                  children: (
                    <Tree
                      treeData={treeData}
                      defaultExpandedKeys={["0-0"]}
                      defaultSelectedKeys={["0-0-0"]}
                      checkable
                    />
                  ),
                },
                {
                  key: "3",
                  label: "Collapse",
                  children: (
                    <Collapse>
                      <Panel header="Panel 1" key="1">
                        <Paragraph>
                          A dog is a type of domesticated animal. Known for its
                          loyalty and faithfulness.
                        </Paragraph>
                      </Panel>
                      <Panel header="Panel 2" key="2">
                        <Paragraph>
                          A cat is a small, typically furry, carnivorous mammal.
                        </Paragraph>
                      </Panel>
                    </Collapse>
                  ),
                },
                {
                  key: "4",
                  label: "Timeline",
                  children: (
                    <Timeline>
                      <Timeline.Item color="green">
                        Create a services site 2015-09-01
                      </Timeline.Item>
                      <Timeline.Item color="green">
                        Solve initial network problems 2015-09-01
                      </Timeline.Item>
                      <Timeline.Item color="red">
                        <p>Solve network problems</p>
                        <p>2015-09-01</p>
                      </Timeline.Item>
                      <Timeline.Item>
                        <p>Network problems being solved</p>
                        <p>2015-09-01</p>
                      </Timeline.Item>
                    </Timeline>
                  ),
                },
              ]}
            />
          </Card>
        </Col>

        {/* Tooltips & Popovers */}
        <Col xs={24}>
          <Card title="Overlays & Others" size="small">
            <Space wrap>
              <Tooltip title="Tooltip text">
                <Button>Hover me</Button>
              </Tooltip>

              <Popover content="Popover content" title="Popover Title">
                <Button>Click me</Button>
              </Popover>

              <Dropdown
                menu={{
                  items: [
                    { key: "1", label: "Menu Item 1", icon: <EditOutlined /> },
                    {
                      key: "2",
                      label: "Menu Item 2",
                      icon: <DeleteOutlined />,
                    },
                    { type: "divider" },
                    {
                      key: "3",
                      label: "Menu Item 3",
                      icon: <SettingOutlined />,
                    },
                  ],
                }}
              >
                <Button>
                  Dropdown <DownOutlined />
                </Button>
              </Dropdown>

              <Button type="primary" shape="circle" icon={<HeartOutlined />} />
              <Button type="primary" shape="circle" icon={<StarOutlined />} />
              <Button type="primary" shape="circle" icon={<LikeOutlined />} />
              <Button
                type="primary"
                shape="circle"
                icon={<MessageOutlined />}
              />
            </Space>

            <Divider />

            <Empty description="No data available" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ComponentShowcase;
