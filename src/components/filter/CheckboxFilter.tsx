interface CheckboxFilterProps {
  option: string;
  label: string;
  type: string;
  onFilterItemClick: (e: any) => void;
}

export default function CheckboxFilter({
  option,
  label,
  type,
  onFilterItemClick,
}: CheckboxFilterProps) {
  return (
    <>
      <input
        data-attribute={label}
        data-type={type}
        type="checkbox"
        name={option}
        id={option}
        value={option}
        onChange={onFilterItemClick}
      />
      <label htmlFor={option}>{option}</label>
    </>
  );
}
