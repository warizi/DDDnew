import React from "react";
import { atom } from "recoil";

const ContextMenuStore = atom({
  key: "ContextMenuStore",
  default: {
    isOpen: false,
    x: 0,
    y: 0,
    items: [] as React.ReactNode[],
  }
})

export default ContextMenuStore;