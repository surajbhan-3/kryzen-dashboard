import Card from "./Card"


function DefaultCard() {

    const disableButtons = true;
    const handleDefaultClick = () =>{
        alert('These are default products. Add products please')
   }
   

  return (
    <div className="default-div">

                                <Card
                                  
                                  imageUrl="https://www.boat-lifestyle.com/cdn/shop/products/02-3_700x.jpg?v=1656101712"
                                  title="Rockerz 450 DC"
                                  description="Wireless Bluetooth Headphone with 40mm Dynamic Drivers, Upto 15 Hours Playback, Adaptive Headband"
                                  price="1250"
                                  disableButtons={disableButtons}
                                  onClick = {handleDefaultClick}
                                />
                              <Card
                                  imageUrl="https://www.boat-lifestyle.com/cdn/shop/products/02-3_700x.jpg?v=1656101712"
                                  title="Rockerz 450 DC"
                                  description="Wireless Bluetooth Headphone with 40mm Dynamic Drivers, Upto 15 Hours Playback, Adaptive Headband"
                                  price="1250"
                                  disableButtons={disableButtons}
                                />
                              <Card
                                  imageUrl="https://www.boat-lifestyle.com/cdn/shop/products/02-3_700x.jpg?v=1656101712"
                                  title="Rockerz 450 DC"
                                  description="Wireless Bluetooth Headphone with 40mm Dynamic Drivers, Upto 15 Hours Playback, Adaptive Headband"
                                  price="1250"
                                  disableButtons={disableButtons}
                                />
    </div>
  )


}

export default DefaultCard