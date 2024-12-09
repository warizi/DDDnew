/** @jsxImportSource @emotion/react */

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { TodoCate } from "@entities/todo";
import { TodoCategoryType } from "@shared/db";
import {CSS} from "@dnd-kit/utilities";
import { Id } from "@shared/db/model/types";

const containerStyle = {
  width: "100%",
  padding: "0",
  margin: "0",
  listStyle: "none",
}

function ListTodoCate({
  data,
  todoCateIds
}: {
  data: TodoCategoryType[]
  todoCateIds: Id[]
}) {

  return (
    <div>
      <ul css={containerStyle}>
        <SortableContext items={todoCateIds}>
          {data?.map((item) => (
            <TodoCate key={item.id} data={item} />
          ))}
        </SortableContext>
      </ul>
    </div>
  );
};

export default ListTodoCate;