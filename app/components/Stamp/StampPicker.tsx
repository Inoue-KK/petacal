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
    <div>
      <button onClick={onClose}>閉じる</button>
      <div>
        {STAMPS.map((stamp) => {
          const isMaxReached = currentStampCount >= 3;
          const isAlreadySelected = selectedStampIds.includes(stamp.id);
          const isDisabled = isMaxReached || isAlreadySelected;

          return (
            <span
              onClick={() => !isDisabled && onSelectStamp(stamp)}
              key={stamp.id}
              style={{ opacity: isDisabled ? 0.3 : 1 }}
            >
              {stamp.emoji}
            </span>
          );
        })}
      </div>
    </div>
  );
}
