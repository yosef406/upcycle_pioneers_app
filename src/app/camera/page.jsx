"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Camera as CameraIcon } from "@mui/icons-material";
import CameraView from "../../components/CameraView";
import style from "./page.module.css";

export default function Camera() {
  const [openCamera, setOpenCamera] = useState(false);
  return (
    <div className={style.container}>
      <h1>Camera</h1>
      {/* Conditionally render CameraView */}
      {openCamera && <CameraView />}

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
          onClick={() => setOpenCamera(!openCamera)}
        >
          {openCamera ? "Close Camera" : "Open Camera"}
        </Button>
      </div>
    </div>
  );
}
