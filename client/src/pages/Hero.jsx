import React from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

export default function Hero() {
  const { user } = useAuth();

  return (
    <>
      <div className="w-full h-[calc(100vh_-_56px)]  grid place-items-center ">
        <div className="container flex justify-between items-center">
          <div className="w-1/3 h-fit">
            <h1 className="font-bold text-4xl mb-4 text-blue-500">
              North Eastern Mindanao State University
            </h1>
            <p className="text-gray-500 text-justify">
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
      </div>
      <div className="w-full h-screen grid place-items-center bg-gray-400" id="about">
        <p className="mx-32 text-gray-50 text-center">
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
