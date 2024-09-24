import React from 'react'
import {RadialBarChart, RadialBar, ResponsiveContainer} from 'recharts'

const data = [
    {
      "name": "18-24",
      "uv": 64,
      "pv": 2400,
      "fill": "#FFC843"
    },

  ]
function IndiceLiquidez() {
  return (
    
    <ResponsiveContainer width="70%" height={300}>
  
    <RadialBarChart 
    innerRadius="65%" 
    outerRadius="85%" 
    data={data} 
    startAngle={180} 
    endAngle={50}
    title='Indice liquidez'
    margin={{
      top:0,
      bottom:0
    }}
    >
   
    <RadialBar  
        label={{ fill: '#000', position: 'center' , fontSize: '45'}}
        background
        cornerRadius={5}
        dataKey='uv' >

        </RadialBar>
 
    </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default IndiceLiquidez