import React from 'react'
import Card_presupuesto from '../ui/Cards'
import { Button_action } from '../ui/Buttons'
import CardGoal from '../ui/CardGoal'
// se debiera traer info del usuario y sus metas 
function MisMetas({visible}: {visible:boolean}) {
  return (
    <div  className='flex flex-col  w-screen h-auto px-4 py-4 mt-6 md:pl-72 md:mr-4 bg-white shadow-md'>
        <div className='flex items-center'>
            <Card_presupuesto option='progreso'/>
            <h2 className='ml-4'>Mis Metas</h2>
        </div>        
        
        {
            visible && (<>Agregar metas</>)
        }
        { true ? (<>
            <div className='flex w-full justify-around items-center'>
            <p>Es importante que añadas por lo menos una meta.</p>
            <div>
                {/* imagen cerdo */}
                <p>todavia no tienes metas agregadas</p>
                <Button_action>Agregar meta</Button_action>
            </div>
            </div>
        </>) : (
            <>
                {/* targeta avance de meta hay un variable de metas alcanzadas*/}
                <div className='md:w-1/2 mt-2'>
                    <CardGoal/>
                </div>
            </>
        )
        
        }
       
    </div>
  )
}

export default MisMetas