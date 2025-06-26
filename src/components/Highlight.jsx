import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './videoCarousel'

const Highlight = () => {
    useGSAP(()=>{
        gsap.to('#title',{opacity:1, delay:1, y: -50})
        gsap.to('.link', { opacity:1, delay:1, y: -50, duration: 1.5, stagger: 0.25 })
    })
  return (
    <section id='highlight' className='w-screen overflow-hidden h-full common-padding bg-zinc'>
      <div className="screen-max-width">
        <div className='md:flex mb-12 w-full items-end justify-between'>
            <h1 id='title' className='section-heading'>Get the Highlights</h1>
            <div className='flex flex-wrap items-end md:ml-64 md:flex-col'> 
              <p className='link '>Watch the film
              <img src={watchImg} alt="watch" srcSet="" className='ml-2' /></p>
            </div>
            <div className='flex flex-wrap items-end'> 
              <p className='link'>Watch the Event
              <img src={rightImg} alt="right" srcSet="" className='ml-2' /></p>
            </div>
        </div>

      <VideoCarousel/>

      </div>
    </section>
  )
}

export default Highlight
