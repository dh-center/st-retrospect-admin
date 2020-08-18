import { useMemo } from 'react';

let idCounter = 0;

const useUniqueId = (prefix: string): (name: TemplateStringsArray) => string => {
  const id = useMemo(() => idCounter++, [ prefix ]);

  return (name) => `${prefix}-${id}-${name}`;
};

export default useUniqueId;
