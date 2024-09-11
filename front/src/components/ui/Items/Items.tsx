type ColorOptions = 'red' | 'blue' | 'green' | 'yellow';

interface divProps  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any
    color?: ColorOptions,
}

export function Item_rounded({children, color='blue'}: divProps){
    const ColorClass = {
        red: 'bg-[#F2786D] text-white',
        blue: 'bg-[#0396A6] text-white',
        green: 'bg-[#B3EDD7] text-white',
        yellow: 'bg-[#F2B441] text-black',
    }[color];

    //usar box sizing en los children
    return(
        <div className={`${ColorClass} size-8 flex justify-center items-center rounded-full px-2 py-2 mx-4 my-4`}>
            {children}
        </div>
    )
}