import React from "react"

function FilterProduct({ type, setType, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  return (
    <React.Fragment>
      
      <div className='filter-div'>
        <label>Select Category:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value='all'>All</option>
          <option value='electronics'>Electronics</option>
          <option value='clothing'>Clothing</option>
          <option value='books'>Books</option>
        </select>
      </div>
      <div className='filter-div'>
        <label>Min Price:</label>
        <input type='number' value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      </div>
      <div className='filter-div'>
        <label>Max Price:</label>
        <input type='number' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>
    </React.Fragment>
  )
}

export default FilterProduct



