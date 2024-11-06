import {ComponentPropsWithRef} from 'react'


export default function Button({
    children,
    className,
    ...props
}:ComponentPropsWithRef<"button">) {
  return (
    <button className={`border border-gray-600 rounded px-3 py-1 hover:bg-gray-800 active:bg-gray-700 `}>
     {children}
    </button>
  )
} 