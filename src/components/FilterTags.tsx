
import React from 'react';
import { FilterTag } from '../models';

interface FilterTagsProps {
  filters: FilterTag[];
  onFilterSelect: (query: string) => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({ filters, onFilterSelect }) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto hide-scrollbar pb-1 gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className="filter-tag whitespace-nowrap min-w-fit"
          onClick={() => onFilterSelect(filter.query)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;
