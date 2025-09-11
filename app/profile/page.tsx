import React from "react";
import ProfileOrder from "./_components/profile-order";
import { getOrdersByUserId } from "@/actions/orders.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Profile = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // MUHIM: promisini kutamiz
  const orders = await getOrdersByUserId(userId);
  console.log("User Orders:", orders); // Debugging line
  return (
    <div>
      <ProfileOrder orders={orders} />
    </div>
  );
};

export default Profile;
