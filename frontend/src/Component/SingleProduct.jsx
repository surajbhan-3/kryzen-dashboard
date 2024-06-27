
const SingleProduct = ({ product }) => {
  const handleClick = ()=>{
    alert("The functionality is not available at the moment")
  }
  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h1 style={styles.title}>{product.name}</h1>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>₹{product.price}</p>
      <button onClick={handleClick} style={styles.button}>Add to Cart</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: 'auto',
    borderRadius: '10px',
  },
  title: {
    fontSize: '26px',
    margin: '20px 0',
  },
  description: {
    fontSize: '16px',
    margin: '20px 0',
    color: '#555',
  },
  price: {
    fontSize: '18px',
    margin: '20px 0',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default SingleProduct;