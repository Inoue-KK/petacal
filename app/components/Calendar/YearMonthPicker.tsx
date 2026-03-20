"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { THEME_COLORS } from "@/app/utils/themes";
import { useState } from "react";

type Props = {
  year: number;
  month: number;
  todayYear: number;
  todayMonth: number;
  onChange: (year: number, month: number) => void;
};

export default function YearMonthPicker({
  year,
  month,
  todayYear,
  todayMonth,
  onChange,
}: Props) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(year);

  const handleSelect = (m: number) => {
    onChange(pickerYear, m);
    setOpen(false);
  };

  const handleToday = () => {
    onChange(todayYear, todayMonth);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => {
          setPickerYear(year);
          setOpen(!open);
        }}
        className="text-2xl font-bold text-gray-800 hover:opacity-70 transition cursor-pointer"
      >
        {year}年{month}月
      </button>

      {/* Popup */}
      {open && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-10 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl p-4 w-64">
            {/* Year Selector */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setPickerYear(pickerYear - 1)}
                className="px-2 py-1 rounded-lg text-white transition"
                style={{ backgroundColor: THEME_COLORS[theme].accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    THEME_COLORS[theme].hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    THEME_COLORS[theme].accent;
                }}
              >
                ←
              </button>
              <span className="font-bold text-gray-800">{pickerYear}年</span>
              <button
                onClick={() => setPickerYear(pickerYear + 1)}
                className="px-2 py-1 rounded-lg text-white transition"
                style={{ backgroundColor: THEME_COLORS[theme].accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    THEME_COLORS[theme].hover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    THEME_COLORS[theme].accent;
                }}
              >
                →
              </button>
            </div>

            {/* Month Selector */}
            <button
              onClick={handleToday}
              className="w-full mb-3 py-1 rounded-lg text-white text-sm transition"
              style={{ backgroundColor: THEME_COLORS[theme].accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  THEME_COLORS[theme].hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  THEME_COLORS[theme].accent;
              }}
            >
              今月
            </button>

            {/* Month Grid */}
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                const isSelected = m === month && pickerYear === year;
                const isToday = m === todayMonth && pickerYear === todayYear;
                return (
                  <button
                    key={m}
                    onClick={() => handleSelect(m)}
                    className="py-2 rounded-lg text-sm transition font-medium"
                    style={{
                      backgroundColor: isSelected
                        ? THEME_COLORS[theme].accent
                        : "transparent",
                      color: isSelected
                        ? "white"
                        : isToday
                          ? THEME_COLORS[theme].accent
                          : "#374151",
                      fontWeight: isToday ? "bold" : "normal",
                      border:
                        isToday && !isSelected
                          ? `1px solid ${THEME_COLORS[theme].accent}`
                          : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor =
                          THEME_COLORS[theme].hover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {m}月
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
