import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
    {
      name: 'Page A',
      Gastos_fijos: 4000,
      Ingresos: 2400,
      Prestamos: 3500,
      Bienes: 2400,
    },
    {
      name: 'Page B',
      Gastos_fijos: 3000,
      Ingresos: 1398,
      Prestamos: 3500,
      Bienes: 2210,
    },
    {
      name: 'Page C',
      Gastos_fijos: 2000,
      Ingresos: 9800,
      Prestamos: 3500,
      Bienes: 2290,
    },
    {
      name: 'Page D',
      Gastos_fijos: 2780,
      Ingresos: 3908,
      Prestamos: 3500,
      Bienes: 2000,
    },
    {
      name: 'Page E',
      Gastos_fijos: 1890,
      Ingresos: 4800,
      Prestamos: 3500,
      Bienes: 2181,
    },
    {
      name: 'Page F',
      Gastos_fijos: 2390,
      Ingresos: 3800,
      Prestamos: 3500,
      Bienes: 2500,
    },
    {
      name: 'Page G',
      Gastos_fijos: 3490,
      Ingresos: 4300,
      Prestamos: 3500,
      Bienes: 2100,
    },
  ];

  type LegendType = {
    Gastos_fijos: string,
      Ingresos: string,
      Prestamos: string,
      Bienes: string,
  }
  const legendColors: LegendType = {
    Gastos_fijos: "#8884d8",
    Ingresos: "#82ca9d",
    Prestamos: '#F77354',
    Bienes: '#884299'
  }
  const renderCustomLegend = (props: LegendType) => {
  
    return (
      <ul className='list-none flex justify-center pl-1 text-xs '>
        {Object.entries(props).map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry[1], margin: '5px', fontWeight: 'bold' }}>
            <span style={{ color: entry[1], marginRight: '5px' }}>⬤</span> 
            {entry[0]}
          </li>
        ))}
      </ul>
    );
  };

function DistribucionResponsabilidad() {
    return (
      
    <ResponsiveContainer width="70%" height={250} >
  
        <BarChart
        width={400}
        height={300}
        data={data}
        
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend content={renderCustomLegend(legendColors)} verticalAlign='bottom'/>
        <Bar dataKey="Gastos_fijos" stackId="a" fill="#8884d8" />
        <Bar dataKey="Ingresos" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Prestamos" stackId="a" fill='#F77354' />
        <Bar dataKey="Bienes" stackId="a" fill='#884299' />

      </BarChart>
      </ResponsiveContainer>
    );
}

export default DistribucionResponsabilidad