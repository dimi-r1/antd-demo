import React from "react";
import { ColorPicker, InputNumber, Input, Select } from "antd";
import type { Color } from "antd/es/color-picker";

type ThemeTokenValue = string | number;

interface FormFieldProps {
  property: {
    key: string;
    label: string;
    type: "color" | "number" | "string" | "select";
    description?: string;
    options?: { label: string; value: string | number }[];
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  };
  value: ThemeTokenValue;
  onChange: (value: ThemeTokenValue) => void;
}

export const ThemeFormField: React.FC<FormFieldProps> = ({
  property,
  value,
  onChange,
}) => {
  const handleColorChange = (color: Color) => {
    onChange(color.toHexString());
  };

  switch (property.type) {
    case "color":
      return (
        <ColorPicker
          value={value as string}
          onChange={handleColorChange}
          size="small"
          showText
          style={{ width: "100%" }}
        />
      );
    case "number":
      return (
        <InputNumber
          value={value as number}
          onChange={(val) => onChange(val ?? 0)}
          size="small"
          min={property.min}
          max={property.max}
          step={property.step}
          style={{ width: "100%" }}
          addonAfter={property.unit}
        />
      );
    case "string":
      return (
        <Input
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          size="small"
          style={{ width: "100%" }}
        />
      );
    case "select":
      return (
        <Select
          value={value}
          onChange={onChange}
          size="small"
          style={{ width: "100%" }}
          options={property.options}
        />
      );
    default:
      return null;
  }
};
