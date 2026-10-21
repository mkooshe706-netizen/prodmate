/**
 * Professional Design System - Color Palette
 * Designed for a modern AI productivity tool.
 * Includes semantic scaling for light/dark modes.
 */

export const Colors = {
  // Brand Colors (AI Indigo)
  primary: {
    light: '#eef2ff',
    main: '#4F46E5', // Indigo 600 - Main Brand Color
    dark: '#3730a3',
  },
  
  // Neutral/Grays (For Typography and Backgrounds)
  neutral: {
    50: '#F9FAFB',  // App Background (Light)
    100: '#F3F4F6', // Borders / Dividers
    200: '#E5E7EB', // Disabled states
    400: '#9CA3AF', // Placeholder text / Inactive Icons
    500: '#6B7280', // Secondary text (Subtitles)
    800: '#1F2937', // Primary text (Dark mode)
    900: '#111827', // Primary text (Titles) / App Background (Dark)
  },

  // Semantic Colors (For Tasks and Statuses)
  status: {
    success: '#10B981', // Emerald 500 - Completed tasks
    warning: '#F59E0B', // Amber 500 - Overdue / Urgent
    error: '#EF4444',   // Red 500 - Destructive actions
    info: '#3B82F6',    // Blue 500 - AI Suggestions / Tips
  },

  // Contextual Backgrounds
  background: {
    primary: '#FFFFFF', // Card backgrounds
    secondary: '#F9FAFB', // Screen backgrounds
  }
};

// Helper for dynamic themes (Optional extension for later)
export const getThemeColors = (isDarkMode: boolean) => {
  return {
    background: isDarkMode ? Colors.neutral[900] : Colors.background.secondary,
    card: isDarkMode ? '#1F2937' : Colors.background.primary,
    text: isDarkMode ? Colors.neutral[50] : Colors.neutral[900],
    subText: isDarkMode ? Colors.neutral[400] : Colors.neutral[500],
    border: isDarkMode ? Colors.neutral[800] : Colors.neutral[100],
  };
};