import { useState } from 'react';

export const useAccordion = <T extends string | number>() => {
  const [expanded, setExpanded] = useState<T | null>(null);
  const toggle = (value: T) => setExpanded((prev) => (prev === value ? null : value));
  return { expanded, toggle };
};
