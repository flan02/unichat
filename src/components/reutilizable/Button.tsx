import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef } from "react"

interface ButtonProps<T extends React.ElementType> {
  as?: T // T allows to pass generic type
}

// $ React utility type: ComponentPropsWithoutRef<"button"> is a type that extracts the props of a button element and spreads them into the own Button component.

// * Common way to create a button component and pass html props to it
/*
const Button = (props: ComponentPropsWithoutRef<"button">) => {
  return <button {...props} />
}
*/

// * Advanced way with generics and union types
const Button = <T extends React.ElementType = "button">({ as, ...props }: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => { // Omit removes duplicates from the union of the two types
  const Component = as || "button" // ? If as = Link it will render a Link component with the props passed to the Button component
  return <Component {...props} className={cn("bg-pink-300 text-slate-200 p-[0.875rem] rounded-md active:bg-pink-400 disabled:bg-gray-200 flex items-center justify-center gap-2", props.className)} />

}

export default Button