import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpdateNote } from "@entities/note";
import { NoteQueryKey } from "@entities/note/model/NoteQueryKey";
import useNoteSortByFolderId from "@features/note/model/useNoteSortByFolderId";
import { Id, NoteType } from "@shared/db/model/types";
import { calcOrder } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useNoteDnd = (folderId: Id) => {
  const data = useNoteSortByFolderId(folderId);
  const [ noteList, setNoteList ] = useState<NoteType[]>([]);
  const queryClient = useQueryClient();
  const { mutate } = useUpdateNote();
  const [ activeNote, setActiveNote ] = useState<NoteType | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(!over) return;

    const activeNoteId = active.id;
    const overNoteId = over.id;

    if(activeNoteId === overNoteId) return;

    setNoteList((prev) => {
      const activeIndex = prev.findIndex((note) => note.id === activeNoteId);
      const overIndex = prev.findIndex((note) => note.id === overNoteId);

      const updatedClientNoteList = arrayMove(prev, activeIndex, overIndex);

      const newUpdateNote = calcOrder(updatedClientNoteList, activeNoteId);

      mutate(newUpdateNote, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [NoteQueryKey.Note, folderId]
          });
        }
      });

      return updatedClientNoteList;
    });
  }

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "note") {
      setActiveNote(event.active.data.current?.note);
    }
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
      setNoteList(data)
    } else {
      setNoteList([])
    }
  }, [data])
  return {
    noteList,
    setNoteList,
    handleDragEnd,
    handleDragStart,
    sensors,
    activeNote,
    setActiveNote
  }
}

export default useNoteDnd
