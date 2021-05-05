import Fuse from 'fuse.js';
import { SelectSearchOption } from 'react-select-search';

/**
 * Fuzzy search for SelectSearch component
 *
 * @param options - select search options for search
 */
export default function fuzzySearch(options: SelectSearchOption[]): (value: string) => SelectSearchOption[] {
  const fuse = new Fuse(options, {
    keys: ['name', 'groupName', 'items.name'],
    threshold: 0.3,
  });

  return (value: string) => {
    if (!value.length) {
      return options;
    }

    return fuse.search(value)
      .map(result => result.item);
  };
}
