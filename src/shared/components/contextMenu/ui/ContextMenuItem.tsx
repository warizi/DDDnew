/** @jsxImportSource @emotion/react */

const Style = {
  width: "100%",
  height: "25px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  lineHeight: "25px",
  fontSize: "12px",
  cursor: "pointer",
  padding: "0 8px",
  stroke: "#B4B4B4",
  color: "#d9d9d9",
  "& span": {
    display: "block",
    width: "100%",
    textAlign: "left",
  },
  ":hover": {
    color: "#fff",
    stroke: "#fff",
    backgroundColor: "#000000",
  }
} as const;

function ContextMenuItem({
  icon,
  text,
  onClick,
}: {
  icon?: React.ReactNode,
  text: string
  onClick?: () => void
}) {
  const handleClick = () => {
    onClick && onClick();
  }
  return (
    <div css={Style}
      onClick={(event) => {
        if (!onClick) event.stopPropagation();
        handleClick();
      }}
    >
      {icon}
      <span>
        {text}
      </span>
    </div>
  );
};

export default ContextMenuItem;