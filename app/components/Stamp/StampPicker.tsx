import { StampType } from "@/app/types";
import { STAMPS } from "@/app/utils/stamps";

type StampPickerProps = {
  onClose: () => void;
  onSelectStamp: (stamp: StampType) => void;
  currentStampCount: number;
  selectedStampIds: string[];
};

export default function StampPicker({
  onClose,
  onSelectStamp,
  currentStampCount,
  selectedStampIds,
}: StampPickerProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-3 shadow-xl max-w-xs w-full mx-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-bold">スタンプを選択</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl p-2"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-8 gap-2">
          {STAMPS.map((stamp) => {
            const isMaxReached = currentStampCount >= 4;
            const isAlreadySelected = selectedStampIds.includes(stamp.id);
            const isDisabled = isMaxReached || isAlreadySelected;

            return (
              <button
                key={stamp.id}
                onClick={() => !isDisabled && onSelectStamp(stamp)}
                disabled={isDisabled}
                className="text-xl p-2 hover:bg-gray-100 rounded-lg transition"
                style={{ opacity: isDisabled ? 0.3 : 1 }}
              >
                {stamp.emoji}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
