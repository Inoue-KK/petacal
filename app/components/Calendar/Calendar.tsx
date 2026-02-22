'use client';

import { useState } from "react";

export default function Calendar() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);

    return (
        <div>
            <h1>{year}年{month}月</h1>
        </div>
    );
}