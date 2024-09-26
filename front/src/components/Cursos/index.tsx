import Button from "@mui/material/Button";
import React from "react";

export default function CursosComponet() {
  return (
    <div className="grid grid-cols-3 grid-rows-5 gap-12">
      <div className="col-span-2 row-span-2 bg-white p-5 rounded-lg flex flex-col justify-center ">
        <h3 className="text-xl font-bold text-left">Cursos 1</h3>
        <p className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
          laboriosam corrupti esse ipsam magnam excepturi, consequatur, tempora
          ad provident assumenda laborum quae voluptatum itaque porro omnis
          aliquam enim rem odit.
        </p>
        <Button
          size="small"
          className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105 mt-5 w-40"
        >
          Leer más
        </Button>
      </div>
      <div className="row-span-2 col-start-3 bg-white p-5 rounded-lg flex flex-col">
        <h3 className="text-xl font-bold text-left">Cursos 2</h3>
        <p className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
          laboriosam corrupti esse ipsam magnam excepturi, consequatur, tempora
          ad provident assumenda laborum quae voluptatum itaque porro omnis
          aliquam enim rem odit.
        </p>
        <Button
          size="small"
          className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105 mt-5 w-40"
        >
          Leer más
        </Button>
      </div>

      <div className="row-span-2 col-start-1 row-start-3 bg-white p-5 rounded-lg flex flex-col">
        <h3 className="text-xl font-bold text-left">Cursos 3</h3>
        <p className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
          laboriosam corrupti esse ipsam magnam excepturi, consequatur, tempora
          ad provident assumenda laborum quae voluptatum itaque porro omnis
          aliquam enim rem odit.
        </p>
        <Button
          size="small"
          className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105 mt-5 w-40"
        >
          Leer más
        </Button>
      </div>
      <div className="col-span-2 row-span-2 col-start-2 row-start-3 bg-white p-5 rounded-lg flex flex-col justify-center ">
        <h3 className="text-xl font-bold text-left">Cursos 4</h3>
        <p className="text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
          laboriosam corrupti esse ipsam magnam excepturi, consequatur, tempora
          ad provident assumenda laborum quae voluptatum itaque porro omnis
          aliquam enim rem odit.
        </p>
        <Button
          size="small"
          className="font-bold rounded-xl bg-second text-white px-6 py-1 m-2 text-xl 
      transition-transform duration-300 transform hover:scale-105 mt-5 w-40"
        >
          Leer más
        </Button>
      </div>
    </div>
  );
}
