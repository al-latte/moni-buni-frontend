import { useState } from "react";
import { useDragControls, useMotionValue, useTransform } from "motion/react";

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftThreshold?: number;
  rightThreshold?: number;
}

export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  leftThreshold = -100,
  rightThreshold = 100,
}: UseSwipeProps) => {
  const x = useMotionValue(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const dragControls = useDragControls();

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > rightThreshold && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < leftThreshold && onSwipeLeft) {
      onSwipeLeft();
    }
    x.set(0);
    setIsSwiping(false);
  };

  const deleteProgress = useTransform(x, [leftThreshold, -20], [1, 0]);
  const deleteWidth = useTransform(x, (value) => (value < 0 ? Math.abs(value) : 0));

  const editProgress = useTransform(x, [20, rightThreshold], [0, 1]);
  const editWidth = useTransform(x, (value) => (value > 0 ? value : 0));

  return {
    x,
    deleteProgress,
    deleteWidth,
    editProgress,
    editWidth,
    handleDragEnd,
    dragControls,
    setIsSwiping,
    isSwiping,
  };
};