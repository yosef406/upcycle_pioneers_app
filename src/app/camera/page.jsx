"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { Camera as CameraIcon } from "@mui/icons-material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CameraView from "../../components/CameraView";
import style from "./page.module.css";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function Camera() {
  const [openCamera, setOpenCamera] = useState(false);
  const canvasRef = useRef(null);
  const [imgExist, setImgExist] = useState(false);
  const { data, loading, error, request } = useFetch(
    "https://upcycle.onrender.com"
  );
  const router = useRouter();

  useEffect(() => {
    if (!loading && !error && data) {
      localStorage.setItem("apiData", JSON.stringify(data)); // Store data
      router.push("/review");
    }
  }, [data, error, loading]);

  const openCloseCamera = () => {
    setOpenCamera(!openCamera);
  };

  const setPicture = (video) => {
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImgExist(true);
    }
  };

  const convertCanvasToBase64 = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const base64Image = canvas.toDataURL("image/png"); // Use "image/jpeg" for JPEG format
      console.log("image size: " + calculateImageSizeFromBase64(base64Image));
      return base64Image;
    }
  };

  function calculateImageSizeFromBase64(base64String) {
    // Remove data URL part if present
    const base64Only = base64String.split(",")[1] || base64String;

    // Adjust for padding
    let padding = 0;
    if (base64Only.endsWith("==")) {
      padding = 2;
    } else if (base64Only.endsWith("=")) {
      padding = 1;
    }

    // Calculate size in bytes
    const sizeInBytes = (base64Only.length * 3) / 4 - padding;

    // Convert bytes to megabytes with two decimal places
    const sizeInMegabytes = (sizeInBytes / (1024 * 1024)).toFixed(2);

    return sizeInMegabytes;
  }

  const uploadImage = () => {
    const image64 = convertCanvasToBase64();
    request.post("/new_image", { image64 });
  };

  return (
    <div className={style.container}>
      <h1>Camera</h1>
      {openCamera && (
        <CameraView setPicture={setPicture} setCancel={openCloseCamera} />
      )}
      <canvas
        ref={canvasRef}
        className={style.canvas}
        style={{ display: `${imgExist ? "block" : "none"}` }}
      ></canvas>
      {imgExist ? (
        <>
          <div className={style.uploadBtnContainer}>
            <Button
              variant="contained"
              startIcon={<CameraIcon />}
              onClick={() => openCloseCamera()}
            >
              retake
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FileUploadIcon />}
              onClick={() => {
                uploadImage();
              }}
            >
              Upload
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={style.listContainer}>
            <ol>
              <li>take a picture</li>
              <li>upload the picture</li>
              <li>review the ideas</li>
              <li>upcycle your trash</li>
              <li>save the environment</li>
            </ol>
          </div>
          <div className={style.btnContainer}>
            <Button
              variant="contained"
              startIcon={<CameraIcon />}
              onClick={() => openCloseCamera()}
            >
              Open Camera
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
