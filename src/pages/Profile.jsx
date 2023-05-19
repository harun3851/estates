import React, { useEffect, useState } from "react";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {FcHome} from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function Profile() {

  const auth = getAuth();
  const navigate = useNavigate();
  const [listings,setListings]= useState(null);
  const [loading, setLoading]= useState(true);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const [changeDetail, setChangeDetail]= useState(false);
  function onLogout(){
   auth.signOut();
   navigate("/");
  }
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,
    }))
  }
 async function onSubmit(){
try {
  if(auth.currentUser.displayName !==name){
    //update display name in firebase auth
    await updateProfile(auth.currentUser,{displayName:name,});
    //update name in firebase auth
    const docRef =doc(db,"users", auth.currentUser.uid)
    await updateDoc(docRef, {
      name,
    });
  }
  toast.success('profile details updated')
} catch (error) {
  toast.error("Could not update the profile details")
}
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  async function onDelete(listingID){
if(window.confirm("are you sure you want to delete")){
  await deleteDoc(doc(db,"listings",listingID));
  const updatedListing = listings.filter(
    (listing) => listing.id!==listingID
  );
  setListings(updatedListing);
  toast.success("successfully deleted the listing")
}
  }
  function onEdit(listingID){
    navigate(`/edit-listing/${listingID}`);
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6  font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/*name input*/}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white 
      border border-gray-300 rounded transition ease-in-out ${changeDetail&& "bg-red-200 focus:bg-red-200"}`}
            />
            {/*mail input*/}
            <input
              type="email"
              id="email"
              value={email}
              disabled={!changeDetail}
              onChange={onChange}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white 
      border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex mb-6 items-center">
                Do you want to change your name?
                <span onClick={()=>{ changeDetail && onSubmit();
                setChangeDetail((prevState)=>!prevState);
              }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out
          duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "apply change" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out cursor-pointer
        "
              >
                Sign out
              </p>
            </div>
          </form>
          <button type="submit" className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" >
            <Link to="/create-listing" className="flex justify-center items-center">
            <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2 "/>

            Sell or rent your home
            </Link>
       
          </button>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
              
          <>
          <h2 className="text-2xl text-center font-semibold">
            My Listing
          </h2>
          <ul className="sm:grid sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6 ">
            {listings.map((listing)=>(
              <ListingItem 
                  key={listing.id} 
                  id={listing.id }
                  listing={listing.data}
                  onDelete={()=>onDelete(listing.id)}
                  onEdit={()=>onEdit(listing.id)}
                  />
            ))}
          </ul>
          </>
        )}
      </div>
    </>
  );
}
