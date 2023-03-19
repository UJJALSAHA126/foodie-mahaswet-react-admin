import React, { useState } from "react";
import "../css/AddItems.css";
import noDataFound from "../images/no-data-found.png";
import ImageItem from "./ImageItem";
import { db, storage } from "../firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ref as dRef, set } from "firebase/database";


// Testing The imagekit Library
// import ImageKit from "imagekit";
// var ImageKit = require("imagekit");
// import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'

// var imagekit =  ImageKit({
//     publicKey: "your_public_api_key",
//     privateKey: "your_private_api_key",
//     urlEndpoint: "https://ik.imagekit.io/hbl5agpen/"
// });



function AddItems() {

    const [selectedFiles, setSelectedFiles] = useState(null);
    const [selectedFilesPreview, setSelectedFilesPreview] = useState(null);

    const onSelect = (event) => {
        const files = event.target.files;
        if (!files || files.length == 0) return;

        setSelectedFiles(files);
        let objectUrls = [];

        for (let i = 0; i < files.length; i++) {
            objectUrls.push(URL.createObjectURL(files[i]));
        }
        objectUrls = Array.from(new Set(objectUrls));

        setSelectedFilesPreview(objectUrls);
    }

    const uploadClicked = async () => {
        console.log('Upload Clicked');
        if (!selectedFiles) return;

        const filePath = `uploads/demo/images`;

        const retrievedUrls = await uploadToDatabase(selectedFiles, filePath);
        // console.log('retrievedUrls', retrievedUrls);
        addUrlToDatabase(retrievedUrls);
    }

    const uploadToDatabase = async (selectedFiles, filePath) => {
        const retrievedUrls = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];

            const imgRef = ref(storage, filePath + file.name + v4());

            await uploadBytes(imgRef, file)
                .then(async (res) => {
                    console.log('res', res);

                    await getDownloadURL(res.ref)
                        .then((url) => {
                            console.log('url', url);
                            retrievedUrls.push(url);
                        })
                })
        }

        return retrievedUrls;
    }

    const uploadToImageKit = async (selectedFiles) => {
        const retrievedUrls = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];


        }

        return retrievedUrls;
    }


    const addUrlToDatabase = async (retrievedUrls) => {
        for (let i = 0; i < retrievedUrls.length; i++) {
            const url = retrievedUrls[i];

            // Image Kit url
            const imgKitUrl = url.replace("https://firebasestorage.googleapis.com", "https://ik.imagekit.io/hbl5agpen");

            console.log('urlIMG', imgKitUrl);
            const dbReference = dRef(db, ('uploads/demo/images/' + v4()));
            set(dbReference, {
                imgUrl: imgKitUrl
            }).then((res) => {
                console.log('resDB', res);
            })
        }
    }


    return (
        <div className="container">
            <div className="outer-form">

                <div className="inputs">
                    <form>
                        <label htmlFor="fileInput">
                            <i className="fa-solid fa-image" style={{ fontSize: "50px", cursor: "pointer" }}></i>
                        </label>

                        <input onChange={(e) => onSelect(e)} accept="image/*"
                            type="file" name="" id="fileInput" multiple
                            style={{ display: "none" }} />

                    </form>

                    <form>
                        <input className="text-inputs" type="text" name="" id="" placeholder="Enter album name" />

                    </form>


                    <button className="btn" onClick={uploadClicked}>Upload</button>
                </div>

                <div className="preview">
                    {(!selectedFilesPreview || selectedFilesPreview.length == 0) ?
                        <img className="demo-image" src={noDataFound} ></img> :

                        selectedFilesPreview.map((imgUrl) => {
                            return <ImageItem url={imgUrl} />
                        })
                    }

                </div>
            </div>
        </div >
    );
}

export default AddItems;
