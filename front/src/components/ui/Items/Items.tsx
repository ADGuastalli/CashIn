//type ColorOptions = 'red' | 'blue' | 'green' | 'yellow';
type ColorOptions = 'ahorro' | 'ingresos' | 'gastos' | 'metas' | 'progreso';

interface divProps  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any
    color?: ColorOptions,
}

export function Item_rounded({children, color='ingresos'}: divProps){
    const ColorClass = {
        gastos: 'bg-[#F2786D] text-white',
        ahorro: 'bg-[#0396A6] text-white',
        ingresos: 'bg-[#B3EDD7] text-white',
        metas: 'bg-[#F2B441] text-black',
        progreso: 'bg-[#F2B441] text-black',
    }[color];

    //usar box sizing en los children
    return(
        <div className={`${ColorClass} inline-flex items-center justify-center aspect-square rounded-full border-2 border-gray-400 px-2`}>
            {children}
        </div>
    )
}