import React from "react";
import Input from "./input";

const SearchBar = (props) => {
  const {dispatch, search, searchBarFunctionality} = props;

  const handleChange = ({target: {name, value}}) => {
    searchBarFunctionality(value)
    dispatch({
      type: 'SearchBarValue',
      value: value,
    })
  }
  return (
    <>
      <input
      onChange={handleChange}
      name={'searchBar'}
      value={search}
      className={'border-2 border-solid outline-0 p-2'}
      />
    </>
  )
}

export default SearchBar;