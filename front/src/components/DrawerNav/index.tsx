'use client'
import { useState } from "react"
import Image from "next/image"
import imageLogo from '@/public/assets/image-removebg-preview.png'
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';

function DrawerNav() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };


  return (
    <div>
        <button 
            className="fixed top-4 left-4 p-2 text-gray-800 bg-gray-300 rounded-md z-50 md:hidden" 
            onClick={toggleMenu}
        >
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
        </button>

    <aside className={`flex flex-col w-64 md:h-screen h-[100%] px-5 pt-4  bg-second shadow-xl border-r rtl:border-r-0 rtl:border-l fixed z-50 top-0 left-0
        transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        onClick={toggleMenu}>
        <div className="flex justify-start w-full">
            <Image className="w-14 h-12" src={imageLogo} alt="logo"/>
        </div>
        

        <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="-mx-3 space-y-6 ">
                <div className="space-y-3 ">
                    <label className="px-3 text-xs text-gray-500 uppercase">analytics</label>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <HomeIcon/>
                        <span className="mx-2 text-sm font-medium">Inicio</span>
                    </a>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <QueryStatsIcon/>
                        <span className="mx-2 text-sm font-medium">Historico de gastos</span>
                    </a>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <QueryStatsIcon/>
                        <span className="mx-2 text-sm font-medium">Historico de ingresos</span>
                    </a>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <QueryStatsIcon/>
                        <span className="mx-2 text-sm font-medium">Historico de Metas y ahorro</span>
                    </a>
                </div>

                <div className="space-y-3 ">
                    <label className="px-3 text-xs text-gray-500 uppercase">content</label>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <ManageAccountsIcon/>
                        <span className="mx-2 text-sm font-medium">Mi perfil</span>
                    </a>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <ArticleIcon/>
                        <span className="mx-2 text-sm font-medium">Recursos</span>
                    </a>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        <EventIcon/>
                        <span className="mx-2 text-sm font-medium">Calendario</span>
                    </a>
                </div>
            </nav>
        </div>
    </aside>
    </div>
  )
}

export default DrawerNav