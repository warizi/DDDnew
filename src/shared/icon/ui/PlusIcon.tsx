/** @jsxImportSource @emotion/react */

const Container = {
  width: "30px",
  height: "30px",
}

const PlusIcon = () => {
  return (
    <div css={Container}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`size-5`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>
  );
};

export default PlusIcon;
