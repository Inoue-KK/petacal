import { CalendarCell, StampType } from "@/app/types";

type CalendarDayProps = {
  cell: CalendarCell;
  onClick: () => void;
  stamps?: StampType[];
  onDeleteStamp?: (stampId: string) => void;
  isToday?: boolean;
};

export default function CalendarDay({
  cell,
  onClick,
  stamps,
  onDeleteStamp,
  isToday,
}: CalendarDayProps) {
  const { day, isCurrentMonth, isPrevMonth, isNextMonth } = cell;

  return (
    <div
      className={`
        min-h-24 p-2 overflow-hidden
        ${isCurrentMonth ? "bg-white cursor-pointer hover:bg-blue-50 transition" : "bg-gray-50"}
        ${isToday ? "border-2 border-blue-400 bg-blue-50/30" : "border border-gray-200"}
        `}
      onClick={() => isCurrentMonth && onClick()}
    >
      <div
        className={`text-sm font-semibold mb-1 ${isCurrentMonth ? "text-gray-700" : "text-gray-400"}`}
      >
        {day}
      </div>
      <div className="flex flex-wrap gap-0.5 justify-center items-center h-10">
        {stamps?.map((stamp) => (
          <span
            key={stamp.id}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteStamp?.(stamp.id);
            }}
            className="text-base cursor-pointer hover:scale-110 transition-transform leading-none"
          >
            {stamp.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
