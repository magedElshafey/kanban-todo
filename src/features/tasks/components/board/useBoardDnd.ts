import {
  PointerSensor,
  closestCenter,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";

import type { ColumnId, Task } from "../../../../shared/types/task";
import { useMoveTaskOptimistic } from "../../hooks/useTaskMutations";

function parseId(id: string) {
  if (id.startsWith("task:")) return { type: "task" as const, value: id.slice(5) };
  if (id.startsWith("column:")) return { type: "column" as const, value: id.slice(7) };
  return { type: "unknown" as const, value: id };
}

const preferTasksCollision: CollisionDetection = (args) => {
  const pointer = pointerWithin(args);

  if (pointer.length) {
    const taskHits = pointer.filter((c) => String(c.id).startsWith("task:"));
    if (taskHits.length) return taskHits;
    return pointer;
  }

  const rect = rectIntersection(args);
  if (rect.length) {
    const taskHits = rect.filter((c) => String(c.id).startsWith("task:"));
    if (taskHits.length) return taskHits;
    return rect;
  }

  return closestCenter(args);
};

function getBestOverId(event: DragEndEvent): string | null {
  const collisions = event.collisions ?? [];

  const taskHit = collisions.find((c) => String(c.id).startsWith("task:"));
  if (taskHit) return String(taskHit.id);

  const overId = event.over?.id;
  return overId ? String(overId) : null;
}

function getBestOverData(event: DragEndEvent) {
  const collisions = event.collisions ?? [];

  const taskHit = collisions.find((c) => String(c.id).startsWith("task:"));
  const taskData =
    (taskHit as any)?.data?.value?.current ?? (taskHit as any)?.data?.current ?? undefined;

  const overData = event.over?.data?.current;

  return { taskData, overData };
}

export function useBoardDnd() {
  const moveTask = useMoveTaskOptimistic();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const task = event.active.data.current?.task as Task | undefined;
    if (!task) return;

    setActiveTask(task);
    if (navigator.vibrate) navigator.vibrate(10);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);

      const bestOverId = getBestOverId(event);
      if (!bestOverId) return;

      const activeData = event.active.data.current as
        | { taskId: number; fromColumn: ColumnId; task?: Task }
        | undefined;

      if (!activeData?.taskId || !activeData.fromColumn) return;

      const overParsed = parseId(bestOverId);
      const { taskData, overData } = getBestOverData(event);

      const toColumn =
        overParsed.type === "column"
          ? (overParsed.value as ColumnId)
          : overParsed.type === "task"
            ? ((taskData?.fromColumn ?? overData?.fromColumn) as ColumnId | undefined)
            : undefined;

      if (!toColumn) return;

      const overTaskId = overParsed.type === "task" ? Number(overParsed.value) : undefined;

      moveTask.mutate({
        id: activeData.taskId,
        fromColumn: activeData.fromColumn,
        toColumn,
        overTaskId,
      });
    },
    [moveTask],
  );

  const collisionDetection = useMemo(() => preferTasksCollision, []);

  return {
    sensors,
    activeTask,
    collisionDetection,
    handleDragStart,
    handleDragEnd,
  };
}
