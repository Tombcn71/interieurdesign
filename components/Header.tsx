import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header({
  photo,
  email,
}: {
  photo?: string;
  email?: string;
}) {
  return (
    <header className="flex flex-col xs:flex-row justify-between text-teal-600 items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
      <Link href="/" className="flex space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-12 h-10">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>

        <h1 className="sm:text-3xl text-black text-xl  ml-2 tracking-tight">
          <span className="sm:block hidden">interieurdesign.ai</span>
        </h1>
      </Link>
      {email ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/dream"
            className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition">
            <div>Design studio</div>
          </Link>
          <Link
            href="/dashboard"
            className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition">
            <div>Jouw designs</div>
          </Link>
          <Link
            href="/buy-credits"
            className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition">
            <div>Koop credits</div>
          </Link>
          <Link
            href="/"
            className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition">
            <div>Uitloggen</div>
          </Link>

          {photo ? (
            <Image
              alt="Profile picture"
              src={photo}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white" />
          )}
        </div>
      ) : (
        <div className="flex justify-end items-center space-x-4">
          <Link scroll={false}
            href="#Faq"
            className=" border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition">
            <div>Faq</div>
          </Link>
          <Link scroll={false}
            href="#Prijsbundels"
            className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition">
            <div>Prijs bundels</div>
          </Link>
          <Link scroll={false}
            href="/Contact"
            className="border-r border-gray-300 text-black pr-4 flex space-x-2 hover:text-teal-600 transition">
            <div>Contact</div>
          </Link>
          <Link
            className="flex max-w-fit items-center justify-center space-x-2 rounded-lg bg-teal-600 text-white px-5 py-2 text-sm shadow-md hover:bg-teal-300 bg-teal-600 font-medium transition"
            href="/dream">
            <p>Aanmelden </p>
          </Link>

          {photo ? (
            <Image
              alt="Profile picture"
              src={photo}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white" />
          )}
        </div>
      )}
    </header>
  );
}
