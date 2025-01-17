import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreShop from '../../components/ExploreShop/ExploreShop'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ExploreShop setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
    </>
  )
}

export default Home
