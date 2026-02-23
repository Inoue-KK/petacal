"use client";

import { getDaysInMonth, getFirstDayOfMonth } from "@/app/utils/date";
import { useState } from "react";

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const cells = Array.from({ length: daysInMonth + firstDayOfWeek }, (_, i) =>
    i < firstDayOfWeek ? null : i - firstDayOfWeek + 1,
  );
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

  return (
    <div>
      <div className="flex items-center justify-center gap-4 py-4">
        <button onClick={goToPrevMonth}>前月</button>
        <h1 className="text-center py-4">
          {year}年{month}月
        </h1>
        <button onClick={goToNextMonth}>次月</button>
      </div>
      <div className="grid grid-cols-7">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <span key={day} className="text-center py-2 border">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => (
          <span key={i} className="text-center py-2 border">
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}
