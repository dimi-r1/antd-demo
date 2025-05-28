import { useState, useCallback } from "react";
import type { ThemeConfig } from "antd/es/config-provider/context";
import { message } from "antd";

interface UseThemeCustomizerProps {
  currentTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
  onPresetSelect: (preset: "red") => void;
  currentPreset: "red" | "green" | "custom";
}

type ThemeTokenValue = string | number;

export const useThemeCustomizer = ({
  currentTheme,
  onThemeChange,
  onPresetSelect,
  currentPreset: _currentPreset,
}: UseThemeCustomizerProps) => {
  const [activeTab, setActiveTab] = useState("tokens");
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [exportCode, setExportCode] = useState("");
  const [pendingTheme, setPendingTheme] = useState<ThemeConfig | null>(null);

  // Get the theme to display in the form (pending changes or current theme)
  const displayTheme = pendingTheme || currentTheme;

  // Check if there are pending changes
  const hasPendingChanges = pendingTheme !== null;

  // Handle token changes - store in pending state instead of applying immediately
  const handleTokenChange = useCallback(
    (path: string[], value: ThemeTokenValue) => {
      const baseTheme = pendingTheme || currentTheme;
      const newTheme = JSON.parse(JSON.stringify(baseTheme)) as ThemeConfig;

      // Navigate to the correct nested property
      let current: Record<string, unknown> = newTheme as Record<
        string,
        unknown
      >;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]] as Record<string, unknown>;
      }

      // Set the value
      current[path[path.length - 1]] = value;

      setPendingTheme(newTheme);
    },
    [currentTheme, pendingTheme]
  );

  // Apply pending changes
  const applyChanges = useCallback(() => {
    if (pendingTheme) {
      onThemeChange(pendingTheme);
      setPendingTheme(null);
      message.success("Theme changes applied successfully!");
    }
  }, [pendingTheme, onThemeChange]);

  // Discard pending changes
  const discardChanges = useCallback(() => {
    setPendingTheme(null);
    message.info("Changes discarded");
  }, []);

  // Reset to red preset theme
  const resetToRed = useCallback(() => {
    setPendingTheme(null); // Clear any pending changes
    onPresetSelect("red");
    message.success("Reset to red theme");
  }, [onPresetSelect]);

  // Generate export code - use display theme (pending or current)
  const generateExportCode = useCallback(() => {
    const themeToExport = pendingTheme || currentTheme;
    const code = `// Generated Ant Design Theme Configuration
import type { ThemeConfig } from 'antd/es/config-provider/context';

export const customTheme: ThemeConfig = ${JSON.stringify(
      themeToExport,
      null,
      2
    )};

// Usage in your App component:
// import { ConfigProvider } from 'antd';
// import { customTheme } from './theme';
//
// function App() {
//   return (
//     <ConfigProvider theme={customTheme}>
//       {/* Your app content */}
//     </ConfigProvider>
//   );
// }`;

    setExportCode(code);
    setIsExportModalVisible(true);
  }, [currentTheme, pendingTheme]);

  // Copy to clipboard functionality
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      message.success("Theme configuration copied to clipboard!");
    } catch (_err) {
      message.error("Failed to copy to clipboard");
    }
  }, [exportCode]);

  return {
    activeTab,
    setActiveTab,
    isExportModalVisible,
    setIsExportModalVisible,
    exportCode,
    displayTheme,
    hasPendingChanges,
    handleTokenChange,
    applyChanges,
    discardChanges,
    resetToRed,
    generateExportCode,
    copyToClipboard,
  };
};
