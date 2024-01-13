import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {Swiper , SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
  SwiperCore.use(Navigation);
  const [list , setList] = useState(null);
  const [getListError , setGetListError] = useState(false);
  const [loading , setLoading] = useState(false);
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
          </>
        )}
    </main>
  )
}
