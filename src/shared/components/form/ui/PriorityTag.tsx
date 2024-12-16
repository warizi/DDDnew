/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  priorityTag: css`
    width: fit-content;
    height: 20px;
    padding: 0 8px;
    border: 1px solid;
    border-radius: 4px;
    font-size: 0.875rem;
    text-align: center;
    line-height: 20px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-weight: bold;
  `,
  highPriority: css`
    background-color: #fca5a5; /* bg-rose-300 */
    color: #991b1b; /* text-rose-800 */
    border-color: #b91c1c; /* border-rose-600 */
  `,
  mediumPriority: css`
    background-color: #fde68a; /* bg-amber-300 */
    color: #92400e; /* text-amber-800 */
    border-color: #f59e0b; /* border-amber-600 */
  `,
  lowPriority: css`
    background-color: #a7f3d0; /* bg-emerald-300 */
    color: #064e3b; /* text-emerald-800 */
    border-color: #10b981; /* border-emerald-600 */
  `,
  defaultPriority: css`
    background-color: #6b7280; /* bg-gray-500 */
    color: #ffffff; /* text-white */
  `,
};

const PriorityTag = ({
  value,
  onClick,
}: {
  value: string;
  onClick?: () => void;
}) => {
  const getPriorityStyle = (value: string) => {
    switch (value) {
      case "HIGH":
        return styles.highPriority;
      case "MEDIUM":
        return styles.mediumPriority;
      case "LOW":
        return styles.lowPriority;
      default:
        return styles.defaultPriority;
    }
  };

  return (
    <div
      css={css`
        ${styles.priorityTag};
        ${getPriorityStyle(value)};
      `}
      onClick={onClick}
    >
      {value.toUpperCase()}
    </div>
  );
};

export default PriorityTag;
