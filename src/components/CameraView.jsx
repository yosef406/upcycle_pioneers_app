import React, { useRef, useEffect, useState } from "react";
import style from "./CameraView.module.css";
export default function CameraView({ setPicture, setCancel }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let activeStream = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { audio: false, facingMode: "environment" } })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong with accessing the camera!", error);
        });
    }
    return () => {
      stopCameraStream(activeStream); // Stop the stream when the component unmounts
    };
  }, []);
  const stopCameraStream = (stream) => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };
  const captureImage = () => {
    const video = videoRef.current;
    if (video && setPicture) {
      setPicture(video);
      stopCameraStream(video.srcObject);
      if (setCancel) {
        setCancel();
      }
    }
  };

  const cancel = () => {
    stopCameraStream(videoRef.current.srcObject);
    if (setCancel) {
      setCancel();
    }
  };
  return (
    <div className={style.camera}>
      <video
        className={style.video}
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "100%" }}
      ></video>
      <div className={style.btnDiv}>
        <button className={style.takePictureBtn} onClick={captureImage}>
          <span className={style.innerCircle}></span>
        </button>
      </div>
      <div className={style.cancelBtnDiv}>
        <button className={style.cancelBtn} onClick={cancel}>
          cancel
        </button>
      </div>
    </div>
  );
}
