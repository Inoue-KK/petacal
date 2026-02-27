import { StampType } from "@/app/types";
import { STAMPS } from "@/app/utils/stamps";

type StampPickerProps = {
  onClose: () => void;
  onSelectStamp: (stamp: StampType) => void;
  currentStampCount: number;
};

export default function StampPicker({
  onClose,
  onSelectStamp,
  currentStampCount,
}: StampPickerProps) {
  return (
    <div>
      <button onClick={onClose}>閉じる</button>
      <div>
        {STAMPS.map((stamp) => {
          const isDisabled = currentStampCount >= 3;

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
