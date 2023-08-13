import React from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

export default function Hero() {
  return (
    <>
      <div className="grid h-[100vh] w-full place-items-center ">
        <div className="z-[1] flex max-w-7xl items-center justify-between gap-6 p-4 sm:max-md:flex-col-reverse">
          <div className="flex-1 text-gray-700 sm:max-md:text-center">
            <h1 className="mb-4 text-4xl font-black">
              North Eastern Mindanao State University
            </h1>
            <p className="text-xl font-bold">Digital Transformation Office</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              quibusdam et. Temporibus a itaque dolorum voluptates provident,
              non praesentium natus, delectus vero, laborum sed rerum velit!
              Eveniet excepturi itaque animi porro, dolorum aspernatur cum
              consequatur et nisi nesciunt ratione explicabo at voluptatum aut,
              quam nam vero reprehenderit assumenda! Quisquam, hic.
            </p>
          </div>
          <LoginForm />
        </div>
        <div className="bg-nemsu absolute top-0 h-full w-full "></div>
        <div className="absolute top-0 h-full w-full bg-gradient-to-br from-white to-cyan-500/50 backdrop-blur-md"></div>
      </div>
      <div className="grid h-screen w-full place-items-center" id="about">
        <p className="mx-32 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
          quibusdam et. Temporibus a itaque dolorum voluptates provident, non
          praesentium natus, delectus vero, laborum sed rerum velit! Eveniet
          excepturi itaque animi porro, dolorum aspernatur cum consequatur et
          nisi nesciunt ratione explicabo at voluptatum aut, quam nam vero
          reprehenderit assumenda! Quisquam, hic.
        </p>
      </div>
    </>
  );
}
