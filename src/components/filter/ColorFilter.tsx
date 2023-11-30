interface ColorFilterProps {
  option: string;
  label: string;
  type: string;
  onFilterItemClick: (e: any) => void;
}

export default function ColorFilter({
  option,
  label,
  type,
  onFilterItemClick,
}: ColorFilterProps) {
  return (
    <div style={{ backgroundColor: option }} className="color-filter-btn">
      <input
        type="checkbox"
        data-attribute={label}
        data-type={type}
        className="color-filter-btn"
        style={{ opacity: 0 }}
        onClick={onFilterItemClick}
        title={option}
        value={option}
      />
    </div>
  );
}
