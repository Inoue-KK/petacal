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
import { Kiwi_Maru } from "next/font/google";

const kiwiMaru = Kiwi_Maru({
  subsets: ["latin"],
  weight: "300",
});

export default function Calendar() {
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const today = new Date();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState(
    Number(searchParams.get("year")) || today.getFullYear(),
  );
  // getMonth() returns 0-based index, so +1 to convert to 1-based
  const [month, setMonth] = useState(
    Number(searchParams.get("month")) || today.getMonth() + 1,
  );

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const { calendarData, addStamp, deleteStamp, updateComment } =
    useCalendarData(user!.id, year, month);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const totalCells = 42; // 6 weeks　x 7 days
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

  const dateKey = (day: number) => `${year}-${month}-${day}`;

  const handleAddStamp = (stamp: StampType) => {
    if (selectedDate) addStamp(selectedDate, stamp);
  };

  const handleDeleteStamp = (stampId: string) => {
    if (selectedDate) deleteStamp(selectedDate, stampId);
  };

  const handleUpdateComment = (stampId: string, comment: string) => {
    if (selectedDate) updateComment(selectedDate, stampId, comment);
  };

  return (
    <div
      className="h-dvh flex flex-col py-2 md:py-4 overflow-hidden"
      style={{
        backgroundColor: THEME_COLORS[theme].bg,
        fontFamily: kiwiMaru.style.fontFamily,
      }}
    >
      <div className="max-w-4xl mx-auto px-2 md:px-4 w-full flex flex-col flex-1 min-h-0">
        {/* App Settings */}
        <div className="flex items-center justify-between mb-3">
          <ThemeSelector />
          <button
            onClick={signOut}
            className="px-3 py-1.5 text-xs text-white rounded-lg shadow transition"
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
        </div>

        {/* Year/Month Navigation */}
        <div
          className="rounded-lg shadow-md p-3 mb-4"
          style={{ backgroundColor: THEME_COLORS[theme].main }}
        >
          <div className="flex items-center justify-between">
            {/* Previous Month Button */}
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-full transition"
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Year/Month Display & Picker */}
            <div className="flex flex-col items-center gap-1">
              <YearMonthPicker
                year={year}
                month={month}
                todayYear={todayYear}
                todayMonth={todayMonth}
                onChange={updateMonth}
              />
            </div>

            {/* Next Month Button */}
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full transition"
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex-1 min-h-0 flex flex-col">
          {/* Day of Week Headers */}
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

          {/* Calendar Days */}
          <div className="grid grid-cols-7 flex-1">
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
