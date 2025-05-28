import { TreeSelect, Typography, Space, Tag } from "antd";
import {
  TeamOutlined,
  BankOutlined,
  FolderOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { EntityRelationship } from "../../types/financial";

const { Text } = Typography;

interface TreeNodeData {
  title: React.ReactNode;
  value: string;
  key: string;
  children?: TreeNodeData[];
}

interface EntityTreeSelectProps {
  entities: EntityRelationship[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

const EntityTreeSelect = ({
  entities,
  value,
  onChange,
  placeholder = "Select entity...",
  style,
}: EntityTreeSelectProps) => {
  const getEntityIcon = (type: EntityRelationship["type"]) => {
    switch (type) {
      case "Fund":
        return <BankOutlined />;
      case "Company":
        return <TeamOutlined />;
      case "Division":
        return <FolderOutlined />;
      case "Portfolio":
        return <FolderOutlined />;
      case "Account":
        return <UserOutlined />;
      default:
        return <FolderOutlined />;
    }
  };

  const getEntityColor = (type: EntityRelationship["type"]): string => {
    switch (type) {
      case "Fund":
        return "purple";
      case "Company":
        return "blue";
      case "Division":
        return "orange";
      case "Portfolio":
        return "green";
      case "Account":
        return "cyan";
      default:
        return "default";
    }
  };

  const transformEntityToTreeNode = (
    entity: EntityRelationship
  ): TreeNodeData => {
    return {
      title: (
        <Space>
          {getEntityIcon(entity.type)}
          <Text>{entity.name}</Text>
          <Tag color={getEntityColor(entity.type)}>{entity.type}</Tag>
        </Space>
      ),
      value: entity.id,
      key: entity.id,
      children: entity.children?.map(transformEntityToTreeNode),
    };
  };

  const treeData = entities.map(transformEntityToTreeNode);

  return (
    <TreeSelect
      style={{ width: "100%", ...style }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      treeData={treeData}
      showSearch
      treeLine
      treeDefaultExpandAll
      allowClear
      filterTreeNode={(input, node) => {
        // Recursively find entity by ID in the tree
        const findEntityById = (
          entities: EntityRelationship[],
          id: string
        ): EntityRelationship | null => {
          for (const entity of entities) {
            if (entity.id === id) return entity;
            if (entity.children) {
              const found = findEntityById(entity.children, id);
              if (found) return found;
            }
          }
          return null;
        };

        const entityData = findEntityById(entities, node.value as string);
        return entityData
          ? entityData.name.toLowerCase().includes(input.toLowerCase())
          : false;
      }}
    />
  );
};

export default EntityTreeSelect;
