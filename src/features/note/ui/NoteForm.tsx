/** @jsxImportSource @emotion/react */

import { useUpdateNote } from "@entities/note";
import { NoteQueryKey } from "@entities/note/model/NoteQueryKey";
import { CommonEditor, TipTap } from "@shared/components/editor";
import { Textarea } from "@shared/components/form";
import { NoteType } from "@shared/db/model/types";
import { debounce } from "@shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentEditor } from "@tiptap/react";
import { useCallback, useState } from "react";

const Style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '10px',
    width: '900px',
    gap: '10px',
  } as const,
  titleInput: {
    fontSize: '24px',
    fontWeight: '600',
    outline: 'none',
    border: "none",
    padding: "8px",
    borderBottom: "1px solid #B4B4B4",
    backgroundColor: "transparent",
  },
  descriptionInput: {
    outline: 'none',
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    backgroundColor: "#EFEFEF",
    resize: "none",
    lineHeight: "1.5",
  } as const
}

function NoteForm({
  data
}: {
  data: NoteType
}) {
  const [ values, setValues ] = useState<NoteType>(data);
  const queryClient = useQueryClient();
  const { mutate } = useUpdateNote();
  const { editor } = useCurrentEditor()

  const handleUpdate = (newValues: NoteType) => {
    mutate(newValues, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [NoteQueryKey.Note, values.noteFolderId]
        });
      }
    })
  }

  const debouncedUpdate = useCallback(
    debounce((newValues: NoteType) => handleUpdate(newValues), 500), []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const newValues = {
      ...values,
      [name]: value
    }
    setValues(newValues);

    // 디바운스 처리
    debouncedUpdate(newValues);
  }

  const handleEditerChange = (value: string) => {
    const newValues = {
      ...values,
      content: value
    }
    setValues(newValues);

    // 디바운스 처리
    debouncedUpdate(newValues);
  }

  return (
    <form css={Style.container} onSubmit={(e) => e.preventDefault()}>
      <input 
        css={Style.titleInput}
        type="text"
        value={values.title}
        name="title"
        onChange={handleChange}
      />
      {/* <Textarea
        css={Style.descriptionInput}
        name="content"
        value={values.content}
        onChange={handleChange}
      /> */}
      <CommonEditor 
        value={values.content}
        setValue={handleEditerChange}
      />
      {/* <TipTap /> */}
    </form>
  );
};

export default NoteForm;