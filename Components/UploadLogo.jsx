import axios from "axios";
import React,{useCallback,useState,useEffect} from "react";
import toast from "react-hot-toast";
import {useDropzone} from "react-dropzone";

//INTERNALL IMPORTS
import UpoloadICON from "./SVG/UploadICON";
import Image from "next/image";
import UploadICON from "./SVG/UploadICON";

const UploadLogo = ({
  imageURL, 
  setimageURL,
  setLoader,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
}) => {

 const notifySuccess = (msg) => { toast.success(msg, { duration: 2000 }) };
 const notifyError = (msg) => { toast.error(msg, { duration: 2000 }) };

//  uploading to IPFs

const uploadIPFS = async(file) => {
  if(file) {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("file" , file);

      //passing into API
      // uploading file method
      const response = await axios({
        method : "post",
        url : "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data  : formData,
        maxBodyLength : "Infinity",
        headers : {
          pinata_api_key : PINATA_API_KEY,
          pinata_secret_key : PINATA_SECRET_KEY,
          "Content-Type" : "multipart/form-data",
        },
      });
      // 
      const url = `https://gateway.pinata.cloud/ipfs${response.data.IpfsHash}`;

      setimageURL(url);
      setLoader(false);

      notifySuccess("Logo uploaded successfully")
    } catch (error) {
      setLoader(false);
      notifyError("check your Pinata keys")
      console.log(error)
    }
  }
}
  const onDrop = useCallback(async(acceptFile) => {
    await uploadIPFS(acceptFile[0]);
  });

  const {getInputProps, getRootProps} = useDropzone({onDrop, maxSize: 500000000000})

  return <>
  { 
      
    imageURL ? (
      <div> <img src = {imageURL} style={{width : "200px", height : "auto"}} alt = "" /></div>
    ) : (
      <div {...getRootProps}>
        <label htmlFor="file"
        className="custum-file-upload">
          <div className="icon">
            <UploadICON />
          </div>
          <div className="text">
            <span>Click To Upload Logo</span>
          </div>
          <input type="file" id ="file" {...getInputProps}/>
        </label>

      </div>

    )  
  }
  </>;
};

export default UploadLogo;
