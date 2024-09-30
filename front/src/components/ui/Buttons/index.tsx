interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
import React from "react";

export function Button_actions_rounded({ children, ...props }: Props) {
  return (
    <button
      className="flex justify-center items-center lg:w-32 lg:h-32 md:w-24 md:h-24 h-10 w-10 bg-actions shadow-lg text-white 
            py-2 px-2 mx-4 my-4 rounded-full"
      {...props}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            className: "w-6 h-6",
          })
        : children}
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

// Define the Props interface for TypeScript
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button_actions({ children, ...props }: Props) {
  return (
    <button
      className="
        flex justify-center 
        w-full 
        bg-actions 
        text-aux_actions 
        py-2 px-1 
        mx-2 my-2 
        rounded-sm 
        transition-all 
        duration-300 
        hover:bg-actions-hover 
        md:py-2 md:px-6 
        lg:py-2 lg:px-8
      "
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
      className="font-bold rounded-xl bg-second text-white px-4 py-2 m-2 text-sm 
      transition-transform duration-300 transform hover:scale-105 w-full sm:w-auto"
    >
      MENU
    </button>
  );
}

export function Button_LeerMAs() {
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
