import { useState, useEffect, useReducer } from 'react'
import React from 'react';
import Item from './Item';
import Loading from './LoadingScreen';
import NavBar from './NavBar';
import Login from './SignUpLogin/Login';
import SignUp from './SignUpLogin/SignUp';
import SearchBar from './SearchBar';
import CheckOut from './CheckOut';
import ConfirmationScreen from './ConfirmationScreen';
import PaymentScreen from './PaymentScreen';
import { accDetails , reducer, existingUsers, checkForExistingInfo, shipInputs, cardInfo } from './index';
import {motion, AnimatePresence} from 'framer-motion';

function App() {
  const [items, setState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [renderAcc, setRender] = useState('');
  const [accDetails2, dispatch] = useReducer(reducer, accDetails)
  const [shipInfo, dispatch3] = useReducer(reducer, shipInputs)
  const [search, dispatch1] = useReducer(reducer, '')
  const [discountCode, dispatch2] = useReducer(reducer, '')
  const [paymentForm, dispatch4] = useReducer(reducer, cardInfo)
  const [users, setUsers] = useState(existingUsers) 
  const [signIn, setSignIn] = useState('');

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const response = await fetch("https://api.chec.io/v1/products?limit=25", {
            method: "get",
            headers: new Headers({        
              "X-Authorization": `${import.meta.env.VITE_API_KEY}`
            }),
        })
        const data = await response.json();
        data.data.map(item => item.inventory['qty'] = 0)
        setState(data.data);
        setLoading(false)
      } catch (error) {
        console.log('error')
      }
    }
    fetchData()
    
  }, [])

const trackNestedObjState = (name, obj, val) => {
  const updatedState = items.map(item => {
    if (item.name === obj.name) {
      return {...item, inventory: {
        ...item.inventory, 
        'qty': Number(val), 
        'available': Number(item.inventory.available - val)}}
    }
    return item;
  })
  setState(updatedState)
}

const AddtoCart = (item) => {setCart((prev) => [...prev, item])}

const RemoveFromCart = (array, itemInCart) => {
  const {available, qty} = itemInCart.inventory;
  const findIndex = array.findIndex(e => e.name === itemInCart.name)
  array.splice(findIndex, 1)
  const updatedState = items.map(item => {
    if (item.name === itemInCart.name) {
      return {...item, inventory: {
        ...item.inventory, 
        'qty': 0, 
        'available' : available + qty
        }}
    }
    return item;
  })
  setCart(array)
  setState(updatedState)
}

const sortByCategory = (array, category) => {
  const itemsCopy = [...array];
  const filtered = itemsCopy.filter(cat => cat.categories[0].name === category);
  (category === 'ALL') ? setSelectedCategory(items) : setSelectedCategory(filtered)
}

const searchBarFunctionality = (value) => {
  const itemsCopy = [...items];
  const result = itemsCopy.filter(cat => cat.name.includes(value.toUpperCase()))
  setSelectedCategory(result)
}

const handleSignUp = () => {
  if (!checkForExistingInfo(users, accDetails2.email, 'email')) {
    setUsers((prev) => (
      [...prev, 
        {name: accDetails2.name, 
          email: accDetails2.email, 
          password: accDetails2.password,
          'zipCode': accDetails2['Zip Code'],
        }
      ]))
    setRender('')
    setSignIn(`${accDetails2.name}`)
  }
}

const handleSignIn = () => {
  const acc = checkForExistingInfo(users, accDetails2.email, 'email')
  const password = checkForExistingInfo(users, accDetails2.password, 'password')
  if (acc && password) {setRender(''); setSignIn(`${accDetails2.email.slice(0,5)}`);}
}

const proceedToPayment = () => {setRender('PaymentScreen')}

const proceedToConfirm = () => {setRender('Thanks')}

return (
  <>
    <div className='flex flex-col w-3/4 m-auto h-full mt-4 gap-y-14'>
        <div className='flex justify-around'>
        <NavBar 
          cart={cart}
          items={items}
          setRender={setRender}
          RemoveFromCart={RemoveFromCart}
          sortByCategory={sortByCategory}
          signIn={signIn}
          />
    </div>
    <SearchBar
      dispatch={dispatch1}
      search={search}
      searchBarFunctionality={searchBarFunctionality}
    />
    {
      (renderAcc === '')  
      ? <div className="flex justify-evenly items-center h-fit flex-wrap gap-10">
         {(!loading && selectedCategory.length === 0) ? items?.map((item) => (
          <React.Fragment key={item.id}>
            <AnimatePresence>
            <motion.div layout
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              exit={{ transform: "scale(0)" }}
              className='
                transform 
                aspect-square
                hover:scale-105 transition duration 500 ease-in-out w-60 hover:shadow-lg
                p-4'>
              <Item 
                item={item}
                cart={cart}
                AddtoCart={AddtoCart}
                trackState={trackNestedObjState}
                style={`border-solid border-black rounded border-2 bg-black text-white text-center w-10/12 disabled:opacity-50`}
                /> 
            </motion.div>
          </AnimatePresence>
          </React.Fragment>))
        : (!loading && selectedCategory.length !== 0) ? selectedCategory?.map((item) => (
         <React.Fragment key={item.id}>
          <AnimatePresence>
           <motion.div layout
             initial={{ transform: "scale(0)" }}
             animate={{ transform: "scale(1)" }}
             exit={{ transform: "scale(0)" }}
             className='
               transform 
               aspect-square
               hover:scale-105 transition duration 500 ease-in-out w-60 hover:shadow-lg
               p-4'>
             <Item 
               item={item}
               cart={cart}
               AddtoCart={AddtoCart}
               trackState={trackNestedObjState}
               style={`border-solid border-black rounded border-2 bg-black text-white text-center w-10/12 disabled:opacity-50`}
               /> 
           </motion.div>
          </AnimatePresence>
         </React.Fragment>))
        : <Loading/>}
    </div>
    : ''}
    {renderAcc === 'Login' 
    ? <Login
        account={accDetails2}
        onSubmit={handleSignIn}
        dispatch={dispatch}
        checkForExistingInfo={checkForExistingInfo}
        users={users}
        style={'border-2 border-solid outline-0 p-1 w-1/8 flex justify-between pr-3 opacity'}
    /> 
    : ''}  
    {renderAcc === 'SignUp' 
    ? <SignUp
        account={accDetails2}
        onSubmit={handleSignUp}
        dispatch={dispatch}
        checkForExistingInfo={checkForExistingInfo}
        users={users}
        style={'border-2 border-solid outline-0 p-1 w-1/8 flex justify-between pr-3 opacity'}
        /> 
    : ''}
    {renderAcc === 'checkout' 
    ? <CheckOut
        shipInfo={shipInfo}
        dispatch={dispatch3}
        onSubmit={proceedToPayment}
        setRender={setRender}
        discount={discountCode}
        dispatch2={dispatch2}
        cart={cart}
      /> : ''}
    {renderAcc === 'PaymentScreen'
    ? <PaymentScreen
        dispatch={dispatch4}
        dispatch2={dispatch2}
        cart={cart}
        discount={discountCode}
        paymentForm={paymentForm}
        setRender={setRender}
        proceedToConfirm={proceedToConfirm}
      /> 
    : ''}
    {renderAcc === 'Thanks'
    ? <ConfirmationScreen
        setRender={setRender}
    /> : ''
    }
    </div>
  </>
  )
}

export default App
