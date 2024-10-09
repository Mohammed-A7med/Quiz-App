import React from "react"

export default function Input({
  children,
  onChange,
  className,
  name,
  type = "text",
  value,
  label,
  disabled,
}: {
  children: JSX.Element
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name: string
  type?: string
  value?: string
  label: string
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col">
      <div className={`flex items-center ${className}`}>
        <label className="bg-black text-white px-4 py-2 border-[3px] border-black rounded-s-lg">
          {label}
        </label>
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          className="border-[3px] border-black rounded-e-lg p-2 w-full"
          disabled={disabled}
        />
      </div>
      <div className="text-red-500 font-semibold">{children}</div>
    </div>
  )
}
