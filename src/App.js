import React from 'react'

import { Header } from './components/header'
import { Navbar } from './components/navbar'

import CreateBooking from './containers/Booking'

const App = () => {
  return (
    <>
      <Header />
      <Navbar />
      <CreateBooking />
    </>
  )
}

export default App