interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button_actions_rounded({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center items-center w-32 h-32 bg-actions shadow-lg text-white 
            py-8 px-8 mx-4 my-4 rounded-full "
      {...props}
    >
      {children}
    </button>
  );
}

export function Button_rounded({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center  py-8 px-8 mx-4 my-4 rounded-full bg-inherit text-sm
         hover:shadow-primary shadow-xl"
      {...props}
    >
      {children}
    </button>
  );
}

export function Button_actions({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center w-full bg-actions  text-aux_actions 
         py-2 px-4 mx-2 my-2 rounded-sm"
      {...props}
    >
      {children}
    </button>
  );
}

export function Button_action({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center w-full bg-actions text-white 
      py-2 px-4 mx-2 my-2 rounded-sm transition-transform duration-300 transform 
      hover:scale-105 hover:shadow-xl"
      {...props}
    >
      {children}
    </button>
  );
}

export function Button_forms({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center min-w-96 bg-second  hover:bg-primary text-white 
         py-2 px-4 mx-2 my-2 rounded-sm"
      {...props}
    >
      {children}
    </button>
  );
}
export function Button_forms_inactivo({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center w-full bg-inherit  text-second 
         py-2 px-4 mx-2 my-2 rounded-sm border-dashed border-2"
      {...props}
    >
      {children}
    </button>
  );
}

export function Button_nadvar({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center w-full font-bold bg-inherit text-second py-2 mx-4 my-2 text-xl 
      transition-transform duration-300 transform hover:scale-105
                "
      {...props}
    >
      {children}
    </button>
  );
}

export function Button_Menu() {
  return (
    <button
      className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
    >
      MENU
    </button>
  );
}

export function Button_LeerMAs({ children, ...props }: Props) {
  return (
    <button
      className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
    >
      LEER MÁS
    </button>
  );
}

export function Button_Home() {
  return (
    <button
      className="font-bold rounded-xl bg-[#A0E4EB] text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105"
    >
      HOME
    </button>
  );
}
