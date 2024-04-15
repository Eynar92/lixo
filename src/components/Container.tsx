
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> { }

export const Container = ({ children, className, ...rest }: ContainerProps) => {
    return (
        <div className={`w-full max-w-5xl px-4 mx-auto ${className}`} {...rest}>
            {children}
        </div>
    )
}
