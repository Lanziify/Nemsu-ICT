import React from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

export default function Hero() {
  const { user } = useAuth();

  return (
    <>
      <div className="grid h-[calc(100vh_-_56px)]  w-full place-items-center ">
        <div className="container flex items-center justify-between">
          <div className="h-fit w-1/3">
            <h1 className="mb-4 text-4xl font-bold text-cyan-500">
              North Eastern Mindanao State University
            </h1>
            <p className="text-justify text-gray-500">
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
      <div
        className="grid h-screen w-full place-items-center bg-gray-400"
        id="about"
      >
        <p className="mx-32 text-center text-gray-50">
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
