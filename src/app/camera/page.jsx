"use client";
import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { Camera as CameraIcon } from "@mui/icons-material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CameraView from "../../components/CameraView";
import style from "./page.module.css";

export default function Camera() {
  const [openCamera, setOpenCamera] = useState(false);
  const canvasRef = useRef(null);
  const [imgExist, setImgExist] = useState(false);

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

  const getCanvasBlob = (callback) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob(callback, "image/jpeg", 0.95); // Converts canvas to Blob
    }
  };

  const uploadImage = () => {
    getCanvasBlob((blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "image.jpeg"); // Append the Blob to FormData

      fetch("https://your-server.com/upload", {
        // Replace with your server URL
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
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
                // TODO: upload image to server
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
