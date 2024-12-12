/** @jsxImportSource @emotion/react */

const Style = {
  width: '20px',
  height: '20px',
}

const LeftIcon = () => {
  return (
    <div css={Style}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </div>
  );
};

export default LeftIcon;