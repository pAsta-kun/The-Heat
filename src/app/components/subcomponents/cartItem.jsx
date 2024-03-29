'use client'

export default function CartItems({item, price, quantity}) {

    return (
        <div className="bg-primary w-11/12 h-16 flex justify-evenly items-center rounded-xl my-1 xs:max-sm:w-full">
            <div className="w-6/12 flex justify-center text-center">
                <span className="text-xl">{item}</span>    
            </div>
            <div className="w-2/12 flex justify-center">
                <span className="text-xl">{quantity}</span>    
            </div>  
            <div className="w-4/12 flex justify-center">
                <span className="text-xl">{price}</span>    
            </div>       
        </div>
    )
}