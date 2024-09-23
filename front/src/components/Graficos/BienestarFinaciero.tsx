
import React from 'react'
import {RadialBarChart, RadialBar, ResponsiveContainer} from 'recharts'

const data = [
    {
      "name": "18-24",
      "uv": 64,
      "pv": 2400,
      "fill": "#8884d8"
    },

  ]
function BienestarFinaciero() {
  return (
    <ResponsiveContainer width="70%" height={300} className='flex flex-col justify-end '>
  
    <RadialBarChart 
    width={430} 
    height={100} 
    innerRadius="65%" 
    outerRadius="85%" 
    data={data} 
    startAngle={180} 
    endAngle={50}
    title='Bienestar financiero'

    >
   
    <RadialBar  
        label={{ fill: '#000', position: 'center' , fontSize: '45'}}
        background
        fill='#8884d8'
        cornerRadius={5}
        dataKey='uv' >

        </RadialBar>
 
    </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default BienestarFinaciero