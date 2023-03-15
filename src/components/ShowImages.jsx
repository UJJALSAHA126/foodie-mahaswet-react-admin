import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

function ShowImages() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const dRef = ref(db, "uploads/demo/images");
    onValue(dRef, (snapshot) => {
      console.log("snapshot", snapshot.val());
      console.log("snapshot size", snapshot.size);
      // console.log("snapshot", snapshot.val().toJSON());


      let newData = [];
      if (imageList)
        newData = [...imageList];

      snapshot.forEach((child) => {

        newData.push(child.toJSON().imgUrl);
        console.log('child', child.toJSON())

      })

      setImageList(newData);
    });
  }, [])


  return (
    <div>
      {imageList &&
        imageList.map((url) => {
          return (
            <div><img src={url} key={url} style={{ width: "200px", margin: "10px" }}></img></div>
          );
        })}
    </div>
  );
}

export default ShowImages;
