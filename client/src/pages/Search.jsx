import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [sideBarData , setSideBarData] = useState({
    search: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [loading , setLoading] = useState(false);
  const [searchResult , setSearchResult] = useState([]);
  const navigate = useNavigate();

  console.log(searchResult)

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchFromUrl = urlParams.get('search');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if(
      searchFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        search: searchFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchData = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/list/annonces?${searchQuery}`);
      const data = await res.json();
      setSearchResult(data);
      setLoading(false);
    };

    fetchData();
  }, [location.search]);

  const handleChange = (e) => {
    if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
      setSideBarData({...sideBarData , type: e.target.id});
    }

    if(e.target.id === 'search') {
      setSideBarData({...sideBarData , search: e.target.value});
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setSideBarData({...sideBarData , [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
    }

    if(e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'create_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSideBarData({...sideBarData , sort , order});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams()
    urlParams.set('search' , sideBarData.search)
    urlParams.set('type' , sideBarData.type)
    urlParams.set('parking' , sideBarData.parking)
    urlParams.set('furnished' , sideBarData.furnished)
    urlParams.set('offer' , sideBarData.offer)
    urlParams.set('sort' , sideBarData.sort)
    urlParams.set('order' , sideBarData.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  };

  return (
    <main className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Recherche</label>
            <input
              type='text'
              id='search'
              placeholder='Recherche...'
              className='border rounded-lg p-3 w-full'
              value={sideBarData.search}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type :</label>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='all'
                className='w-5'
                checked={sideBarData.type === 'all'}
                onChange={handleChange}
              />
              <span>Louer & vendre</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData.type === 'rent'}
              />
              <span>Louer</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData.type === 'sale'}
              />
              <span>Vendre</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData.offer}
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
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <span>Stationnement</span>
            </div>
            <div className='flex gap-2'>
              <input 
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <span>Meublé</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Trier :</label>
            <select 
              id='sort_order' 
              className='border rounded-lg p-3'
              onChange={handleChange}
              defaultValue={'created_at_desc'}
            >
              <option value='regularPrice_desc'>Prix croissant</option>
              <option value='regularPrice_asc'>Prix décroissant</option>
              <option value='createdAt_desc'>Nouveau</option>
              <option value='createdAt_asc'>La plus ancienne</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Recherche
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5 text-center' >Résultats de recherche :</h1>
      </div>
    </main>
  )
}
