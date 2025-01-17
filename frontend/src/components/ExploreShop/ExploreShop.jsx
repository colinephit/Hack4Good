import React, { useContext } from 'react'
import './ExploreShop.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreShop = ({category,setCategory}) => {

  const {shop_list} = useContext(StoreContext);
  
  return (
    <div className='explore-shop' id='explore-shop'>
      <h1>Explore our mart</h1>
      <p className='explore-shop-text'>Choose from a wide selection of clothing, accessories, and essentials. We want to help you get what you need quickly and easily, so you can enjoy your items and feel your best every day.</p>
      <div className="explore-shop-list">
        {shop_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.shop_name?"All":item.shop_name)} key={index} className='explore-shop-list-item'>
                    <img src={item.shop_image} className={category===item.shop_name?"active":""} alt="" />
                    <p>{item.shop_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreShop
