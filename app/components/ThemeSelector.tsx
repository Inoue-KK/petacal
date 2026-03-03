"use client";

import { useTheme } from "../context/ThemeContext";
import { THEME_COLORS } from "../utils/themes";

const THEMES = [
  { id: "turquoise" as const, name: "Turquoise" },
  { id: "ocean" as const, name: "Ocean" },
  { id: "coral" as const, name: "Coral" },
  { id: "lavender" as const, name: "Lavender" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-end mb-4">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="px-4 py-2 rounded-lg border-2 bg-white cursor-pointer transition outline-none"
        style={{
          borderColor: THEME_COLORS[theme].main,
          color: THEME_COLORS[theme].border,
          backgroundColor: THEME_COLORS[theme].main,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = THEME_COLORS[theme].hover;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = THEME_COLORS[theme].main;
        }}
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
