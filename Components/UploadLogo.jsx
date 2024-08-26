import axios from "axios";
import React,{useCallback,useState,useEffect} from "react";
import toast from "react-hot-toast";
import {useDropzone} from "react-dropzone";

//INTERNALL IMPORTS
import UpoloadICON from "./SVG/UploadICON";

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
  return <div>UploadLogo</div>;
};

export default UploadLogo;
