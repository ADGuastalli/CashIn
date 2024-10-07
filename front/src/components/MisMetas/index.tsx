'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Card_presupuesto from '../ui/Cards'
import { Button_action } from '../ui/Buttons'
import CardGoal from '../ui/CardGoal'
import MetaFromDashboard from '../IngresoMeta/MetaFormDashboard'
// se debiera traer info del usuario y sus metas 
import { Meta } from '@/interface/interfaceData'
import { useParams } from 'next/navigation'
import { getUserMetaAll } from '@/server/fetchMetas' 

function MisMetas({visible}: {visible:boolean}) {
  
    const [misMetas,setMisMetas] = useState<Meta[]>([]); 
    const [modalVisible,setModalVisible] = useState(false);

    const { userId } = useParams();
    
    useEffect(()=>{
        const fetchMetas = async () => {
            const response = await getUserMetaAll(userId as string);
            setMisMetas(response) 
        } 
        fetchMetas();
    },[modalVisible,userId])

    return (
    <div  className='flex flex-col  w-screen h-auto px-4 py-4 mt-6 md:pl-72 md:mr-4 bg-white shadow-md'>
        <div className='flex items-center'>
            <Card_presupuesto option='progreso'/>
            <h2 className='ml-4 font-bold text-2xl'>Mis Metas</h2>
        </div>        
        
        {
            modalVisible && (<MetaFromDashboard setModalVisible={setModalVisible} userId={userId as string}/>)
        }
        {
            visible && (
                <>
                    { misMetas.length == 0 ? (<>
                        <div className='flex w-full flex-col items-center sm:'>
                        <p>todavia no tienes metas agregadas</p>
                        <p>Es importante que añadas por lo menos una meta.</p>
                        <div>
                            {/* imagen cerdo */}
                            <Button_action onClick={()=>setModalVisible(true)}>Agregar meta</Button_action>
                        </div>
                        </div>
                    </>) : (
                        <>
                            {/* targeta avance de meta hay un variable de metas alcanzadas*/}
                            <div className='md:w-1/2 mt-2'>
                                {
                                    misMetas.map((meta,index) => (
                                        <CardGoal misMetas={meta} key={index} />
                                    ))
                                }
                            </div>
                        </>
                    )
                    
                    }
                </>
            )    
        }
    </div>
  )
}

export default MisMetas