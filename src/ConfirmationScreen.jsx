import React from "react";

const ConfirmationScreen = (props) => {
  const {setRender} = props;
  return (
  <>
    <div className="flex flex-col justify-center gap-y-8 items-center w-full">
      <h1 className="text-3xl font-semibold">Confirmation</h1>
      <div>
        <h2>Congratulations.</h2>
        <h2>Your order is accepted.</h2>
        <p>
          Click the buttons below
        </p>
      </div>
          <div className="p-4 bg-pink-600 rounded-md text-white">
            <button onClick={() => {setRender('PaymentScreen')}}>Back To Home Page</button>
          </div>
        <div className="flex justify-around w-screen">
          <div className="border-2 p-4 bg-gray-300 rounded-md">
            <button>Track Order</button>
        </div>
        </div>
    </div>
  </>
  )
}

export default ConfirmationScreen;
