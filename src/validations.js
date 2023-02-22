export const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[^a-z])(?=.{8,20})/;
export const nameRegex = /^([^0-9]*)$/;
export const postalRegex = /^\d+$/;
const MASTERCARD = /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/;
const VISA = /^4[0-9]{2,}$/;
const AMERICAN_EXPRESS = /^3[47][0-9]{5,}$/;
const DISCOVER = /^6(?:011|5[0-9]{2})[0-9]{3,}$/;

export const cards = {
  MASTERCARD: MASTERCARD,
  VISA: VISA,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DISCOVER: DISCOVER,
}

export const findDebitCard = (cardNumber) => { 
  for (const card in cards) {
    if (cardNumber.replace(/[^\d]/g, '').match(cards[card])) {
      return card
    };

  }
  return '';
}

export const CvvValidation = (cvv) => 
   !postalRegex.test(cvv) || cvv.length < 3 
   ? 'Invalid CVV format. Must be 3 characters or more'
   : ''

export const generateErrs = (key) => {
    switch(key) {
      case 'name' : 
      return {
        required: 'This input is required', 
        pattern: {value: nameRegex, message: "Name can't contain number"}
      };
      case 'email' : 
      return {
        required: 'This input is required', 
        validate: (value) => {return value.includes('@')}
      };
      case 'password' : 
      return {required: 'This input is required',
       pattern: {value: passwordRegex, message: "Password must be 8-12 digits, at least a special character, one Capital"}
      };
      case 'Zip Code' : 
      return {required: 'This input is required',
       pattern: {value: postalRegex, message: "Zip Must Only have numbers"}, 
       maxLength: {value: 5, message: 'Zip Code Must not exceed 5 digits'}
      };
      case 'Address' :
      return {required: 'This input is required',}
      case 'Phone' :
      return {required: 'This input is required',
      pattern: {value: postalRegex, message: 'Phone cannot have letters'},
      minLength: {value: 10, message: 'Phone must be at least 10 digits'} 
      };  
    }
  }

export const cardInfoErrors = (key) => {
  switch (key) {
    case 'cardHolderName' : 
      return {
        required: 'This input is required', 
        pattern: {value: nameRegex, message: "Name can't contain number"}
      };
    case 'cardNumber' : {
      return {
        required:'This input is required',
        minLength: {value: 16, message: 'CardNumber must be at least 16 digits'}
      }
    };
      case 'CVV' : 
      return {required: 'This input is required',
       pattern: {value: postalRegex, message: "CVV Must Only have numbers"}, 
       maxLength: {value: 4, message: 'CVV Must not exceed 4 digits'},
       minLength: {value: 3, message: 'CVV Must be at least 3 digits'}
      };  
      case 'Month': 
      return {required: 'This input is required'};
      case 'Year': 
      return {required: 'This input is required'};
  }
}