import React from "react";
import Cart from './assets/cart.svg';
import Smallcart from "./Cart";
import { useState, useEffect } from 'react';

const NavBar = ({cart, RemoveFromCart, setRender, sortByCategory, items, signIn}) => {
  const [categories, setCategories] = useState(null);
  const [showForm, setShowForm] = useState('');
  useEffect(() => {
   async function getCategories() {
     try {
       const response = await fetch("https://api.chec.io/v1/categories", {
         method: "get",
         headers: new Headers({        
           "X-Authorization": `${import.meta.env.VITE_API_KEY}`
         }),
       })
       const data = await response.json();
       setCategories(data.data.map(name => {return name}));
     } catch (error) {
       console.log('error')
     }
   }
   getCategories()
  }, [])

  return (
    <>
    {categories?.map(categoryObj => {
      return (
        <React.Fragment key={categoryObj.id}>
          <div 
            className="cursor-pointer navLink"
            onClick={() => {sortByCategory(items,categoryObj.name)}}>
            {categoryObj.name}
          </div>
        </React.Fragment>
      )
    }) 
    }
    {(signIn === '') ?<div 
      className="cursor-pointer"
      onMouseEnter={() => {setShowForm('show')}} 
      onMouseLeave={() => {setShowForm('')}}
    >
      Login/SignUp
      {(showForm === 'show') 
      ? 
      <div className="absolute transition-all">
        <div onClick={() => {setRender('Login')}}>Login</div>
        <div onClick={() => {setRender('SignUp')}}>SignUp</div>
      </div> 
      : ''}
    </div> : <div>Welcome {signIn}</div>}
    <div 
    onClick={() => {(showForm === '') ? setShowForm('cart') : setShowForm('')}} 
    className="cursor-pointer flex flex-col justify-center items-center z-10 select-none">
      <div>
        <span className="block absolute text-white ml-3 pl-1 z-10 rounded-full text-xs ">{cart.length}</span>
        <img src={Cart} className='w-8 relative'/> 
      </div>
      {(showForm === 'cart') 
      ? <div 
      className="absolute overflow-y-auto h-36 top-16 shadow-lg justify-between flex flex-col z-10 bg-white" >
        <Smallcart cart={cart} RemoveFromCart={RemoveFromCart} setRender={setRender} signIn={signIn}/>
      </div> 
      : ''}
    </div>
  </>
  )
}


export default NavBar;