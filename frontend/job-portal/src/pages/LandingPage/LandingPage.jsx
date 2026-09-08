import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Feature from './components/Feature'
import Analytic from './components/Analytic'
import Footer from './components/Footer'

const LandingPage = () => {
  return (
    // mb-[100vh] itu untuk jarak mepet ke bawah
    <div className='min-h-screen'>
      <Header />
      <Hero />
      <Feature />
      <Analytic />
      <Footer />
    </div>
  )
}

export default LandingPage
