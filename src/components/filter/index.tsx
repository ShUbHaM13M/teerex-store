import { useCallback, ChangeEvent } from "react";
import { useStore } from "../../context/StoreContext";
import { FilterType } from "../sidebar/filterTypes";
import CheckboxFilter from "./CheckboxFilter";
import ColorFilter from "./ColorFilter";
import "./Filter.css";

const filterComponent: { [key: string]: (props?: any) => JSX.Element } = {
  color: ColorFilter,
  checkbox: CheckboxFilter,
  range: CheckboxFilter,
};

interface FilterProps {
  filters: FilterType[];
}

export default function Filter({ filters }: FilterProps) {
  const { updateFilters } = useStore();

  const onFilterItemClick = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const attribute = target.getAttribute("data-attribute")?.toLowerCase();

    if (attribute) {
      updateFilters(
        attribute,
        target.value.toLowerCase(),
        target.checked ? "add" : "remove"
      );
    }
  }, []);

  return filters.map(({ label, options, type, ...props }) => {
    const FilterComponent = filterComponent[type];

    return (
      <div className="filter-container" key={label}>
        <p className="filter-title">{label}</p>
        <div className={`filter-options ${type === "color" ? "row" : ""}`}>
          {options.map((option) => (
            <div key={option} className="filter">
              <FilterComponent
                option={option}
                label={label}
                type={type}
                onFilterItemClick={onFilterItemClick}
                {...props}
              />
            </div>
          ))}
        </div>
      </div>
    );
  });
}
