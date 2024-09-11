interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({children, ...props}: Props){
    return(
        <label
            className="block test-sm text-gray-900"
            {...props}
        >
            {children}
        </label>
    )
}