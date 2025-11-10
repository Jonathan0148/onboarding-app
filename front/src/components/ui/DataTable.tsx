'use client';

import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  emptyMessage = 'No hay registros disponibles.',
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 border-b text-gray-600">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={`py-3 px-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                {columns.map((col, j) => {
                  const value =
                    typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as ReactNode);
                  return (
                    <td key={j} className={`py-2 px-4 ${col.className || ''}`}>
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-6"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
