"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export const UserPanel = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("pika");
    router.push("/login");
  };

  return (
    <button
      className="block bg-blue-500 hover:bg-blue-700 
      text-white font-bold py-2 px-4 rounded"
      onClick={(e) => handleLogout()}
    >
      Odhlásit
    </button>
  );
};
