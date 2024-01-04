import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <main>
      <section className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
        <form className='flex flex-col'>
          <img src={currentUser.avatar} alt='user avatar' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '/>
          <input type='text' placeholder='Username' id='username' className='border p-3 rounded-lg drop-shadow-lg mt-3' />
          <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg drop-shadow-lg mt-3'/>
          <input type='password' placeholder='Mots de pass' id='password' className='border p-3 rounded-lg drop-shadow-lg mt-3 mb-3'/>

          <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Mise à jour</button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-600 cursor-pointer transition-all ease-in-out hover:scale-105'>Supprimer le compte</span>
          <span className='text-red-600 cursor-pointer transition-all ease-in-out hover:scale-105'>Se déconnecter</span>
        </div>
      </section>
    </main>
  )
}
