export const TodoCateStyle = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    height: "40px",
    lineHeight: "40px",
    padding: "0 10px 0 30px",
    margin: "0",
    stroke: "#EFEFEF",
    fontSize: "12px",
    backgroundColor: "#2F3645",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#40495F",
      cursor: "pointer"
    }
  } as const,
  dragging: {
    backgroundColor: "#384151",
    cursor: "pointer",
    border: "1px dashed #000",
    opacity: 0.5,
    transform: "scale(0.9)",
  },
  input: {
    fontSize: '12px',
    height: '30px',
    lineHeight: '30px',
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #d9d9d9',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'white',
  } as const,
  span: {
    fontSize: "12px",
    width: "100%",
    color: "#EFEFEF",
  } as const,
  deleteBtn: {
    stroke: "#DE4747",
    cursor: "pointer",
    borderRadius: "8px",
    opacity: 0,
    transform: "translateX(5px)",
    ":hover": {
      opacity: 1,
      backgroundColor: "#2F3645",
    }
  } as const,
}