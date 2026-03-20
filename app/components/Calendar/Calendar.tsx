"use client";

import { getDaysInMonth, getFirstDayOfMonth } from "@/app/utils/date";
import { useState } from "react";
import CalendarDay from "./CalendarDay";
import { CalendarCell, StampType } from "@/app/types";
import DayDetailModal from "../Stamp/DayDetailModal";
import { useTheme } from "@/app/context/ThemeContext";
import { THEME_COLORS } from "@/app/utils/themes";
import ThemeSelector from "../ThemeSelector";
import { useAuth } from "@/app/context/AuthContext";
import { useCalendarData } from "@/app/hooks/useCalendarData";
import { useRouter, useSearchParams } from "next/navigation";
import YearMonthPicker from "./YearMonthPicker";

export default function Calendar() {
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const today = new Date();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [year, setYear] = useState(
    Number(searchParams.get("year")) || today.getFullYear(),
  );
  const [month, setMonth] = useState(
    Number(searchParams.get("month")) || today.getMonth() + 1,
  );
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const { calendarData, syncing, addStamp, deleteStamp, updateComment } =
    useCalendarData(user!.id, year, month);
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

  const updateMonth = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
    router.push(`/?year=${newYear}&month=${newMonth}`);
  };

  const goToPrevMonth = () => {
    if (month === 1) {
      updateMonth(year - 1, 12);
    } else {
      updateMonth(year, month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      updateMonth(year + 1, 1);
    } else {
      updateMonth(year, month + 1);
    }
  };

  const goToToday = () => updateMonth(todayYear, todayMonth);

  const dateKey = (day: number) => `${year}-${month}-${day}`;

  const handleAddStamp = (stamp: StampType) => {
    if (selectedDate) {
      addStamp(selectedDate, stamp);
    }
  };

  const handleDeleteStamp = (stampId: string) => {
    if (selectedDate) {
      deleteStamp(selectedDate, stampId);
    }
  };

  const handleUpdateComment = (stampId: string, comment: string) => {
    if (selectedDate) {
      updateComment(selectedDate, stampId, comment);
    }
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
            <div className="flex flex-col items-center gap-1">
              <YearMonthPicker
                year={year}
                month={month}
                todayYear={todayYear}
                todayMonth={todayMonth}
                onChange={updateMonth}
              />
            </div>
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
