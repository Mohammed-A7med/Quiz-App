import React from "react"

export default function Button({
  text,
  icon,
  className,
  onClick,
  disabled,
  type = "button",
}: {
  text: string
  icon?: JSX.Element
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}) {
  return (
    <>
      <button
        className={`px-4 py-2 border-2 rounded-full text-lg flex justify-center items-center gap-3 hover:bg-[#000000] hover:text-white transition-all ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {icon ? icon : ""}
        {text}
      </button>
    </>
  )
}
