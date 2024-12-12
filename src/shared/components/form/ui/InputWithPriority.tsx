/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TodoPriority } from "@shared/db/model/types";
import { ExclamationIcon } from "@shared/icon";
import { useState } from "react";
import PriorityTag from "./PriorityTag";

const styles = {
  container: css`
    position: relative;
    width: 100%;
    border-radius: 0.375rem;
    &:hover {
      background-color: #f7f9fb;
      border-radius: 0.375rem;
      cursor: pointer;
    }
  `,
  inputWrapper: css`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    align-items: center;
    overflow: hidden;
  `,
  input: css`
    height: 30px;
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  `,
  priorityOptions: css`
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    width: fit-content;
    position: absolute;
    transition: transform 0.3s ease-in-out;
    right: -250px;
  `,
  priorityOptionsOpen: css`
    transform: translateX(-250px);
  `,
};

const InputWithPriority = ({
  name,
  value: initialValue,
  onChange,
}: {
  name: string;
  value: TodoPriority | null | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [value, setValue] = useState<TodoPriority | null | undefined>(initialValue);

  const handlePriorityOpen = () => {
    setIsPriorityOpen(!isPriorityOpen);
  };

  const renderSelectedPriority = (priority: TodoPriority | null | undefined) => {
    if (priority === TodoPriority.HIGH) return <PriorityTag value={TodoPriority.HIGH} />;
    if (priority === TodoPriority.MEDIUM) return <PriorityTag value={TodoPriority.MEDIUM} />;
    if (priority === TodoPriority.LOW) return <PriorityTag value={TodoPriority.LOW} />;
    return null;
  };

  const handlePrioritySelect = (priority: TodoPriority) => {
    const newValue = value === priority ? null : priority;
    setValue(newValue);

    // Trigger the onChange event with the new value
    onChange({
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLInputElement>);

    setIsPriorityOpen(false);
  };

  return (
    <div css={styles.container}>
      <div css={styles.inputWrapper} onClick={handlePriorityOpen}>
        <ExclamationIcon />
        <input
          type="text"
          name={name}
          css={{...styles.input, ...(value && { display: "hidden" })}}
          placeholder="중요도"
          value={value || ""}
          onChange={onChange}
          readOnly
        />
        {/* {renderSelectedPriority(value)} */}
        <div
          css={css`
            ${styles.priorityOptions};
            ${isPriorityOpen && styles.priorityOptionsOpen};
          `}
        >
          <PriorityTag value={TodoPriority.HIGH} onClick={() => handlePrioritySelect(TodoPriority.HIGH)} />
          <PriorityTag value={TodoPriority.MEDIUM} onClick={() => handlePrioritySelect(TodoPriority.MEDIUM)} />
          <PriorityTag value={TodoPriority.LOW} onClick={() => handlePrioritySelect(TodoPriority.LOW)} />
        </div>
      </div>
    </div>
  );
};

export default InputWithPriority;