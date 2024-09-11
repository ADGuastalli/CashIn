interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
    return(
        <input 
            className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-2 px-4 mx-2 my-2 block w-full appearance-none leading-normal
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"  
            {...props}
        />
    )
}