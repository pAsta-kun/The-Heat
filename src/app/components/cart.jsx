import { useEffect, useState } from "react"
import CartItems from "./subcomponents/cartItem"
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

export default function Cart({items, setTotalForHome}) {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0.00)

    const router = useRouter();
    const navigateToOrder = () => {
      localStorage.setItem('itemsInCart', JSON.stringify(items));
      router.push('/order');
    };

    useEffect(() => {
        const fetchMenuItems = async () => {
            const itemsWithQuantity = items.reduce((acc, item) => {
                acc[item["id"]] = (acc[item["id"]] || 0) + 1;
                return acc;
            }, {});
    
            const itemsFromDB = await Promise.all(Object.entries(itemsWithQuantity).map(async ([id, quantity]) => {
                const docRef = doc(FIRESTORE_DB, "Menu", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { id, quantity, ...docSnap.data() };
                } else {
                    console.log("No such document!");
                    return null;
                }
            }));
    
            // Filter out any null values in case a document does not exist
            const filteredItems = itemsFromDB.filter(item => item !== null);
            setCartItems(filteredItems);

            const total = filteredItems.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);
            setTotal(parseFloat(total).toFixed(2));
            setTotalForHome(parseFloat(total).toFixed(2));
        };
    
        fetchMenuItems();
    }, [items]); 

    return (
        <div className="w-1/3 flex items-center justify-start rounded-xl ml-6 mr-12 flex-col xs:max-sm:w-11/12 xs:max-sm:justify-center xs:max-sm:m-0">
            <div className="w-full">
                <h2 className="text-7xl mt-4 mb-4 text-center xs:max-sm:w-full"> Cart </h2>
                <div className="w-11/12 flex justify-evenly items-center text-3xl mb-4 xs:max-sm:text-xl xs:max-sm:w-full">
                    <span>Items </span>
                    <span>Quantity </span>
                    <span>Price </span>
                </div>
                <div className="w-full min-h-96 flex flex-col justify-start items-center xs:max-sm:min-h-auto xs:max-sm:items-end ">
                     { //Maps through the menu items and displays them
                    cartItems.map((item, index) => (
                        <CartItems key={index} price={`$${parseFloat(item.price * parseInt(item.quantity)).toFixed(2)}`} item={item.item} quantity={item.quantity}/>
                    ))
                    }
                </div>
            </div>
            <div className="w-11/12 flex flex-col justify-center items-center text-2xl mb-4 xs:max-sm:w-full">
                <div className="h-0.5 bg-text w-full my-3"></div>
                <div className="flex justify-between items-between mx-1.5 w-full">
                    <span className="xs:max-sm:mx-3">Total: </span>
                    <span> &#160; &#160;${total}</span>
                </div>
            </div>
        </div>
    )
}