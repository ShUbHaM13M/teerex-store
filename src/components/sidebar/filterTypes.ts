

type FilterType = {
    label: string;
    options: string[];
}

export const filters: FilterType[] = [
    {
        label: "Color",
        options: ["Red", "Blue", "Green"],
    },
    {
        label: "Gender",
        options: ["Men", "Women"],
    },
    {
        label: "Price",
        options: ["Rs 0 - 250", "Rs 250 - 450", "Rs 450"]
    },
    {
        label: "Type",
        options: ["Polo", "Hoodie", "Basic"]
    }
]
