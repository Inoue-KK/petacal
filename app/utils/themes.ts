export const THEME_COLORS = {
  turquoise: {
    main: "#a1d6e2",
    accent: "#A5AAB6",
    hover: "#858992",
    border: "#1995ad",
    light: "#f1f1f2",
    bg: "#f1f1f2",
  },
  ocean: {
    main: "#80ACD6",
    accent: "#5F97CE",
    hover: "#5C7A97",
    border: "#3169A0",
    light: "#E8EFF8",
    bg: "#28537B",
  },
  coral: {
    main: "#f7c8ce",
    accent: "#DF909B",
    hover: "#CB7179",
    border: "#E88CA4",
    light: "#F9F6F6",  
    bg: "#fadbda",
  },
  lavender: {
    main: "#CFCAED",
    accent: "#93B7F1",
    hover: "#6E95D4",
    border: "#9E94D6",
    light: "#F0F0FA",
    bg: "#E4E8F6",
  },
} as const;

export type Theme = keyof typeof THEME_COLORS;
