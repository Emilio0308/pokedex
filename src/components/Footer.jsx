import React from 'react'

const Footer = () => {
  return (
    <section className='relative'>
        <div className='h-20 bg-red-600'></div>
        <div className='h-14 bg-black'></div>
        <div className='h-20 aspect-square rounded-full border-[8px] bg-white border-black absolute bottom-0
        top-0 right-0 left-0 m-auto after:content-[""] after:h-14 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:bottom-0 after:top-0 after:left-0 after:right-0 after:m-auto'></div>
    </section>
  )
}

export default Footer