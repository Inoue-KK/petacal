"use client";

import { getDaysInMonth, getFirstDayOfMonth } from "@/app/utils/date";
import { useEffect, useState } from "react";
import CalendarDay from "./CalendarDay";
import { CalendarData, StampType } from "@/app/types";
import StampPicker from "../Stamp/StampPicker";

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const cells = Array.from({ length: daysInMonth + firstDayOfWeek }, (_, i) =>
    i < firstDayOfWeek ? null : i - firstDayOfWeek + 1,
  );

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

  const handleSelectStamp = (stamp: StampType) => {
    if (!selectedDate) return;

    const currentDayData = calendarData[selectedDate];
    const currentStamps = currentDayData?.stamps || [];

    if (currentStamps.some((s) => s.id === stamp.id)) {
      return;
    }

    const newStamps = [...currentStamps, stamp];

    setCalendarData({
      ...calendarData,
      [selectedDate]: { date: selectedDate, stamps: newStamps },
    });

    setSelectedDate(null);
  };

  const handleDeleteStamp = (date: string, stampId: string) => {
    const currentDayData = calendarData[date];
    if (!currentDayData) return;

    const newStamps = currentDayData.stamps.filter(
      (stamp) => stamp.id !== stampId,
    );

    setCalendarData({
      ...calendarData,
      [date]: { date: date, stamps: newStamps },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevMonth}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              ← 前月
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {year}年{month}月
            </h1>
            <button
              onClick={goToNextMonth}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              次月 →
            </button>
          </div>
        </div>

        {/* 曜日ヘッダー */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-100">
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
            {cells.map((day, i) => (
              <CalendarDay
                key={i}
                day={day}
                onClick={() =>
                  day && setSelectedDate(`${year}-${month}-${day}`)
                }
                stamps={
                  day
                    ? calendarData[`${year}-${month}-${day}`]?.stamps
                    : undefined
                }
                onDeleteStamp={(stampId) =>
                  day && handleDeleteStamp(`${year}-${month}-${day}`, stampId)
                }
              />
            ))}
          </div>
        </div>
        {selectedDate && (
          <StampPicker
            onClose={() => setSelectedDate(null)}
            onSelectStamp={handleSelectStamp}
            currentStampCount={calendarData[selectedDate]?.stamps.length || 0}
            selectedStampIds={
              calendarData[selectedDate]?.stamps.map((s) => s.id) || []
            }
          />
        )}
      </div>
    </div>
  );
}
