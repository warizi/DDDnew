export const HeaderStyle = {
  container: {
    width: "100%",
    height: "50px",
    backgroundColor: "white",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
  },
  header: {
    width: "100%",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
  },
  title: {
    fontSize: "1.125rem", // Tailwind's text-lg
    fontWeight: "bold",
  },
} as const;

export const SidebarItemStyle = {
  width: "100%",
  height: "50px",
  lineHeight: "50px",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "rgb(148 163 184)",
  }
}