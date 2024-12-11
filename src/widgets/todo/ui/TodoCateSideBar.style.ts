
export const TodoCateSideBarStyle = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#545E6F",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "height 0.3s ease",
  } as const,
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as const
}