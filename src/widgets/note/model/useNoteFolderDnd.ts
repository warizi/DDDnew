import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { NoteCategoryEnum, NoteStore } from "@entities/note";
import { NoteQueryKey } from "@entities/note/model/NoteQueryKey";
import useUpdateNoteFolder from "@entities/note/model/useUpdateNoteFolder";
import { useNoteFolderSortByCate } from "@features/note";
import { NoteFolderType } from "@shared/db"
import { calcOrder } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";

const useNoteFolderDnd = (cate: NoteCategoryEnum) => {
  const data = useNoteFolderSortByCate(cate);
  const [ noteFolderData, setNoteFolderData ] = useState<NoteFolderType[]>([]);
  const [ activeNoteFolder, setActiveNoteFolder ] = useState<NoteFolderType | null>(null);
  const noteStore = useRecoilValue(NoteStore);

  const queryClient = useQueryClient();
  const { mutate } = useUpdateNoteFolder();

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "noteFolder") {
      setActiveNoteFolder(event.active.data.current?.noteFolder);
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeNoteFolderId = active.id;
    const overNoteFolderId = over.id;

    if (activeNoteFolderId === overNoteFolderId) return;

    setNoteFolderData((prev) => {
      const activeIndex = prev.findIndex((noteFolder) => noteFolder.id === activeNoteFolderId);
      const overIndex = prev.findIndex((noteFolder) => noteFolder.id === overNoteFolderId);

      const updatedClientNoteFolderList = arrayMove(prev, activeIndex, overIndex);

      const newUpdateNoteFolder = calcOrder(updatedClientNoteFolderList, activeNoteFolderId);

      mutate(newUpdateNoteFolder, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [NoteQueryKey.NoteFolder, noteStore.activeNoteCategory]
          });
        }
      });

      return updatedClientNoteFolderList;
    })

    setActiveNoteFolder(null);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  )
  useEffect(() => {
    if (data) {
      setNoteFolderData(data);
    }
  }, [data]) 
  return {
    noteFolderData,
    setNoteFolderData,
    sensors,
    handleDragStart,
    handleDragEnd,
    activeNoteFolder,
  }
}

export default useNoteFolderDnd;