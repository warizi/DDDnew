/** @jsxImportSource @emotion/react */

import { CreateTodoCateBtn, ListTodoCate } from "@features/todo";
import { TodoCateSideBarStyle } from "./TodoCateSideBar.style";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import useListTodoDnd from "../model/useListTodoDnD";
import { createPortal } from "react-dom";
import { TodoCate } from "@entities/todo";
import { TodoCategoryType } from "@shared/db";
import { useEffect, useRef, useState } from "react";

function TodoCateSideBar({
  isActive
}: {
  isActive: boolean
}) {
  const {
    todoCates,
    todoCateIds,
    handleDragStart,
    sensors,
    handleDragEnd,
    activeTodoCate
  } = useListTodoDnd();
  const [ height, setHeight ] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const dropDownStyle = {
    height: isActive ? height + "px" : "0px",
  }
  
  useEffect(() => {
    setHeight(ref.current?.clientHeight as number);
  }, [todoCates])
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div css={{...TodoCateSideBarStyle.container, ...dropDownStyle}}>
        <div ref={ref} css={TodoCateSideBarStyle.innerContainer}>
          <ListTodoCate data={todoCates} todoCateIds={todoCateIds}/>
          <CreateTodoCateBtn />
        </div>
      </div>
      {
        createPortal(
          <DragOverlay>
            {
              activeTodoCate && 
              <TodoCate data={todoCates.find((cate) => cate.id === activeTodoCate.id) as TodoCategoryType} />
            }
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  );
};

export default TodoCateSideBar;