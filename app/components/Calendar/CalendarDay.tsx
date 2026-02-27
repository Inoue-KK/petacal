type CalendarDayProps = {
  day: number | null;
  onClick: () => void;
};

export default function CalendarDay({ day, onClick }: CalendarDayProps) {
  return (
    <span className="text-center py-2 border" onClick={() => day && onClick()}>
      {day}
    </span>
  );
}
