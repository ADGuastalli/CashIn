interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
  return (
    <input
      className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 pl-8 text-lg px-4 mx-2 my-2 block w-96 appearance-none leading-normal
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      {...props}
    />
  );
}

export function Input_profile(props: Props) {
  return (
    <input
      className="block py-2.5 px-0 w-96 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#0095a9]
             dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      {...props}
    />
  );
}
