interface CheckboxFilterProps {
  option: string;
  label: string;
  type: string;
  range?: string;
  onFilterItemClick: (e: any) => void;
}

export default function CheckboxFilter({
  option,
  label,
  type,
  range,
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
        value={range ? range : option}
        onChange={onFilterItemClick}
      />
      <label htmlFor={option}>{option}</label>
    </>
  );
}
