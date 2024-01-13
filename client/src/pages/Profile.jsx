import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useRef , useState , useEffect } from 'react';
import { getDownloadURL, getStorage, list, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './../firebase';
import { Link } from 'react-router-dom';
import { updateUserStart,
  updateUserSuccess, 
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess
} from "../store/user/userSlice.js"


export default function Profile() {
  const {currentUser , loading , error } = useSelector((state) => state.user);
  const [file , setFile] = useState(undefined);
  const [filePer , setFilePer] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData , setFormData] = useState({});
  const [updateSuccess , setUpdateSuccess] = useState(false);
  const [showListError , setShowListError] = useState(false);
  const [userList , setUserList] = useState([]);
  const [listDeleteError , setListDeleteError] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({...formData , [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    };
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}` , {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    };
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`api/auth/signout`);
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      };
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    };
  };

  const handleShowList = async () => {
    try {
      setShowListError(false);
      const res = await fetch(`api/user/lists/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false) {
        setShowListError(true);
        return;
      }

      setUserList(data);
    } catch (error) {
      setShowListError(true);
    };
  };

  const handleListDelete = async (listId) => {
    setListDeleteError(false);
    try {
      const res = await fetch(`api/list/delete/${listId}` , {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        setListDeleteError(data.message);
        return;
      }

      setUserList((prev) => prev.filter((list) => list._id !== listId));
    } catch (error) {
      setListDeleteError(error.message);
    }
  };

  return (
    <main>
      <section className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                    Image téléchargée avec succès!
                  </span>
              ) : (
                null
              )
            }
          </p>
          <input 
            type='text' 
            placeholder='Username' 
            defaultValue={currentUser.username}
            id='username' 
            className='border p-3 rounded-lg drop-shadow-lg'
            onChange={handleChange}
          />
          <input 
            type='email' 
            placeholder='Email' 
            defaultValue={currentUser.email}
            id='email' 
            className='border p-3 rounded-lg drop-shadow-lg'
            onChange={handleChange}
          />
          <input 
            type='password' 
            placeholder='Mots de pass' 
            id='password' 
            className='border p-3 rounded-lg drop-shadow-lg'
            onChange={handleChange}
          />

          <button 
            disabled={loading}
            className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
              {loading ? 'Chargement...' : `Mise à jour`}
          </button>
          <Link 
            to={`/create-list`}
            className= "bg-green-800 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            >
            Créer une annonce
          </Link>
        </form>
        <div className='flex justify-between mt-5'>
          <span 
            onClick={handleDeleteUser}
            className='text-red-600 cursor-pointer transition-all ease-in-out hover:scale-105'>
              Supprimer le compte
          </span>
          <span 
            onClick={handleSignOut}
            className='text-red-600 cursor-pointer transition-all ease-in-out hover:scale-105'>
              Se déconnecter
          </span>
        </div>
        <p className='text-red-500 mt-5'>
          {error ? error : ''}
        </p>
        <p className='text-green-500 mt-5'>
          {updateSuccess ? `l'utilisateur a été mis à jour avec succès !` : ''}
        </p>
        <button
          onClick={handleShowList}
          className='mt-6 text-white w-full bg-yellow-800 border p-3 rounded-lg text-lg'
        >
          Afficher les annonces
        </button>
        {showListError && 
          <p className='text-red-700 mt-5'>Erreur d'afficher les listes</p>
        }

        {userList && userList.length > 0 &&
          <div className='flex flex-col gap-4'>
            <h1 className='text-center my-7 text-2xl font-semibold'>Votre annonce</h1>
            {userList.map((ele) => (
              <div key={ele._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
                <Link to={`/list/${ele._id}`}>
                  <img 
                    src={ele.imageUrls} 
                    alt='annonce couver'
                    className='h-16 w-16 object-contain rounded-md'
                  />
                </Link>
                <Link to={`/list/${ele._id}`} className='text-slate-800 font-semibold flex-1 hover:underline truncate'>
                  <p>
                    {ele.name}
                  </p>
                </Link>
                <div className='flex flex-col gap-3 border p-1 rounded-sm'>
                  <button
                    onClick={() => handleListDelete(ele._id)}
                    className='text-red-700'>
                    Supprimer
                  </button>
                  <button className='text-green-700'>
                    Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>}
      </section>
    </main>
  );
};
