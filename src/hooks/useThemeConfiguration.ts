import React from "react";

export interface TokenGroup {
  title: string;
  description: string;
  icon: React.ReactNode;
  tokens: {
    key: string;
    label: string;
    type: "color" | "number" | "string" | "select";
    description?: string;
    options?: { label: string; value: string | number }[];
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  }[];
}

export interface ComponentGroup {
  title: string;
  description: string;
  component: string;
  properties: {
    key: string;
    label: string;
    type: "color" | "number" | "string" | "select";
    description?: string;
    options?: { label: string; value: string | number }[];
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  }[];
}

export const useThemeConfiguration = () => {
  const tokenGroups: TokenGroup[] = [
    {
      title: "Primary Colors",
      description: "Main brand colors used throughout the interface",
      icon: "🎨",
      tokens: [
        {
          key: "colorPrimary",
          label: "Primary Color",
          type: "color",
          description:
            "Main brand color used for primary actions and highlights",
        },
        {
          key: "colorSuccess",
          label: "Success Color",
          type: "color",
          description: "Color used for success states and positive feedback",
        },
        {
          key: "colorWarning",
          label: "Warning Color",
          type: "color",
          description: "Color used for warning states and caution indicators",
        },
        {
          key: "colorError",
          label: "Error Color",
          type: "color",
          description: "Color used for error states and destructive actions",
        },
        {
          key: "colorInfo",
          label: "Info Color",
          type: "color",
          description:
            "Color used for informational content and neutral actions",
        },
      ],
    },
    {
      title: "Typography",
      description: "Font settings and text appearance",
      icon: "📝",
      tokens: [
        {
          key: "fontFamily",
          label: "Font Family",
          type: "select",
          description: "Primary font family for all text content",
          options: [
            {
              label: "System Default",
              value:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
            },
            { label: "Inter", value: "'Inter', sans-serif" },
            { label: "Roboto", value: "'Roboto', sans-serif" },
            { label: "Open Sans", value: "'Open Sans', sans-serif" },
            { label: "Poppins", value: "'Poppins', sans-serif" },
            { label: "Montserrat", value: "'Montserrat', sans-serif" },
          ],
        },
        {
          key: "fontSize",
          label: "Base Font Size",
          type: "number",
          description: "Base font size for body text",
          min: 10,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "lineHeight",
          label: "Line Height",
          type: "number",
          description: "Default line height for text content",
          min: 1,
          max: 2.5,
          step: 0.1,
        },
      ],
    },
    {
      title: "Layout & Spacing",
      description: "Layout dimensions and spacing controls",
      icon: "⚙️",
      tokens: [
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "number",
          description: "Default border radius for components",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "sizeUnit",
          label: "Size Unit",
          type: "number",
          description: "Base unit for component sizing calculations",
          min: 2,
          max: 8,
          step: 1,
          unit: "px",
        },
        {
          key: "sizeStep",
          label: "Size Step",
          type: "number",
          description: "Step increment for size variations",
          min: 2,
          max: 8,
          step: 1,
          unit: "px",
        },
      ],
    },
  ];

  const componentGroups: ComponentGroup[] = [
    {
      title: "Button Styles",
      description: "Customize button appearance and behavior",
      component: "Button",
      properties: [
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "number",
          description: "Corner roundness of buttons",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "fontWeight",
          label: "Font Weight",
          type: "select",
          description: "Text weight of button labels",
          options: [
            { label: "Normal (400)", value: 400 },
            { label: "Medium (500)", value: 500 },
            { label: "Semi-bold (600)", value: 600 },
            { label: "Bold (700)", value: 700 },
          ],
        },
        {
          key: "controlHeight",
          label: "Default Height",
          type: "number",
          description: "Height of default size buttons",
          min: 24,
          max: 48,
          step: 2,
          unit: "px",
        },
        {
          key: "paddingContentHorizontal",
          label: "Horizontal Padding",
          type: "number",
          description: "Left and right padding inside buttons",
          min: 8,
          max: 32,
          step: 2,
          unit: "px",
        },
      ],
    },
    {
      title: "Input Components",
      description: "Form input styling and layout",
      component: "Input",
      properties: [
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "number",
          description: "Corner roundness of input fields",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "controlHeight",
          label: "Default Height",
          type: "number",
          description: "Height of default size inputs",
          min: 24,
          max: 48,
          step: 2,
          unit: "px",
        },
        {
          key: "paddingContentHorizontal",
          label: "Horizontal Padding",
          type: "number",
          description: "Left and right padding inside inputs",
          min: 6,
          max: 24,
          step: 2,
          unit: "px",
        },
      ],
    },
    {
      title: "Card Components",
      description: "Card container styling and spacing",
      component: "Card",
      properties: [
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "number",
          description: "Corner roundness of cards",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "paddingLG",
          label: "Content Padding",
          type: "number",
          description: "Inner padding of card content",
          min: 8,
          max: 48,
          step: 4,
          unit: "px",
        },
        {
          key: "headerBg",
          label: "Header Background",
          type: "color",
          description: "Background color of card headers",
        },
      ],
    },
    {
      title: "Table Components",
      description: "Data table appearance and layout",
      component: "Table",
      properties: [
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "number",
          description: "Corner roundness of tables",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "headerBg",
          label: "Header Background",
          type: "color",
          description: "Background color of table headers",
        },
        {
          key: "rowHoverBg",
          label: "Row Hover Color",
          type: "color",
          description: "Background color when hovering over rows",
        },
        {
          key: "headerSplitColor",
          label: "Header Border Color",
          type: "color",
          description: "Color of borders in table headers",
        },
      ],
    },
    {
      title: "Modal & Drawer",
      description: "Modal dialog and drawer panel styling",
      component: "Modal",
      properties: [
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "number",
          description: "Corner roundness of modal dialogs",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "paddingContentHorizontal",
          label: "Content Padding",
          type: "number",
          description: "Horizontal padding inside modals",
          min: 12,
          max: 48,
          step: 4,
          unit: "px",
        },
        {
          key: "paddingMD",
          label: "General Padding",
          type: "number",
          description: "General padding for modal elements",
          min: 8,
          max: 32,
          step: 4,
          unit: "px",
        },
      ],
    },
    {
      title: "Menu Components",
      description: "Navigation menu styling and spacing",
      component: "Menu",
      properties: [
        {
          key: "borderRadius",
          label: "Border Radius",
          type: "number",
          description: "Corner roundness of menu container",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "itemBorderRadius",
          label: "Item Border Radius",
          type: "number",
          description: "Corner roundness of menu items",
          min: 0,
          max: 20,
          step: 1,
          unit: "px",
        },
        {
          key: "itemPaddingInline",
          label: "Item Padding",
          type: "number",
          description: "Horizontal padding of menu items",
          min: 4,
          max: 24,
          step: 2,
          unit: "px",
        },
        {
          key: "itemMarginInline",
          label: "Item Margin",
          type: "number",
          description: "Horizontal margin between menu items",
          min: 0,
          max: 12,
          step: 1,
          unit: "px",
        },
      ],
    },
  ];

  return {
    tokenGroups,
    componentGroups,
  };
};
