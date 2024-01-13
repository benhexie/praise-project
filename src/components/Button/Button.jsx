import { forwardRef } from "react"
import "./Button.css"

const Button = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <button className={`custom__button ${className}`} ref={ref} {...props}>
      {children}
    </button>
  );
})

export default Button