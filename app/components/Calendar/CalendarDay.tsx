import { StampType } from "@/app/types";

type CalendarDayProps = {
  day: number | null;
  onClick: () => void;
  stamps?: StampType[];
  onDeleteStamp?: (stampId: string) => void;
};

export default function CalendarDay({
  day,
  onClick,
  stamps,
  onDeleteStamp,
}: CalendarDayProps) {
  return (
    <div
      className={`
        min-h-24 p-2 border border-gray-200 
        ${day ? "cursor-pointer hover:bg-blue-50 transition" : "bg-gray-50"}
      `}
      onClick={() => day && onClick()}
    >
      <div className="text-sm font-semibold text-gray-700 mb-1">{day}</div>
      <div className="flex flex-wrap gap-1 justify-center">
        {stamps?.map((stamp) => (
          <span
            key={stamp.id}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteStamp?.(stamp.id);
            }}
            className="text-2xl cursor-pointer hover:scale-110 transition-transform"
          >
            {stamp.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
