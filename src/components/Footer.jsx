"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Home, AccountCircle, Camera } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import style from "./Footer.module.css";

export default function Footer() {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    localStorage.getItem("user");
  });
  return (
    <>
      {/* the purpose of this div is to gro to make the footer at the bottom */}
      <div style={{ flexGrow: "1" }}></div>
      <footer className={style.appFooter}>
        <div className={style.footerBtn}>
          <Button
            startIcon={<Home />}
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
          >
            Home
          </Button>
          <Button
            startIcon={<Camera />}
            variant="contained"
            color="secondary"
            onClick={() => router.push("/camera")}
          >
            Camera
          </Button>
          <Button
            startIcon={<AccountCircle />}
            variant="contained"
            color="primary"
            href="#"
            onClick={() => {
              if (user) {
                // User is already signed in, take them to their profile page
                router.push("/personal");
              } else {
                // User is not signed in, show the sign in/up form
                // TO DO: implement sign in/up form logic here
                router.push("/sign-in");
              }
            }}
          >
            {user ? "Personal" : "SignIn"}
          </Button>
        </div>
      </footer>
    </>
  );
}
