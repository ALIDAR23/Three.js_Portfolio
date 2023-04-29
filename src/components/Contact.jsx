import React from 'react'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc/SectionWrapper'
import { slideIn } from '../utils/motion'
import { options } from '../constants'

const Contact = () => {
  const formRef = useRef()
  const [form, setform] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [Loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setform({ ...form, [name]: value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .send(
        'service_6kmkmfm',
        'template_8c4r3uj',
        {
          from_name: form.name,
          to_name: 'Ali',
          from_email: form.email,
          to_email: 'ialidar2001@gmail.com',
          message: form.message
        },
        'AafqkQNtv2wVcNiIf'
      )

      .then(
        () => {
          setLoading(false)
          alert('Thank you. I will get back to you soon.')

          setform({
            name: '',
            email: '',
            message: ''
          })
        },
        error => {
          setLoading(false)
          console.log(error)
          alert('Something went wrong. Please try again later.')
        }
      )
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="'What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="'What's your email?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What do you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
          >
            {Loading ? 'Sending...' : 'Send'}
          </button>
          <hr />
          <span className='text-white font-medium'>Other Contact Options</span>

          <div className='flex flex-nowrap justify-between w-1/3'>
            {options.map(option => (
              <a href={option.link}>
                <img src={option.logo} class='w-10 h-10 rounded-full' />
              </a>
            ))}
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')
