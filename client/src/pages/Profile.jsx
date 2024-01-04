import React from 'react'
import { useSelector } from 'react-redux'
import { useRef , useState , useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './../firebase';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  const [file , setFile] = useState(undefined);
  const [filePer , setFilePer] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData , setFormData] = useState({});
  const fileRef = useRef(null);
  console.log(formData);
  console.log(filePer);
  console.log(fileUploadError);

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef , file);

    uploadTask.on('state_changed' ,
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({...formData , avatar: downloadURL});
        })
      },
    );
  };

  return (
    <main>
      <section className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
        <form className='flex flex-col gap-4'>
          <input 
            onChange={(e) => setFile(e.target.files[0])} 
            type='file' 
            ref={fileRef} 
            hidden 
            accept='image/*'
          />
          <img 
            onClick={()=> fileRef.current.click()} 
            src={formData.avatar || currentUser.avatar} 
            alt='user avatar' 
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '
          />
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>Erreur de téléchargement d'image (L'image doit faire moins de 2 Mo)</span>
              ) : filePer > 0 && filePer < 100 ? (
                <span className='text-black'>
                  {`Téléchargement ${filePer}%`}
                </span>
              ) : filePer === 100 ? (
                  <span className='text-lime-700'>
                    Image téléchargée avec  succès!
                  </span>
              ) : (
                null
              )
            }
          </p>
          <input 
            type='text' 
            placeholder='Username' 
            id='username' 
            className='border p-3 rounded-lg drop-shadow-lg' 
          />
          <input 
            type='email' 
            placeholder='Email' 
            id='email' 
            className='border p-3 rounded-lg drop-shadow-lg'
          />
          <input 
            type='password' 
            placeholder='Mots de pass' 
            id='password' 
            className='border p-3 rounded-lg drop-shadow-lg'
          />

          <button 
            className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
              Mise à jour
          </button>
        </form>
        <div className='flex justify-between mt-5'>
          <span 
            className='text-red-600 cursor-pointer transition-all ease-in-out hover:scale-105'>
              Supprimer le compte
          </span>
          <span 
            className='text-red-600 cursor-pointer transition-all ease-in-out hover:scale-105'>
              Se déconnecter
          </span>
        </div>
      </section>
    </main>
  )
}
