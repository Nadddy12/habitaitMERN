import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {Swiper , SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import { FaCopy , FaMapMarkerAlt , FaDoorClosed , FaParking} from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { MdChair } from "react-icons/md";
import { useSelector } from 'react-redux';
import Contact from './../components/Contact';

export default function Listing() {
  SwiperCore.use(Navigation);
  const {currentUser} = useSelector((state) => state.user)
  const [list , setList] = useState(null);
  const [getListError , setGetListError] = useState(false);
  const [loading , setLoading] = useState(false);
  const [copied , setCopied] = useState(false);
  const [contact , setContact] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const listId = params.listId;
        const res = await fetch(`/api/list/get/${listId}`);
        const data = await res.json();
        if(data.success === false) {
          setGetListError(true);
          setLoading(false);
          return;
        }
        setGetListError(false);
        setLoading(false);
        setList(data);
      } catch (error) {
        setGetListError(true);
        setLoading(false);
      }
    };
      
    getList();
  }, [params.listId]);


  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Chargement...</p>}
        {getListError && 
          <p className='text-center my-7 text-2xl'>
            Quelque chose c'est mal passé. Merci d'essayer plus tard,
            <Link
              className='text-yellow-800 hover:underline hover:text-yellow-600'
              to={`/`}> Retour à la page d'accueil</Link>
          </p>
        }
        {list && !loading && !getListError && (
          <>
            <Swiper navigation>
              {
                list.imageUrls.map((url)=>(
                  <SwiperSlide key={url}>
                    <div className='h-[550px]' style={{background: `url(${url}) center no-repeat`, backgroundSize:'cover'}}>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border-2 border-slate-400 rounded-full w-12 h-12 flex justify-center items-center bg-slate-400 bg-opacity-20 cursor-pointer'>
              <FaCopy 
                className='text-slate-300 text-xl'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(()=> {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-300 bg-opacity-20'>
                Lien copié !
              </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6'>
              <p className='text-3xl font-semibold'>
                {list.name} - €{list.offer ? list.discountPrice.toLocaleString('fr-FR') : list.regularPrice.toLocaleString('fr-FR')}
                {list.type === 'rent' ? ' / Mois' : ''}
              </p>
              <p className='flex items-center mt-6 gap-2 my-2 text-sm font-semibold'>
                <FaMapMarkerAlt className='text-lime-800'/>
                {list.address}
              </p>
              <div className='flex gap-4'>
                <p className='bg-red-950 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  {list.type === 'rent' ? `À louer` : `À vendre`}
                </p>
                {list.offer && (
                  <p className='bg-lime-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    €{+list.regularPrice - +list.discountPrice} de réduction
                  </p>
                )}
              </div>
              <p className='text-slate-800 text-lg'>
                <span className='font-semibold text-black'>Description - </span>
                {list.description}
              </p>
              <ul className='text-lime-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                  <FaDoorClosed className='text-lg'/>
                  {list.bedrooms > 1 ? `${list.bedrooms} Chambres` : `${list.bedrooms} Chambre`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                  <FaBath className='text-lg'/>
                  {list.bathrooms > 1 ? `${list.bathrooms} Salles de bains` : `${list.bathrooms} Salle de bain`}
                </li>
                <li className={`flex items-center gap-1 whitespace-nowrap ${list.parking ? 'text-lime-900' : 'text-red-800'}`}>
                  <FaParking className='text-lg'/>
                  {list.parking ? `Place de stationnement` : `Pas de stationnement`}
                </li>
                <li className={`flex items-center gap-1 whitespace-nowrap ${list.furnished ? 'text-lime-900' : 'text-red-800'}`}>
                  <MdChair className='text-lg'/>
                  {list.furnished ? `Meublé` : `Non meublé`}
                </li>
              </ul>
              {currentUser && list.userRef !== currentUser._id && !contact && (
                <button onClick={()=> setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95'>Contacter le propriétaire</button>
              )}
              {contact && <Contact list={list}/>}
            </div>
          </>
        )}
    </main>
  )
}
