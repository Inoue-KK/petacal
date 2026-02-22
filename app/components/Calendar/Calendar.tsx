'use client';

import { getDaysInMonth, getFirstDayOfMonth } from "@/app/utils/date";
import { useState } from "react";

export default function Calendar() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfMonth(year, month);

    return (
        <div>
            <h1>{year}年{month}月</h1>
            <div>
                {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>
        </div>
    );
}