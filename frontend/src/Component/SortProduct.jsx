

function SortProduct({ sortOrder, setSortOrder }) {
  return (
    <div className='sort-section'>
    <h3>Sort Products</h3>
    <div className='filter-div'>
      <label>Sort by Time Created:</label>
      <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
        <option value='asc'>Ascending</option>
        <option value='desc'>Descending</option>
      </select>
    </div>
  </div>
  )
}

export default SortProduct