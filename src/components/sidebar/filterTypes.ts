
export type FilterType = {
    label: string;
    options: string[];
    type: "color" | "checkbox" | "range",
    range?: string[]
}

export const filters: FilterType[] = [
    {
        label: "Color",
        options: ["Red", "Blue", "Green", "Grey", "Pink", "Yellow", "Black", "Purple", "White"],
        type: "color",
    },
    {
        label: "Gender",
        options: ["Men", "Women"],
        type: "checkbox"
    },
    {
        label: "Price",
        options: ["Rs 0 - 250", "Rs 251 - 450", "Rs 450"],
        type: "range",
        range: ["0-250", "251-450", "450"]
    },
    {
        label: "Type",
        options: ["Polo", "Hoodie", "Basic"],
        type: "checkbox"
    }
]
