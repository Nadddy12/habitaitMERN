import { setLogLevel } from 'firebase/app';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({list}) {
  const [landLord , setLandLord] = useState(null);
  const [message , setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    const getLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${list.userRef}`);
        const data = await res.json();
        setLandLord(data)
      } catch (error) {
        console.log(error)
      };
    };

    getLandLord();
  }, [list.userRef]);


  return (
    <>
      {landLord && (
        <div className='flex flex-col gap-2'>
          <p>Contacte <span className='font-semibold'>{landLord.username}</span> Pour <span className='font-semibold'>{list.name.toLowerCase()}</span></p>
          <textarea 
            name='message' 
            id='message' 
            rows='2' 
            value={message} 
            onChange={handleChange}
            placeholder='Entrez votre message'
            className='w-full border p-3 rounded-lg'>
          </textarea>
          <Link 
            to={`mailto:${landLord.email}?subject=Regarding${list.name}&body=${message}`}
            className='bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95'
            >
            Envoyer le message
          </Link>
        </div>
      )}
    </>
  )
};
