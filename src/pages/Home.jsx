import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { Timestamp, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

export default function Home() {
  const [listings, setListing]=useState(null);
  const [loading, setLoading] =useState(true);
  useEffect(()=>{

    async function fetchListings(){
      const listingsRef = collection(db, "listings")
      const q = query(listingsRef, orderBy("timestamp", "desc"),limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id:doc.id,
          data:doc.data(),
        }); 
      });
      setListing(listings);
      setLoading(false)
    }
    fetchListings()
        
  },[]);
  if(loading){
    return <Spinner />
  }
  if(listings.length===0){
    return<></>;
  }
  return <div>
    <Slider />
  </div>;
}
