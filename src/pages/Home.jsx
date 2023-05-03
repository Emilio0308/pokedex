import React from 'react'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nametrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hanldeSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }

  return (
    <section className ='min-h-screen grid  grid-rows-[1fr_auto] w-full'>
        <section className='grid content-center justify-center p-3 w-full'>
            <article className='flex flex-col justify-center items-center gap-10 '>
            <div className='w-full'>
                    <img className='w-full' src="/imagenes/pokedex.png" alt="" />
                </div>
                <div>
                    <h2 className='text-5xl text-red-500 font-bold text-center'>Hello Trainer!</h2>
                    <p className='font-bold text-center'>Give your name to star</p>
                </div>
                <form onSubmit={hanldeSubmit} className='w-[100%] flex flex-wrap'>
                    <input id='nameTrainer' type="text" className='outline-none flex-1 shadow-md p-3' />
                    <button className='bg-red-500 p-3 text-white w-[200px]'>Star</button>
                </form>
            </article>
        </section>
        <Footer/>
    </section>
  )
}

export default Home