import {
  MD3DarkTheme as DarkTheme,
  PaperProvider,
  MD3LightTheme as LightTheme,
} from "react-native-paper";

// export const theme = {
//   ...DarkTheme,
//   colors: {
//     ...DarkTheme.colors,
//     primary: "rgb(220, 184, 255)",
//     onPrimary: "rgb(71, 12, 122)",
//     primaryContainer: "rgb(95, 43, 146)",
//     onPrimaryContainer: "rgb(240, 219, 255)",
//     secondary: "rgb(208, 193, 218)",
//     onSecondary: "rgb(54, 44, 63)",
//     secondaryContainer: "rgb(77, 67, 87)",
//     onSecondaryContainer: "rgb(237, 221, 246)",
//     tertiary: "rgb(243, 183, 190)",
//     onTertiary: "rgb(75, 37, 43)",
//     tertiaryContainer: "rgb(101, 58, 65)",
//     onTertiaryContainer: "rgb(255, 217, 221)",
//     error: "rgb(255, 180, 171)",
//     onError: "rgb(105, 0, 5)",
//     errorContainer: "rgb(147, 0, 10)",
//     onErrorContainer: "rgb(255, 180, 171)",
//     background: "rgb(29, 27, 30)",
//     onBackground: "rgb(231, 225, 229)",
//     surface: "rgb(29, 27, 30)",
//     onSurface: "rgb(231, 225, 229)",
//     surfaceVariant: "rgb(74, 69, 78)",
//     onSurfaceVariant: "rgb(204, 196, 206)",
//     outline: "rgb(150, 142, 152)",
//     outlineVariant: "rgb(74, 69, 78)",
//     shadow: "rgb(0, 0, 0)",
//     scrim: "rgb(0, 0, 0)",
//     inverseSurface: "rgb(231, 225, 229)",
//     inverseOnSurface: "rgb(50, 47, 51)",
//     inversePrimary: "rgb(120, 69, 172)",
//     elevation: {
//       level0: "transparent",
//       level1: "rgb(39, 35, 41)",
//       level2: "rgb(44, 40, 48)",
//       level3: "rgb(50, 44, 55)",
//       level4: "rgb(52, 46, 57)",
//       level5: "rgb(56, 49, 62)",
//     },
//     surfaceDisabled: "rgba(231, 225, 229, 0.12)",
//     onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
//     backdrop: "rgba(51, 47, 55, 0.4)",
//   },
// };

// export const customDarkTheme = {
//   ...DarkTheme,
//   colors: {
//     ...DarkTheme.colors,
//     background: "#121212", // Dark black background
//     surface: "#1E1E1E", // Slightly lighter dark for cards/surfaces
//     primary: "#BB86FC", // A vibrant purple for primary actions
//     accent: "#03DAC6", // A teal for secondary actions/highlights
//     text: "#FFFFFF", // White text
//     onSurface: "#FFFFFF", // White text on surfaces
//     onBackground: "#FFFFFF", // White text on background,
//     placeholder: "#A0A0A0", // Placeholder text color for inputs
//   },
// };

export const customDarkTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    background: "#E9E3DF", // Dark black background
    surface: "#F3E9DC", // Slightly lighter dark for cards/surfaces
    primary: "#F97A00", // A vibrant purple for primary actions
    accent: "#386641", // A teal for secondary actions/highlights
    text: "#000000", // White text
    onSurface: "#000000", // White text on surfaces
    onBackground: "#000000", // White text on background,
    placeholder: "#A0A0A0", // Placeholder text color for inputs
  },
};

export const customLightTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    background: "#E9E3DF", // Dark black background
    surface: "#F3E9DC", // Slightly lighter dark for cards/surfaces
    primary: "#F97A00", // A vibrant purple for primary actions
    accent: "#386641", // A teal for secondary actions/highlights
    text: "#000000", // White text
    onSurface: "#000000", // White text on surfaces
    onBackground: "#000000", // White text on background,
    placeholder: "#A0A0A0", // Placeholder text color for inputs
  },
};

export default function ReactNativePaper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PaperProvider theme={LightTheme}>{children}</PaperProvider>;
}
