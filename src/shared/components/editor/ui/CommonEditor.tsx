/** @jsxImportSource @emotion/react */
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CommonMenuBar from './CommonMenuBar';
import { useEffect } from 'react';

const Style = {
  ".tiptap": {
      // ":first-child": {
      //   marginTop: 0,
      // },
      outline: "none",
      ul: {
        padding: "0 1rem",
        margin: "1.25rem 1rem 1.25rem 0.4rem",
        li: {
          p: {
            marginTop: "0.25em",
            marginBottom: "0.25em",
          },
        },
      },
      ol: {
        padding: "0 1rem",
        margin: "1.25rem 1rem 1.25rem 0.4rem",
        li: {
          p: {
            marginTop: "0.25em",
            marginBottom: "0.25em",
          },
        },
      },
      h1: {
        lineHeight: 1.1,
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        fontSize: "1.4rem",
      },
      h2: {
        lineHeight: 1.1,
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        fontSize: "1.2rem",
      },
      h3: {
        lineHeight: 1.1,
        marginTop: "1.5rem",
        fontSize: "1.1rem",
      },
      h4: {
        lineHeight: 1.1,
        marginTop: "1.5rem",
        fontSize: "1rem",
      },
      h5: {
        lineHeight: 1.1,
        marginTop: "1.5rem",
        fontSize: "1rem",
      },
      h6: {
        lineHeight: 1.1,
        marginTop: "1.5rem",
        fontSize: "1rem",
      },
      code: {
        backgroundColor: "#f4f4f4",
        borderRadius: "0.4rem",
        color: "var(--black)",
        fontSize: "0.85rem",
        padding: "0.25em 0.3em",
      },
      pre: {
        background: "black",
        borderRadius: "0.5rem",
        color: "white",
        fontFamily: "'JetBrainsMono', monospace",
        margin: "1rem 0",
        padding: "0.75rem 1rem",
        code: {
          background: "none",
          color: "inherit",
          fontSize: "0.8rem",
          padding: 0,
        },
      },
      blockquote: {
        borderLeft: "3px solid #ddd",
        margin: "1.5rem 0",
        paddingLeft: "1rem",
      },
      hr: {
        border: "none",
        borderTop: "1px solid #ddd",
        margin: "2rem 0",
      },
  }
}

function CommonEditor({
  value,
  setValue,
  readOnly = false
}: {
  value: string,
  setValue: (value: string) => void
  readOnly?: boolean
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
    editable: !readOnly,
  })

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);
  return (
    <div css={{...Style}}>
      {
        readOnly ? null : <CommonMenuBar editor={editor}/>
      }
      <EditorContent editor={editor}/>
    </div>
  );
};

export default CommonEditor;