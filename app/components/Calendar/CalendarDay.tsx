type CalendarDayProps = {
    day: number | null;
}

export default function CalendarDay({ day }: CalendarDayProps) {
    return (
        <span className="text-center py-2 border">
            {day}
        </span>
    )
}