import React from 'react'
import { Item_rounded } from '../Items/Items'
import SavingsIcon from '@mui/icons-material/Savings';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlagIcon from '@mui/icons-material/Flag';

type Options = 'ahorro' | 'ingresos' | 'gastos' | 'metas' | 'progreso';

interface divProps  {
    money?: number,
    option?: Options,
}

function Card_presupuesto({option,money}:divProps) {

    const iconMap = {
        ahorro: <SavingsIcon/>,
        ingresos: <CurrencyExchangeIcon/>,
        gastos: <AttachMoneyIcon/>,
        metas: <EmojiEventsIcon/>,
        progreso: <FlagIcon/>
    }
  return (
    <div className='flex ml-2'>
        <Item_rounded color={option}>
            {option && iconMap[option]}
        </Item_rounded>
        { money && (
            <div className='ml-2'>
                <p>{option}</p>
                <span>RD${money}</span>
            </div>
        )}
    </div>
  )
}

export default Card_presupuesto