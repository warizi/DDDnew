
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
    padding: "0 16px",
    lineHeight: "50px",
    cursor: "pointer",
    backgroundColor: isActive ? "#252C38" : "transparent",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#475671",
    },
  } as const),
  link: {
    textDecoration: "none",
    color: "white",
  }
};

export const SidebarStyle = {
  constainer: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#384151",
    color: "white",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
    paddingTop: "2px"
  },
  logo: {
    width: "100%",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  nav: {
    width: "100%"
  }
}

// main 
export const MainStyle = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
  },
  content: {
    width: "calc(100% - 250px)",
    height: "100%",
    backgroundColor: "#272B32",
  }
} as const;