"use client";

import { getDaysInMonth, getFirstDayOfMonth } from "@/app/utils/date";
import { useEffect, useState } from "react";
import CalendarDay from "./CalendarDay";
import { CalendarCell, CalendarData, StampType } from "@/app/types";
import DayDetailModal from "../Stamp/DayDetailModal";
import { useTheme } from "@/app/context/ThemeContext";
import { THEME_COLORS } from "@/app/utils/themes";
import ThemeSelector from "../ThemeSelector";
import { useAuth } from "@/app/context/AuthContext";

export default function Calendar() {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const totalCells = 42; // 6 weeks
  const cells: CalendarCell[] = Array.from({ length: totalCells }, (_, i) => {
    const dayOffset = i - firstDayOfWeek + 1;

    // Previous month dates
    if (dayOffset <= 0) {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const prevMonthDays = getDaysInMonth(prevYear, prevMonth);
      return {
        day: prevMonthDays + dayOffset,
        isPrevMonth: true,
        isCurrentMonth: false,
        isNextMonth: false,
      };
    }

    // Next month dates
    if (dayOffset > daysInMonth) {
      return {
        day: dayOffset - daysInMonth,
        isPrevMonth: false,
        isCurrentMonth: false,
        isNextMonth: true,
      };
    }

    // Current month dates
    return {
      day: dayOffset,
      isPrevMonth: false,
      isCurrentMonth: true,
      isNextMonth: false,
    };
  });

  useEffect(() => {
    const savedData = localStorage.getItem("calendarData");
    if (savedData) {
      setCalendarData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  const goToPrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const dateKey = (day: number) => `${year}-${month}-${day}`;

  const handleAddStamp = (stamp: StampType) => {
    if (!selectedDate) return;
    const current = calendarData[selectedDate]?.stamps || [];
    if (current.some((s) => s.id === stamp.id) || current.length >= 4) return;
    setCalendarData({
      ...calendarData,
      [selectedDate]: { date: selectedDate, stamps: [...current, stamp] },
    });
  };

  const handleDeleteStamp = (stampId: string) => {
    if (!selectedDate) return;
    const current = calendarData[selectedDate]?.stamps || [];
    setCalendarData({
      ...calendarData,
      [selectedDate]: {
        date: selectedDate,
        stamps: current.filter((s) => s.id !== stampId),
      },
    });
  };

  const handleUpdateComment = (stampId: string, comment: string) => {
    if (!selectedDate) return;
    const current = calendarData[selectedDate]?.stamps || [];
    setCalendarData({
      ...calendarData,
      [selectedDate]: {
        date: selectedDate,
        stamps: current.map((s) => (s.id === stampId ? { ...s, comment } : s)),
      },
    });
  };

  return (
    <div
      className="min-h-screen py-2 md:py-8"
      style={{ backgroundColor: THEME_COLORS[theme].bg }}
    >
      <div className="max-w-4xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between mb-4">
          <ThemeSelector />
          <button
            onClick={signOut}
            className="px-4 py-2 text-sm text-white rounded-lg shadow transition"
            style={{ backgroundColor: THEME_COLORS[theme].accent }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = THEME_COLORS[theme].hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                THEME_COLORS[theme].accent;
            }}
          >
            ログアウト
          </button>
        </div>{" "}
        <div
          className="rounded-lg shadow-md p-6 mb-6"
          style={{ backgroundColor: THEME_COLORS[theme].main }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevMonth}
              className="px-4 py-2 text-white rounded-lg transition"
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
              ← 前月
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {year}年{month}月
            </h1>
            <button
              onClick={goToNextMonth}
              className="px-4 py-2 bg-${theme} text-white rounded-lg hover:bg-${theme}-hover transition"
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
              次月 →
            </button>
          </div>
        </div>
        {/* 曜日ヘッダー */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="grid grid-cols-7"
            style={{ backgroundColor: THEME_COLORS[theme].main }}
          >
            {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => (
              <div
                key={day}
                className={`text-center py-3 font-semibold ${
                  index === 0
                    ? "text-red-500"
                    : index === 6
                      ? "text-blue-500"
                      : "text-gray-700"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* カレンダーの日付 */}
          <div className="grid grid-cols-7">
            {cells.map((cell, i) => (
              <CalendarDay
                key={i}
                cell={cell}
                onClick={() =>
                  cell.isCurrentMonth && setSelectedDate(dateKey(cell.day))
                }
                stamps={
                  cell.isCurrentMonth
                    ? calendarData[dateKey(cell.day)]?.stamps
                    : undefined
                }
                isToday={
                  cell.isCurrentMonth &&
                  year === todayYear &&
                  month === todayMonth &&
                  cell.day === todayDay
                }
              />
            ))}
          </div>
        </div>
        {selectedDate && (
          <DayDetailModal
            date={selectedDate}
            stamps={calendarData[selectedDate]?.stamps || []}
            onClose={() => setSelectedDate(null)}
            onAddStamp={handleAddStamp}
            onDeleteStamp={handleDeleteStamp}
            onUpdateComment={handleUpdateComment}
          />
        )}
      </div>
    </div>
  );
}
