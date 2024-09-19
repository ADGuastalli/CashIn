import React from 'react'
import { IUserProfile } from '@/interface/interfaceUser'
import { Button_actions } from '../ui/Buttons'
import Image from 'next/image'

function HeaderProfile({user} : {user: IUserProfile}) {
    const status = {
        nivel_1: "Pobreza",
        nivel_2: "Endeudamiento",
        nivel_3: "Sobrevivencia Financiera",
        nivel_4: "Estabilidad financiera",
        nivel_5: "Seguridad financiera",
        nivel_6: "Independencia financiera",
        nivel_7: "Libertad financiera",
    }
    return (
    <div className='flex flex-col-reverse items-center md:flex-row justify-between  w-screen h-auto px-4 py-4 md:pl-72 md:pr-10 bg-white shadow-md'>
        <div>
            <h2>Analisis de bienestar financiero</h2>
            <p>Status</p>
            <div className='flex flex-row-reverse justify-around items-center mt-4'>
                <div className='inline-flex items-center justify-center aspect-square rounded-full border-2 border-gray-400 px-2'>
                    <span className='text-xs'>4.3</span>
                </div>
                <div>
                    {status.nivel_1}
                </div>
            </div>
        </div>
        <div>
            <div className='flex justify-around  mb-4'>
                <div>
                    <h3>Bienvenido {user.name} !!</h3>
                    <button className='text-xs'>cerrar sesion</button>
                </div>
                <div className='ml-4'>
                    <Image className="w-12 h-12 rounded-full bg-slate-500" src="" alt="avatar"/>
                </div>
            </div>
            <Button_actions> Solicitar asesoria financiera </Button_actions>
        </div>
    </div>
  )
}

export default HeaderProfile