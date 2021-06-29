import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Router from './Router'
import { Header } from './components/header'

// slice
import { fetchDailyInfectionAsync,selectDailyInfection } from "./features/graphs/graph1Slice"

const App = () => {
  const  items = useSelector(selectDailyInfection)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDailyInfectionAsync())
  }, [])
  console.log("items",items)
  return (
    <>
      <Header />
      <Router />
    </>
  )
}

export default App
