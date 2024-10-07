'use client'
import React from 'react'
import { Item_rounded } from '../ui/Items/Items'
import { AsignaImagenes } from '@/helpers/categorias'
import Image from 'next/image'

function ProgresoDeTusFinanzas() {

    return (
    <div className='flex flex-col  w-screen h-auto px-4 py-4 mt-6 md:pl-72 md:mr-4 bg-white shadow-md'>   
        
        <div className='flex'>
            <h2 className='mx-4'>Progreso de tus finanzas</h2>
            <div className='flex justify-around '>
             <p className='mr-2 px-2'><span className='bg-green-600  text-green-600 aspect-square rounded-full  px-2 mx-2 '>.</span>En control</p>      
             <p className='mr-2 px-2'><span className='bg-red-600  text-red-600 aspect-square rounded-full  px-2 mx-2 '>.</span>Te excediste</p>      
             <p className='mr-2 px-2'><span className='bg-yellow-500  text-yellow-500 aspect-square rounded-full  px-2 mx-2 '>.</span>Cerca del limite</p>      
            </div>
        </div>
        <div className='w-[60vw] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 my-6'>
            {
                AsignaImagenes.map((expense,index)=>(
                    <div key={index} className='flex flex-col justify-start mr-4 text-center max-w-[5rem]'>
                        <Item_rounded color='ingresos'>
                            <span className='min-w-12 flex justify-center'>
                                <Image src={expense.img} alt={expense.tipo}/>
                            </span>
                        </Item_rounded>
                        <p>{expense.tipo}</p>
                    </div>  
                ))
            }
        </div>
    </div>
  )
}

export default ProgresoDeTusFinanzas