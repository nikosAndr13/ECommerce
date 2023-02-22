import AMERICAN_EXPRESS from './assets/amex.png';
import VISA from './assets/visa.png';
import DISCOVER from './assets/discover.png';
import MASTERCARD from './assets/masterCard.png';

export const cardIcons = {
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  VISA: VISA,
  DISCOVER: DISCOVER,
  MASTERCARD: MASTERCARD,
}

export const accDetails = {
  name: '',
  email:'',
  password:'',
  'Confirm Password':'',
  'Zip Code':'',
}

export const existingUsers = [
  {
    name: 'Nikos',
    email:'nickos2014andriopoulos@gmail.com',
    password: '2014201420Ni!',
    zipCode: '15342',
  }
]

export function reducer(state,action) {
  switch (action.type) {
    case "updateFieldValue":
      return {
        ...state,
        [action.key]: action.value
      };
    case "updateShipForm": 
      return {
        ...state,
        [action.key]: action.value
      }
    case 'paymentInfo':
      return {
        ...state,
        [action.key]: action.value
      }
    case 'SearchBarValue': 
    return action.value;
    case 'discountCode': 
    return action.value;
  }
}

export const revealPassword = (e) => {
  const inputType = e.target.previousSibling.type;
  inputType === "password"
  ? (e.target.previousSibling.type = "text")
  : (e.target.previousSibling.type = "password");
}

export const checkForExistingInfo = (array, value, key) => {
  const check = array.find(account => {return account[key] === value})
  if (check) {return true} else {return false}
}

export const shipInputs = {
  name:'',
  email:'',
  Country: '',
  State:'',
  City:'',
  Address:'',
  'Zip Code':'',
  Phone:'',
}

export const calcSum = (object) => {
  const sum = object
  .map(({price, inventory}) => {return Number(price.raw) * Number(inventory.qty)})
  .reduce((a, b) => a + b);

  const localTax = sum * 0.24
  return Number(sum + localTax).toFixed(2);
}

export const calcDiscount = (value, cartTotal) => {
  if (value === 'discount20') return (cartTotal - (cartTotal * (20/100))).toFixed(2);
    if  (value === 'codeCommerce50') return (cartTotal - (cartTotal * (50/100))).toFixed(2);
    if  (value === 'Free90') return (cartTotal - (cartTotal * (90/100))).toFixed(2);
    return cartTotal
}

export const cardInfo = {
  cardHolderName: '',
  cardNumber: '',
  CVV:'',
  Month:'',
  Year: '',
}

export const Months = []

for (let i = 1; i <= 12; i++) {
  if (i < 10) {Months.push(`${'0' + i}`)}
  else {Months.push(i)}
}

export const Years = []

for (let i = 2023; i < 2028; i++) {
  Years.push(i)
}