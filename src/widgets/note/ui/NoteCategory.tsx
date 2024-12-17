/** @jsxImportSource @emotion/react */
import { NoteCategoryEnum, NoteStore } from "@entities/note";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

const Style = {
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
  } as const,
  itemContainer: {
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
      cursor: "pointer",
    },
  } as const,
};

function NoteCategory({ isActive }: { isActive: boolean }) {
  const [ noteStore, setNoteStore ] = useRecoilState(NoteStore);
  const [height, setHeight] = useState<number | undefined>(0);
  const ref = useRef<HTMLUListElement>(null);

  const returnActiveStyle = (cate: NoteCategoryEnum) => {
    return noteStore.activeNoteCategory === cate ? { backgroundColor: "#5C6B8A" } : {};
  }
  const handleSelectCate = (cate: NoteCategoryEnum) => {
    setNoteStore({
      ...noteStore,
      activeNoteCategory: cate,
      activeNoteFolderId: "",
    });
  }

  useEffect(() => {
    if (isActive) {
      setHeight(ref.current?.scrollHeight); // 콘텐츠의 실제 높이 설정
    } else {
      setHeight(0); // 닫을 때 높이를 0으로 설정
    }
  }, [isActive]);

  return (
    <div
      css={{
        ...Style.container,
        height: height !== undefined ? height + "px" : "auto",
      }}
    >
      <ul css={Style.innerContainer} ref={ref}>
        <li 
          css={{...Style.itemContainer, ...returnActiveStyle(NoteCategoryEnum.PROJECT)}}
          onClick={() => handleSelectCate(NoteCategoryEnum.PROJECT)}
        >
          {NoteCategoryEnum.PROJECT}
        </li>
        <li 
          css={{...Style.itemContainer, ...returnActiveStyle(NoteCategoryEnum.AREA)}}
          onClick={() => handleSelectCate(NoteCategoryEnum.AREA)}
        >
          {NoteCategoryEnum.AREA}
        </li>
        <li 
          css={{...Style.itemContainer, ...returnActiveStyle(NoteCategoryEnum.RESOURCE)}}
          onClick={() => handleSelectCate(NoteCategoryEnum.RESOURCE)}
        >
          {NoteCategoryEnum.RESOURCE}
        </li>
        <li 
          css={{...Style.itemContainer, ...returnActiveStyle(NoteCategoryEnum.ARCHIVE)}}
          onClick={() => handleSelectCate(NoteCategoryEnum.ARCHIVE)}
        >
          {NoteCategoryEnum.ARCHIVE}
        </li>
      </ul>
    </div>
  );
}

export default NoteCategory;
