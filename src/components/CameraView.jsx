import React, { useRef, useEffect, useState } from "react";

export default function CameraView() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imgExists, setImgExists] = useState(false);

  useEffect(() => {
    // Get access to the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { audio: false, facingMode: "environment" } })
        .then((stream) => {
          // Set the video source to the video stream from the camera
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong with accessing the camera!", error);
        });
    }
  }, []);

  function handleCanPlay() {
    videoRef.current.play();
  }
  const captureImage = () => {
    console.log("capturing image");
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImgExists(true);
      // You can also save this image or process it further here
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <video
        ref={videoRef}
        onCanPlay={handleCanPlay}
        autoPlay
        playsInline
        muted
        style={{ width: "100%" }}
      ></video>
      <button onClick={captureImage}>Take Picture</button>
      <canvas
        ref={canvasRef}
        style={{ display: `${imgExists ? "block" : "none"}` }}
      ></canvas>
    </div>
  );
}
