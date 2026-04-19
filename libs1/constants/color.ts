export type RootColors =
  | "--bg-mode"
  | "--white-base"
  | "--black-base"
  | "--default-text-color"
  | "--primary-1"
  | "--primary-2"
  | "--primary-3"
  | "--secondary-1"
  | "--secondary-2"
  | "--secondary-3"
  | "--warning-1"
  | "--warning-2"
  | "--warning-3"
  | "--border-1"
  | "--border-2"
  | "--border-3"
  | "--danger-1"
  | "--danger-2"
  | "--danger-3"
  | "--info-1"
  | "--info-2"
  | "--info-3"
  | "--success-1"
  | "--success-2"
  | "--success-3"
  | "--gray-1"
  | "--gray-2"
  | "--gray-3";

// export type

const brand: Record<
  | "primary"
  | "secondary"
  | "warning"
  | "border"
  | "danger"
  | "info"
  | "success"
  | "customGray"
  | "defaultTextColor"
  | "bgMode"
  | "borderMode",
  Record<"mild" | "moderate" | "severe", `var(${RootColors})`>
> = {
  bgMode: "var(--bg-mode)" as any,
  borderMode: "var(--border-mode)" as any,
  defaultTextColor: "var(--default-text-color)" as any,
  primary: {
    mild: "var(--primary-1)",
    moderate: "var(--primary-2)",
    severe: "var(--primary-3)",
  },
  secondary: {
    mild: "var(--secondary-1)",
    moderate: "var(--secondary-2)",
    severe: "var(--secondary-3)",
  },
  warning: {
    mild: "var(--warning-1)",
    moderate: "var(--warning-2)",
    severe: "var(--warning-3)",
  },
  border: {
    mild: "var(--border-1)",
    moderate: "var(--border-2)",
    severe: "var(--border-3)",
  },
  danger: {
    mild: "var(--danger-1)",
    moderate: "var(--danger-2)",
    severe: "var(--danger-3)",
  },
  info: {
    mild: "var(--info-1)",
    moderate: "var(--info-2)",
    severe: "var(--info-3)",
  },
  success: {
    mild: "var(--success-1)",
    moderate: "var(--success-2)",
    severe: "var(--success-3)",
  },
  customGray: {
    mild: "var(--gray-1)",
    moderate: "var(--gray-2)",
    severe: "var(--gray-3)",
  },
};

// type ExtractRootColors<T> = T extends `var(${infer U})` ? U : never;

// export type typeKColors = `var(${ExtractRootColors<
//   | (typeof brand)['defaultTextColor']
//   | (typeof brand)[Exclude<
//       keyof typeof brand,
//       'defaultTextColor'
//     >][keyof Record<'mild' | 'moderate' | 'severe', `var(${RootColors})`>]
// >})`;

export type TypeKColors = `var(${RootColors})`;

export type KAlphaLevel = 5 | 8 | 10 | 16 | 24 | 32 | 48;
export type KAlphaVariants = Record<KAlphaLevel, string>;

/** Tạo opacity variants từ CSS variable dùng color-mix() */
const createAlpha = (colorVar: `var(${RootColors})`): KAlphaVariants => ({
  5: `color-mix(in srgb, ${colorVar} 5%, transparent)`,
  8: `color-mix(in srgb, ${colorVar} 8%, transparent)`,
  10: `color-mix(in srgb, ${colorVar} 10%, transparent)`,
  16: `color-mix(in srgb, ${colorVar} 16%, transparent)`,
  24: `color-mix(in srgb, ${colorVar} 24%, transparent)`,
  32: `color-mix(in srgb, ${colorVar} 32%, transparent)`,
  48: `color-mix(in srgb, ${colorVar} 48%, transparent)`,
});

const KColors = {
  ...brand,
  white: "var(--white-base)" as any,
  black: "var(--black-base)" as any,

  // Opacity variants — dùng màu `mild` (nhạt nhất) làm base
  primary: { ...brand.primary, alpha: createAlpha("var(--primary-1)") },
  secondary: { ...brand.secondary, alpha: createAlpha("var(--secondary-1)") },
  warning: { ...brand.warning, alpha: createAlpha("var(--warning-1)") },
  danger: { ...brand.danger, alpha: createAlpha("var(--danger-1)") },
  info: { ...brand.info, alpha: createAlpha("var(--info-1)") },
  success: { ...brand.success, alpha: createAlpha("var(--success-1)") },
  customGray: { ...brand.customGray, alpha: createAlpha("var(--gray-1)") },
};

export default KColors;

// generate-colors.js
