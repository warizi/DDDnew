/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";
import { useRef, useEffect } from "react";

const Style: CSSObject = {
  width: "100%",
  minHeight: "50px",
  resize: "none", // 사용자가 직접 크기를 조정하지 못하도록 설정
  overflow: "hidden", // 스크롤 숨기기
};

function Textarea({
  value,
  name,
  onChange,
  placeholder,
  css: customCss = {},
  ...rest
}: {
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  css?: CSSObject;
  rest?: any;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 높이 자동 조정
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px"; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 따라 높이 설정
    }
  };

  // 내용 변경 시 높이 조정
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      css={{ ...Style, ...customCss }}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange && onChange(e); // 부모에서 전달받은 onChange 실행
        adjustHeight(); // 높이 조정
      }}
      {...rest}
    />
  );
}

export default Textarea;
