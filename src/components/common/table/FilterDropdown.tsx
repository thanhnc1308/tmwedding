'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function FilterDropdown({
  label,
  paramKey,
  options,
}: {
  label: string;
  paramKey: string;
  options: { value: string; label: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentValue = searchParams?.get(paramKey) || '';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams!);
    params.set('page', '1');

    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      className='h-10 rounded-md border border-gray-200 px-3 text-sm text-gray-700 outline-2'
      aria-label={`Filter by ${label}`}
    >
      <option value=''>All</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
