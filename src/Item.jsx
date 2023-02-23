import React from "react";
import Input from "./input";

const Item = (props) => {
  const {item, AddtoCart, trackState, style} = props;

  const handleChange = ({target: {name, value}}) => {
    if (Number(value) <= item.inventory.available) {
      trackState(name, item, Number(value))
    }
  }

  return (
    <div className="h-34 w-52 cursor-pointer flex justify-center flex-col gap-y-2 z-10">
      <img src={item.image.url} alt='name' className="w-48 p-5 items"/>
      <div className="text-sm">{item.name}</div>
      {(item.inventory.available <= 3)
       ? <strong className="text-xs text-red-700">{`${item.inventory.available}`} pieces left</strong> 
       : ''
      }
      <div>{item.price.formatted_with_symbol}</div>
      {(item.inventory.qty === 0)
       ? <strong className="text-xs text-red-700">
        Fill in a valid quantity in the box
        </strong> 
       : ''
      }
      <div className="flex gap-x-4"
        >
        <div 
          className={`${style}`}
          onClick={() => {AddtoCart(item);}}
          >Press 'Enter' to Add
        </div>
        <input
          name={item.name}
          value={item.inventory['qty']}
          onChange={handleChange}
          className={'border-black w-2/12 border-solid border-2 text-center'}
          />
      </div>
    </div>
  )
}

export default Item;