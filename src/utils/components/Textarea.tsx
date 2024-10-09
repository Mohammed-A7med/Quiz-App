import React from "react"

export default function Textarea({
  children,
  onChange,
  className,
  name,
  value,
  rows = 3,
  label,
  disabled,
}: {
  children: JSX.Element
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  name: string
  value?: string
  rows?: number
  label?: string
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col">
      <div className={`flex items-center ${className} `}>
        <label className="bg-black text-white px-4 py-[32px] border-[3px] border-black rounded-s-lg">
          {label}
        </label>
        <textarea
          disabled={disabled}
          name={name}
          onChange={onChange}
          value={value}
          rows={rows}
          className="border-[3px] border-black rounded-e-lg p-2 w-full"
        />
      </div>
      <div className="text-red-500">{children}</div>
    </div>
  )
}
