import React from 'react'
import { Link } from 'react-router-dom'
import {FaMapMarkerAlt} from "react-icons/fa";

export default function ListingItems({list}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330]'>
      <Link to={`/list/${list._id}`}>
        <img 
          src={list.imageUrls[0]} 
          alt='annonce cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full mt-3'>
          <p className='font-semibold text-lg text-slate-700 truncate'>{list.name}</p>
          <div className='flex items-center gap-2'>
            <FaMapMarkerAlt className='h-4 w-4 text-lime-900'/>
            <p className='text-sm text-stone-600 truncate w-full'>{list.address}</p>
          </div>
          <p className='text-sm text-stone-700 line-clamp-2'>{list.description}</p>
          <p className='text-slate-500 mt-2 font-semibold'>
          €{list.offer ? list.discountPrice.toLocaleString('fr-FR') : list.regularPrice.toLocaleString('fr-FR')}
          {list.type === 'rent' && ' / Mois'}
          </p>
          <div className='text-slate-600 flex gap-4'>
            <div className='font-bold text-xs'>
              {list.bedrooms > 1 ? `${list.bedrooms} Chambres` : `${list.bedrooms} Chambre`}
            </div>
            <div className='font-bold text-xs'>
              {list.bathrooms > 1 ? `${list.bathrooms} Salles de bains` : `${list.bathrooms} Salle de bain`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
