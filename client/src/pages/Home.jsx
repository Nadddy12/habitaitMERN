import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import ListingItems from './../components/ListingItems';

export default function Home() {
  const [offerList , setOfferList] = useState([]);
  const [saleList , setSaleList] = useState([]);
  const [rentList , setRentList] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(saleList)

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/list/annonces?offer=true&limit=3`);
        const data = await res.json();
        setOfferList(data);
        fetchRent();
      } catch (error) {
        console.log(error);
      };
    };

    const fetchRent = async () => {
      try {
        const res = await fetch(`/api/list/annonces?type=rent&limit=3`);
        const data = await res.json();
        setRentList(data);
        fetchSale();
      } catch (error) {
        console.log(error);
      };
    };

    const fetchSale = async () => {
      try {
        const res = await fetch(`/api/list/annonces?type=sale&limit=3`);
        const data = await res.json();
        setSaleList(data);
      } catch (error) {
        console.log(error);
      };
    };
    fetchOffer();
  }, []);

  return (
    <main>
      {/** TopSide */}
        <section className='flex flex-col gap-6 p-28 px-3 mx-auto max-w-6xl'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Trouvez facilement la prochaine résidence 
          <br />
          de vos <span className='text-slate-500'>rêves</span>
          </h1>
          <p className='text-stone-500 text-xs sm:text-sm'>
            Découvrez votre futur chez-vous en toute simplicité avec FakhirImmobilier. Notre site web intuitif offre une expérience sans effort pour trouver la maison idéale. Parcourez notre large sélection de propriétés, utilisez des filtres personnalisés et explorez des descriptions détaillées. 
            <br />
            Grâce à FakhirImmobilier, la recherche de votre prochain foyer devient une expérience fluide et agréable. Trouvez la maison de vos rêves dès maintenant!
          </p>
          <Link to={`/search`}
          className='text-sm sm:text-sm text-indigo-800 font-bold hover:underline'>
            Commençons ici...
          </Link>
        </section>

        {/** Swiper */}
        <Swiper navigation>
          {offerList && offerList.length > 0 && offerList.map((list) => (
            <SwiperSlide>
              <div 
                className='h-[550px]' 
                key={list._id}
                style={{
                  background:`url(${list.imageUrls[0]}) center no-repeat`, 
                  backgroundSize:'cover',}}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/** Results */}
        <section className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 '>
          {offerList && offerList.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Offres récentes</h2>
                <Link 
                  to={`/search?offer=true`}
                  className='text-sm text-indigo-800 hover:underline'>
                  Afficher plus d'offres
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {offerList.map((list) => (
                  <ListingItems list={list}  key={list._id}/>
                ))}
              </div>
            </div>
          )}
          {rentList && rentList.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Lieux récents à louer</h2>
                <Link 
                  to={`/search?type=rent`}
                  className='text-sm text-indigo-800 hover:underline'>
                  Afficher plus des Lieux récents à louer
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {rentList.map((list) => (
                  <ListingItems list={list}  key={list._id}/>
                ))}
              </div>
            </div>
          )}
          {saleList && saleList.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Lieux récents à vendre</h2>
                <Link 
                  to={`/search?type=sale`}
                  className='text-sm text-indigo-800 hover:underline'>
                  Afficher plus des Lieux récents à vendre
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {saleList.map((list) => (
                  <ListingItems list={list}  key={list._id}/>
                ))}
              </div>
            </div>
          )}
        </section>
    </main>
  )
}
