// "use client"
// import Link from 'next/link';
// import Menu from "./components/menu";
// import Cart from "./components/cart";
// import { useEffect, useState } from "react";
// import { FIRESTORE_DB } from "../../firebaseConfig";
// import { getDocs, doc, collection } from "firebase/firestore";
// // import TheHeatLogo from './TheHeatLogo.png'; // Adjust the relative path as necessary
import Image from "next/image";


export default function Home() {

//   const menuRef = collection(FIRESTORE_DB, "Menu"); // To access firestore
//   const [items, setItems] = useState([])
//   const [itemsInCart, setItemsInCart] = useState([])

//   // Justs prints out stuff for dev purposes
//   useEffect(() => {
//     console.log(itemsInCart)
//     console.log(items)
//   }, [itemsInCart, items]);

//   // Fetches all menu item IDs and sets them
//   useEffect(() => {
//     getDocs(menuRef)
//     .then((snapshot) => {
//       // Map each document to its document ID
//       const docIds = snapshot.docs.map(doc => doc.id);
//       setItems(docIds) // Sets the document IDs to the state
//     })
//     .catch((error) => {
//       console.error("Error getting documents: ", error);
//     });
//   }, []);


return (
   <div className="h-full flex items-center flex-col mb-8 brick-background">
       <Image
              src="/TheHeatLogo.png"
              alt="The Heat Logo"
              width={750}
              height={240}
              priority
            />
      {/*<div className="w-full flex mt-12 backdrop-blur-sm xs:max-sm:flex-col xs:max-sm:items-center">
        <Menu setItems={setItemsInCart} itemsID={items} className="xs:max-sm:w-full"/>
        <Cart items={itemsInCart} className="xs:max-sm:w-full "/>
      </div>
      <Link href="/admin/dashboard">Go to Admin Dashboard</Link> */}
   </div>
);

}