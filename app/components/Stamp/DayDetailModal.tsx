"use client";

import { useEffect, useState } from "react";
import { StampType } from "@/app/types";
import {
  STAMPS,
  STAMP_CATEGORIES,
  addRecentStampId,
  getRecentStampIds,
} from "@/app/utils/stamps";
import { useTheme } from "@/app/context/ThemeContext";
import { THEME_COLORS } from "@/app/utils/themes";

type DayDetailModalProps = {
  date: string;
  stamps: StampType[];
  onClose: () => void;
  onAddStamp: (stamp: StampType) => void;
  onDeleteStamp: (stampId: string) => void;
  onUpdateComment: (stampId: string, comment: string) => void;
};

export default function DayDetailModal({
  date,
  stamps,
  onClose,
  onAddStamp,
  onDeleteStamp,
  onUpdateComment,
}: DayDetailModalProps) {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("mood");

  useEffect(() => {
    const ids = getRecentStampIds();
    if (ids.length > 0) {
      setRecentIds(ids);
      setActiveCategory("recent");
    }
  }, []);

  const recentCategory = { id: "recent", label: "🕒最近" };
  const allCategories =
    recentIds.length > 0
      ? [recentCategory, ...STAMP_CATEGORIES]
      : STAMP_CATEGORIES;

  const isMaxReached = stamps.length >= 4;
  const selectedStampIds = stamps.map((s) => s.id);

  const [y, m, d] = date.split("-");
  const displayDate = `${y}年${m}月${d}日`;

  const filteredStamps =
    activeCategory === "recent"
      ? (recentIds
          .map((id) => STAMPS.find((s) => s.id === id))
          .filter(Boolean) as typeof STAMPS)
      : STAMPS.filter((s) => s.category === activeCategory);

  const handleAddStamp = (stampDef: (typeof STAMPS)[number]) => {
    if (isMaxReached || selectedStampIds.includes(stampDef.id)) return;
    addRecentStampId(stampDef.id);
    setRecentIds(getRecentStampIds());
    onAddStamp({
      id: stampDef.id,
      emoji: stampDef.emoji,
      label: stampDef.label,
      comment: "",
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-4 rounded-t-2xl"
          style={{ backgroundColor: colors.main }}
        >
          <h2 className="text-lg font-bold text-gray-800">{displayDate}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3">
          {stamps.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              スタンプがまだありません
            </p>
          ) : (
            stamps.map((stamp) => (
              <div
                key={stamp.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50"
              >
                <span className="text-2xl mt-0.5">{stamp.emoji}</span>
                <div className="flex-1 min-w-0">
                  <textarea
                    value={stamp.comment}
                    onChange={(e) => onUpdateComment(stamp.id, e.target.value)}
                    placeholder="メモを入力..."
                    rows={2}
                    className="w-full text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-2 py-1.5 resize-none focus:outline-none focus:border-gray-400 transition"
                  />
                </div>
                <button
                  onClick={() => onDeleteStamp(stamp.id)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-400 transition flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            ))
          )}

          {!isPickerOpen && (
            <button
              onClick={() => setIsPickerOpen(true)}
              disabled={isMaxReached}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition"
              style={{
                backgroundColor: isMaxReached ? "#d1d5db" : colors.accent,
              }}
            >
              {isMaxReached ? "スタンプは4枚までです" : "+ スタンプを追加"}
            </button>
          )}

          {isPickerOpen && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div
                className="flex overflow-x-auto stamp-category-scroll"
                style={{ backgroundColor: colors.main }}
                onWheel={handleWheel}
              >
                {allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="shrink-0 px-3 py-2 text-xs font-semibold transition"
                    style={{
                      backgroundColor:
                        activeCategory === cat.id
                          ? colors.accent
                          : "transparent",
                      color: activeCategory === cat.id ? "white" : "#374151",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-1 p-3 bg-white h-48 overflow-y-auto">
                {filteredStamps.map((stampDef) => {
                  const alreadySelected = selectedStampIds.includes(
                    stampDef.id,
                  );
                  const disabled = isMaxReached || alreadySelected;
                  return (
                    <button
                      key={stampDef.id}
                      onClick={() => handleAddStamp(stampDef)}
                      disabled={disabled}
                      title={stampDef.label}
                      className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg hover:bg-gray-100 transition"
                      style={{ opacity: disabled ? 0.3 : 1 }}
                    >
                      <span className="text-2xl">{stampDef.emoji}</span>
                      <span className="text-[9px] text-gray-500 text-center leading-tight">
                        {stampDef.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="px-3 pb-3">
                <button
                  onClick={() => setIsPickerOpen(false)}
                  className="w-full py-1.5 text-xs text-gray-500 hover:text-gray-700 transition"
                >
                  閉じる
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
