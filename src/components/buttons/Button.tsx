interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
}

export const Button = ({ children, className, color, ...rest }: ButtonProps) => {

    return (
        <button className={`px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md uppercase transition-colors ${className}`} data-color={color} {...rest}>
            {children}
        </button>
    )
}
