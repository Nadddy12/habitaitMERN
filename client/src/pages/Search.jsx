import React from 'react'

export default function Search() {
  return (
    <main className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-7'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Recherche</label>
            <input
              type='text'
              id='search'
              placeholder='Recherche...'
              className='border rounded-lg p-3 w-full'
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type :</label>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='all'
                className='w-5'
              />
              <span>Louer & vendre</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='rent'
                className='w-5'
              />
              <span>Louer</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='sale'
                className='w-5'
              />
              <span>Vendre</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='offer'
                className='w-5'
              />
              <span>Offre</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Agréments :</label>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='parking'
                className='w-5'
              />
              <span>Stationnement</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='furnished'
                className='w-5'
              />
              <span>Meublé</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Trier :</label>
            <select id='sort_order' className='border rounded-lg p-3'>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Nouveau</option>
              <option>La plus ancienne</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Recherche
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Résultats de recherche :</h1>
      </div>
    </main>
  )
}
