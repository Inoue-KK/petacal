// Stamp type definition
export type StampType = {
    id: string;
    emoji: string;
    label: string;
}

// Data for a single day
export type DayData = {
    date: string;           // format: "YYYY-MM-DD"
    stamps: StampType[];
}

// Calendar data keyed by date string
export type CalendarData = {
    [date: string]: DayData;
}