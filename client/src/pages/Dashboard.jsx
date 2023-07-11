import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, userProfile, logoutUser } = useAuth();

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="w-full h-[calc(100vh_-_56px)] grid place-items-center">
        <div className="container text-center text-gray-500">
          <h1 className="font-black text-5xl text-blue-500">Hello Admin</h1>
          <h1 className="font-bold">{user.uid}</h1>
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
