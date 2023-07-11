import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, userProfile, logoutUser } = useAuth();
  return (
    <>
      <div className="h-full grid place-items-center">
        <div className="container text-center">
          <h1 className="mb-2 font-black text-5xl text-blue-500">
            This page is for user
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
            eligendi, necessitatibus odio mollitia magni exercitationem
            reprehenderit architecto inventore quod nemo, nihil quae qui quam
            nesciunt id nisi consectetur perspiciatis beatae sequi. Laborum,
            nemo vel animi est nesciunt nam accusamus libero nulla alias, a
            fugiat repellat sequi veritatis reprehenderit voluptate dolorem sed
            exercitationem consequatur quod? Voluptas voluptate eaque vel
            possimus provident quod explicabo ratione. Saepe et nobis vero iste
            officia maiores, porro perferendis, nulla dignissimos laboriosam
            harum autem architecto. Maiores temporibus sunt similique incidunt,
            quibusdam minima perspiciatis magni possimus perferendis fugit
            fugiat dignissimos quia odit neque praesentium assumenda.
            Reprehenderit, at repellendus?
          </p>
        </div>
      </div>
    </>
  );
}
