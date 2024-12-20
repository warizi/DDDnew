/** @jsxImportSource @emotion/react */

type SelectData = {
  value: string,
  label: string
}
const Style = {
  select: {
    minWidth: "100px",
    height: "30px",
    backgroundColor: '#21242A',
    border: "1px solid #D9D9D9",
    borderRadius: '5px',
    color: "white",
    padding: "0 10px",
    outLine: "none",
    cursor: "pointer",
  } as const,
  option: {
    width: "100%",
    height: "30px",
    backgroundColor: '#21242A',
  }
}

function Select(
  { 
    data,
    value,
    name,
    id,
    onChange, 
    placeholder = "",
    style
  }: { 
    data: SelectData[],
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
    id?: string
    name?: string
    placeholder?: string 
    style?: React.CSSProperties
  }
) {
  return (
    <select 
      css={{...Style.select, ...style}}
      name="" 
      id="" 
      onChange={onChange}
      value={value}
    >
      {
        placeholder && (
          <option 
            css={{...Style.option}}
            value=""
          >
            {placeholder}
          </option>
        )
      }
      {data.map((item, index) => (
        <option 
          css={{...Style.option}}
          key={index} 
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;