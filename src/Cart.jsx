import React from 'react';

const Smallcart = (data) => {
  const {cart, RemoveFromCart, setRender, signIn} = data;
  return (
    <>
       {(signIn === '') ? <div>You must be Logged In to proceed </div> : ''}
      {(cart?.length === 0) 
      ? <div className='cursor-default'>Empty Cart</div>
      : (
        cart?.map((item,index) => {
         const {image, name, price, inventory} = item;
         return (
           <React.Fragment key={index}>
             <div className='flex items-center z-10 border-2 justify-around w-96'>
              <button type='click' onClick={() => {RemoveFromCart(cart, item)}}>X</button>
             <img className='w-16' src={image.url} alt='image'/>
             <small>{name}</small>
             <strong>{price.formatted_with_symbol}</strong>
             <strong>Qty:{inventory.qty}</strong>
             </div>
           </React.Fragment>
         )
       })
      )}
      <div 
      className="sticky
       bottom-0 rounded-md 
       w-96 text-center
       p-2 cursor-default z-10 bg-pink-700 text-white font-semibold
       ">
        <button 
        className='disabled:opacity-50'
        disabled={(signIn === '') ? true : false} type='button' onClick={() => {setRender('checkout')}}>
          Proceed to Checkout
        </button>
      </div>
    </>
  )
}

export default Smallcart;