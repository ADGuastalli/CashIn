
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


export function  Button_actions_rounded ({children, ...props}:Props) {
    return(
        <button
            className="flex justify-center  bg-actions  text-white 
            py-8 px-8 mx-4 my-4 rounded-full "
            {...props} 
            >
            {children}
        </button>
    )
  }

export function Button_rounded ({children, ...props}:Props) {
    return(
      <button
        className="flex justify-center  py-8 px-8 mx-4 my-4 rounded-full bg-inherit text-sm
         hover:shadow-primary shadow-xl"
         {...props} 
        >
          {children}
      </button>
    )
  }
 
  export function Button_Solicitud ({children, ...props}:Props) {
    return(
      <button
        className="flex justify-center w-full bg-green-600  text-white 
         py-2 px-4 mx-2 my-2 rounded-sm"
         {...props} 
        >
          {children}
      </button>
    )
  }

  export function Button_actions ({children, ...props}:Props) {
    return(
      <button
        className="flex justify-center w-full bg-actions  text-white 
         py-2 px-4 mx-2 my-2 rounded-sm"
         {...props} 
        >
          {children}
      </button>
    )
  }

  export function Button_forms ({children, ...props}:Props) {
    return(
      <button
        className="flex justify-center w-full bg-secondary  hover:bg-primary text-white 
         py-2 px-4 mx-2 my-2 rounded-sm"
         {...props} 
        >
          {children}
      </button>
    )
  }
  export function Button_forms_inactivo ({children, ...props}:Props) {
    return(
      <button
        className="flex justify-center w-full bg-inherit  text-secondary 
         py-2 px-4 mx-2 my-2 rounded-sm border-dashed border-2"
         {...props} 
        >
          {children}
      </button>
    )
  }
