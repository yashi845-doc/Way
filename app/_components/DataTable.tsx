"use client";

import { FormEvent, useMemo, useState } from "react";

type DataTableProps = {
  title: string;
  columns: string[];
  rows: Record<string, string | number>[];
};

export function DataTable({ title, columns, rows }: DataTableProps) {
  const [tableRows, setTableRows] = useState(rows);
  const [isOpen, setIsOpen] = useState(false);
  const editableColumns = useMemo(
    () => columns.filter((column) => column !== "ID"),
    [columns],
  );
  
  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const form = new FormData(event.currentTarget);
    const nextRow = columns.reduce<Record<string, string>>((row, column) => {
      if (column === "ID") {
        row[column] = createNextId(tableRows, title);
      } else {
        row[column] = String(form.get(column) ?? "");
      }

      return row;
    }, {});

    setTableRows((currentRows) => [...currentRows, nextRow]);
    setIsOpen(false);
  }

  return (
    <section className="overflow-hidden rounded-md bg-[#232839] shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between border-b border-[#353b4e] px-6 py-5">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded bg-[#096dff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e7bff]"
        >
          Add Data
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#1a2030] text-[#aeb6ca]">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-6 py-4 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#353b4e]">
            {tableRows.map((row, index) => (
              <tr key={`${title}-${index}`} className="hover:bg-[#2a3145]">
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4 text-[#d8deea]">
                    {row[column] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4">
          <div className="w-full max-w-xl rounded-md bg-[#232839] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Add Data</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-8 w-8 place-items-center rounded bg-[#151b2c] text-lg text-[#b9c1d4]"
              >
                x
              </button>
            </div>

            <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
              {editableColumns.map((column) => (
                <label key={column} className="block">
                  <span className="mb-2 block text-sm text-[#c6ccda]">
                    {column}
                  </span>
                  <input
                    name={column}
                    required
                    className="h-11 w-full rounded border border-[#3d455d] bg-[#151b2c] px-3 text-sm text-white outline-none placeholder:text-[#697289] focus:border-[#096dff]"
                  />
                </label>
              ))}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-11 rounded border border-[#3d455d] text-sm font-semibold text-[#c6ccda] transition hover:bg-[#151b2c]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-11 rounded bg-[#096dff] text-sm font-semibold text-white transition hover:bg-[#1e7bff]"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function createNextId(rows: Record<string, string | number>[], title: string) {
  const prefix = title
    .split(" ")[0]
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");

  return `${prefix}-${String(rows.length + 1).padStart(2, "0")}`;
}
