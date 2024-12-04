
// header
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

// sidebar
export const SidebarItemStyle = {
  container: (isActive: boolean) => ({
    width: "100%",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: isActive ? "rgb(203, 213, 225)" : "transparent",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "rgb(148, 163, 184)",
    },
  } as const),
  link: {
    textDecoration: "none",
    color: "black",
  }
};

export const SidebarStyle = {
  constainer: {
    width: "60px",
    height: "calc(100vh - 50px)",
    backgroundColor: "white",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
    paddingTop: "2px"
  },
  nav: {
    width: "100%"
  }
}

// main 
export const MainStyle = {
  container: {
    width: "100%",
    height: "calc(100vh - 50px)",
    display: "flex",
    flexDirection: "row",
  },
  content: {
    width: "calc(100% - 60px)",
    height: "100%",
    backgroundColor: "rgb(243 244 246)",
  }
} as const;