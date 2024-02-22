"use client"
import Link from 'next/link';
import Menu from "../components/menu";
import Cart from "../components/cart";
import { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { getDocs, doc, collection } from "firebase/firestore";
import TheHeatLogo from '../../../public/TheHeatLogo.png'; // Adjust the relative path as necessary
import Image from "next/image";
import OrderInfo from '../components/subcomponents/orderInfo';


export default function Home() {

  const menuRef = collection(FIRESTORE_DB, "Menu"); // To access firestore
  const [items, setItems] = useState([])
  const [itemsInCart, setItemsInCart] = useState([])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('itemsInCart'));
    if (storedItems) {
      // Set the items in state or handle them as needed
      setItemsInCart(storedItems);
    }
  }, []);
  

  // Fetches all menu item IDs and sets them
  useEffect(() => {
    getDocs(menuRef)
    .then((snapshot) => {
      // Map each document to its document ID
      const docIds = snapshot.docs.map(doc => doc.id);
      setItems(docIds) // Sets the document IDs to the state
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
  }, []);


return (
   <div className="h-full flex items-center flex-col mb-8 brick-background">
       <Image
              src="/TheHeatLogo.png"
              alt="The Heat Logo"
              width={750}
              height={240}
              priority
            />
      <div className="w-full flex mt-12 backdrop-blur-sm xs:max-sm:flex-col xs:max-sm:items-center">
        <OrderInfo/>
        <Cart items={itemsInCart} className="xs:max-sm:w-full "/>
      </div>
   </div>
);

}
