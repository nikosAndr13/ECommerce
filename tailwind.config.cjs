/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.jsx',
    './src/LoadingScreen.jsx',
    './src/Item.jsx',
    './src/NavBar.jsx',
    './src/Cart.jsx',
    './src/SignUpLogin/SignUp.jsx',
    './src/input.jsx',
    './src/CheckOut.jsx',
    './src/Dropdown.jsx',
    './src/Summary.jsx',
    './src/PaymentScreen.jsx',
    './src/ConfirmationScreen.jsx',
  ],
  theme: {
    extend: {
      aspectRatio: {'3/2': '3/2'},
      height: {'96': '29rem'}
    },
  },
  plugins: [],
}
