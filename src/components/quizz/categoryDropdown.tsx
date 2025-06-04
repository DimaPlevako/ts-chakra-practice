import React, { useState } from "react";
import { Box, NativeSelect } from "@chakra-ui/react";

interface MakeDropdownProps {
    categories: string[];
    onCategoryChange: (category: string) => void;
}

const MakeDropdown: React.FC<MakeDropdownProps> = ({ categories, onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const handleValueChange = (value: string) => {
        setSelectedCategory(value);
        onCategoryChange(value);
    };

    const categoryCollection = categories.map((category) => ({
        key: category,
        value: category
    }));

    return (
        <Box mb={4}>
            <NativeSelect.Root size="sm">
                <NativeSelect.Field placeholder="Select option"
                    value={selectedCategory}
                    onChange={(e) => handleValueChange(e.target.value)}
                >
                    {categoryCollection.map((category) => (
                        <option key={category.key} value={category.value}>
                            {category.value}
                        </option>
                    ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
            </NativeSelect.Root>
        </Box>
    );
};

export default MakeDropdown;