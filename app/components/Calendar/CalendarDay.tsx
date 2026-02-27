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
    <span
      className="text-center py-2 border h-20"
      onClick={() => day && onClick()}
    >
      <div>{day}</div>
      <div>
        {stamps?.map((stamp) => (
          <span
            key={stamp.id}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteStamp?.(stamp.id);
            }}
          >
            {stamp.emoji}
          </span>
        ))}
      </div>
    </span>
  );
}
