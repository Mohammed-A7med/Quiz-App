import React from "react"

export default function Select({
  children,
  onChange,
  className,
  name,
  value,
  label,
  options,
  disabled,
}: {
  children: JSX.Element
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  name: string
  value?: string
  label: string
  options: { value: string; label: string }[]
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col">
      <div className={`flex items-center ${className}`}>
        <label
          className={`min-w-fit bg-black text-white px-4 py-2 border-[2px] border-black rounded-s-lg`}
        >
          {label}
        </label>
        <select
          disabled={disabled}
          name={name}
          onChange={onChange}
          value={value}
          className="border-[3px] border-black rounded-e-lg p-2 w-full"
        >
          <option value="" disabled hidden>
            Choose
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="text-red-500">{children}</div>
    </div>
  )
}
