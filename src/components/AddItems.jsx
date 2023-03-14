import React, { useState } from "react";
import "../css/AddItems.css";
import noDataFound from "../images/no-data-found.png";
import ImageItem from "./ImageItem";

function AddItems() {

    const [selectedFiles, setSelectedFiles] = useState(null);
    const [selectedFilesPreview, setSelectedFilesPreview] = useState(null);

    const onSelect = (event) => {
        const files = event.target.files;
        if (!files) return;

        setSelectedFiles(files);
        let objectUrls = [];

        for (let i = 0; i < files.length; i++) {
            objectUrls.push(URL.createObjectURL(files[i]));
        }

        setSelectedFilesPreview(objectUrls);
    }

    const uploadClicked = () => {
        console.log('Upload Clicked');
        if (!selectedFiles) return;


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
