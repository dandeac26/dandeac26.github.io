export interface ColorProfile {
  id: string;
  name: string;
  /** Solid hex color for the visual swatch in the picker */
  swatch: string;
  vars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

// Profiles only control accent colors.
// Sidebar and section backgrounds are fixed to Graphite values in index.css.
export const profiles: ColorProfile[] = [
  {
    id: "graphite",
    name: "Graphite",
    swatch: "#27272a",
    vars: {
      light: {
        "--color-accent": "#18181b",
        "--color-accent-hover": "#3f3f46",
        "--color-accent-soft": "#e4e4e7",
      },
      dark: {
        "--color-accent": "#d4d4d8",
        "--color-accent-hover": "#e4e4e7",
        "--color-accent-soft": "#3f3f46",
      },
    },
  },
  {
    id: "slate",
    name: "Slate",
    swatch: "#475569",
    vars: {
      light: {
        "--color-accent": "#334155",
        "--color-accent-hover": "#1e293b",
        "--color-accent-soft": "#e2e8f0",
      },
      dark: {
        "--color-accent": "#94a3b8",
        "--color-accent-hover": "#cbd5e1",
        "--color-accent-soft": "#1e293b",
      },
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    swatch: "#4338ca",
    vars: {
      light: {
        "--color-accent": "#4338ca",
        "--color-accent-hover": "#3730a3",
        "--color-accent-soft": "#e0e7ff",
      },
      dark: {
        "--color-accent": "#818cf8",
        "--color-accent-hover": "#a5b4fc",
        "--color-accent-soft": "#312e81",
      },
    },
  },
  {
    id: "copper",
    name: "Copper",
    swatch: "#b45309",
    vars: {
      light: {
        "--color-accent": "#b45309",
        "--color-accent-hover": "#92400e",
        "--color-accent-soft": "#fef3c7",
      },
      dark: {
        "--color-accent": "#fbbf24",
        "--color-accent-hover": "#f59e0b",
        "--color-accent-soft": "#3b2900",
      },
    },
  },
  {
    id: "emerald",
    name: "Emerald",
    swatch: "#065f46",
    vars: {
      light: {
        "--color-accent": "#065f46",
        "--color-accent-hover": "#064e3b",
        "--color-accent-soft": "#d1fae5",
      },
      dark: {
        "--color-accent": "#34d399",
        "--color-accent-hover": "#6ee7b7",
        "--color-accent-soft": "#064e3b",
      },
    },
  },
  {
    id: "rose",
    name: "Rose",
    swatch: "#be185d",
    vars: {
      light: {
        "--color-accent": "#be185d",
        "--color-accent-hover": "#9d174d",
        "--color-accent-soft": "#fce7f3",
      },
      dark: {
        "--color-accent": "#f472b6",
        "--color-accent-hover": "#f9a8d4",
        "--color-accent-soft": "#500724",
      },
    },
  },
  {
    id: "blush",
    name: "Blush",
    swatch: "#db2777",
    vars: {
      light: {
        "--color-accent": "#9d174d",
        "--color-accent-hover": "#831843",
        "--color-accent-soft": "#fdf2f8",
      },
      dark: {
        "--color-accent": "#f9a8d4",
        "--color-accent-hover": "#fbcfe8",
        "--color-accent-soft": "#4a0728",
      },
    },
  },
  {
    id: "mauve",
    name: "Mauve",
    swatch: "#7c3aed",
    vars: {
      light: {
        "--color-accent": "#6d28d9",
        "--color-accent-hover": "#5b21b6",
        "--color-accent-soft": "#ede9fe",
      },
      dark: {
        "--color-accent": "#c4b5fd",
        "--color-accent-hover": "#ddd6fe",
        "--color-accent-soft": "#3b0764",
      },
    },
  },
  {
    id: "crimson",
    name: "Crimson",
    swatch: "#991b1b",
    vars: {
      light: {
        "--color-accent": "#991b1b",
        "--color-accent-hover": "#7f1d1d",
        "--color-accent-soft": "#fee2e2",
      },
      dark: {
        "--color-accent": "#fca5a5",
        "--color-accent-hover": "#fecaca",
        "--color-accent-soft": "#450a0a",
      },
    },
  },
];
