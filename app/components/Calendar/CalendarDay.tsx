import { useTheme } from "@/app/context/ThemeContext";
import { THEME_COLORS } from "@/app/utils/themes";
import { CalendarCell, StampType } from "@/app/types";

type CalendarDayProps = {
  cell: CalendarCell;
  onClick: () => void;
  stamps?: StampType[];
  isToday?: boolean;
};

export default function CalendarDay({
  cell,
  onClick,
  stamps,
  isToday,
}: CalendarDayProps) {
  const { theme } = useTheme();
  const { day, isCurrentMonth } = cell;

  return (
    <div
      className={`
      h-full p-2 overflow-hidden transition flex flex-col
      ${isCurrentMonth ? "bg-white cursor-pointer" : "bg-gray-50"}
      ${isToday ? "border-2" : "border border-gray-200"}
    `}
      style={
        isCurrentMonth
          ? isToday
            ? {
                borderColor: THEME_COLORS[theme].border,
                backgroundColor: THEME_COLORS[theme].light + "4D", // 30% opacity
              }
            : {}
          : {}
      }
      onMouseEnter={(e) => {
        if (isCurrentMonth && !isToday) {
          e.currentTarget.style.backgroundColor = THEME_COLORS[theme].light;
        }
      }}
      onMouseLeave={(e) => {
        if (isCurrentMonth && !isToday) {
          e.currentTarget.style.backgroundColor = "white";
        }
      }}
      onClick={() => isCurrentMonth && onClick()}
    >
      <div
        className={`text-sm font-semibold mb-1 ${isCurrentMonth ? "text-gray-700" : "text-gray-400"}`}
      >
        {day}
      </div>
      <div className="flex-1 flex flex-wrap gap-0.5 justify-center items-center content-center">
        {stamps?.map((stamp) => (
          <span key={stamp.id} className="leading-none" style={{ fontSize: 'clamp(0.6rem, 3vw, 1.125rem)' }}>
            {stamp.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
