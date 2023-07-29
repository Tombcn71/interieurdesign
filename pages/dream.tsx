import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { CompareSlider } from "../components/CompareSlider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Toggle from "../components/Toggle";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import DropDown from "../components/DropDown";
import { roomType, rooms, themeType, themes } from "../utils/dropdownTypes";
import { GenerateResponseData } from "./api/generate";
import { useSession, signIn } from "next-auth/react";
import useSWR from "swr";
import { Rings } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>("Modern");
  const [room, setRoom] = useState<roomType>("Living Room");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/remaining", fetcher);
  const { data: session, status } = useSession();

  const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
   // tags: [data?.remainingGenerations > 3 ? "paid" : "free"],
    styles: {
      colors: {
        primary: "#008080", // Primary buttons & links
        error: "#d23f4d", // Error messages
        shade100: "#000000", // Standard text
        shade200: "#fffe", // Secondary button text
        shade300: "#fffd", // Secondary button text (hover)
        shade400: "#000000", // Welcome text
        shade500: "#fff9", // Modal close button
        shade600: "#000000", // Border
        shade700: "#fff2", // Progress indicator background
        shade800: "#fff1", // File item background
        shade900: "#ffff", // Various (draggable crop buttons, etc.)
      },
    },
    onValidate: async (file: File): Promise<undefined | string> => {
      return data.remainingGenerations === 0
        ? `No more credits left. Buy more above.`
        : undefined;
    },
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });

    let response = (await res.json()) as GenerateResponseData;
    if (res.status !== 200) {
      setError(response as any);
    } else {
      mutate();
      const rooms =
        (JSON.parse(localStorage.getItem("rooms") || "[]") as string[]) || [];
      rooms.push(response.id);
      localStorage.setItem("rooms", JSON.stringify(rooms));
      setRestoredImage(response.generated);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  const router = useRouter();

  useEffect(() => {
    if (router.query.success === "true") {
      toast.success("Payment successful!");
    }
  }, [router.query.success]);

  return (<div className="bg-white">
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Interieurdesign.ai</title>
      </Head>
      <Header
        photo={session?.user?.image || undefined}
        email={session?.user?.email || undefined}
      />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mb-0 mb-8">
        {status === "authenticated" ? (
          <Link
            href="/buy-credits"
            className="border border-gray-700 rounded-2xl py-2 px-4 text-black text-sm my-6 duration-300 ease-in-out hover:text-teal-600 hover:scale-105 transition"
          >
            Voordelig jouw huis herontwerpen.{" "}
            <span className="font-semibold text-black">Click hier</span> om credits te kopen!
          </Link>
        ) : (
          <a
            href="https://twitter.com/nutlope/status/1635674124738523139?cxt=HHwWhsCz1ei8irMtAAAA"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 rounded-2xl py-2 px-4 text-black text-sm my-6 duration-300 ease-in-out hover:text-gray-300 transition"
          >
            Over{" "}
            <span className="font-semibold text-black">1 million users</span>{" "}
            hebben interieurGPT gebruiukt
          </a>
        )}
        <h1 className="mx-auto max-w-4xl font-display text-4xl tracking-normal text-black sm:text-6xl mb-5">
         Ontwerp jouw <span className="text-teal-600">nieuwe</span> kamer
        </h1>
        {status === "authenticated" && data && !restoredImage && (
          <p className="text-black">
            Je hebt {" "}
            <span className="font-semibold text-black">
              {data.remainingGenerations}{" "}
              {data?.remainingGenerations > 1 ? "credits" : "credit"}
            </span>{" "}
            .{" "}
            {data.remainingGenerations < 2 && (
              <span>
                Koop meer credits{" "}
                <Link
                  href="/buy-credits"
                  className="font-semibold text-teal-600 underline underline-offset-2 hover:text-teal-300 transition"
                >
                  hier
                </Link>
                .
              </span>
            )}
          </p>
        )}
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {restoredImage && (
                <div className="text-black">
                  Hier is jouw nieuw ontworpen <b className="text-teal-600">{room.toLowerCase()} </b> in {" "}
                  <b className="text-teal-600">{theme.toLowerCase()}</b> stijl!{" "}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}
              >
                <Toggle
                  className={`${restoredLoaded ? "visible mb-6" : "invisible"}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}
              {status === "loading" ? (
                <div className="max-w-[670px] h-[250px] flex justify-center items-center">
                  <Rings
                    height="100"
                    width="100"
                    color="white"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                </div>
              ) : status === "authenticated" && !originalPhoto ? (
                <>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">
                    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#008080"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path d="M256 0C114.609 0 0 114.609 0 256c0 141.391 114.609 256 256 256 141.391 0 256-114.609 256-256C512 114.609 397.391 0 256 0zm0 472c-119.297 0-216-96.703-216-216S136.703 40 256 40s216 96.703 216 216-96.703 216-216 216z"></path>
        <path d="M249.703 201.25H188v-25h19.312c6.859 0 13.422-1.219 19.5-3.594 6.172-2.375 11.438-5.641 15.797-9.797 4.358-4.203 7.922-9.25 10.547-15.234 2.734-5.906 4.047-12.5 4.047-19.625H284v256h-34.297V201.25z"></path>
      </g>
    </svg>
                      <p className="text-left text-black font-medium">
                        Kies je nieuwe kamer stijl.
                      </p>
                    </div>
                    <DropDown
                      theme={theme}
                      // @ts-ignore
                      setTheme={(newTheme) => setTheme(newTheme)}
                      themes={themes}
                    />
                  </div>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-10 items-center space-x-3">
                    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#008080"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path d="M256 0C114.609 0 0 114.609 0 256s114.609 256 256 256 256-114.609 256-256S397.391 0 256 0zm0 472c-119.297 0-216-96.703-216-216S136.703 40 256 40s216 96.703 216 216-96.703 216-216 216z"></path>
        <path d="M176 209.75c2.531-24.406 10.969-44.141 25.375-59.219 14.344-15.031 34-22.531 58.859-22.531 12.234 0 23.172 2.141 32.594 6.484 9.422 4.297 17.375 10.141 23.719 17.484 6.328 7.281 11.219 15.547 14.516 24.797a85.432 85.432 0 014.938 28.703c0 8.625-.984 16.391-3.062 23.266-2.094 6.875-4.953 12.984-8.688 18.297a86.46 86.46 0 01-13.109 15c-4.922 4.688-10.328 9.078-16.188 13.234-10.844 8.406-22.125 16.453-33.672 24.203-11.594 7.75-22.719 16.531-33.375 26.328-3.875 3.672-7.062 7.438-9.594 11.453-2.5 4.016-4.594 9.031-6.266 15.016h117.375V384H178.531v-24.203c0-10.047 3.188-20 9.625-29.578 6.438-9.734 14.438-19.188 24.125-28.219 9.625-9.031 20.188-17.828 31.781-26.359a1607.678 1607.678 0 0032.891-24.781c7.844-5.984 14.031-12.359 18.672-19.234 4.516-6.859 6.859-15.625 6.859-26.344 0-15.172-3.812-27.031-11.734-35.531-7.781-8.484-17.938-12.734-30.516-12.734-15.359 0-27.531 4.703-36.453 14.109-9 9.375-13.438 22.25-13.438 38.625H176z"></path>
      </g>
    </svg>
                      <p className="text-left text-black font-medium">
                        Kies het type kamer.
                      </p>
                    </div>
                    <DropDown
                      theme={room}
                      // @ts-ignore
                      setTheme={(newRoom) => setRoom(newRoom)}
                      themes={rooms}
                    />
                  </div>
                  <div className="mt-4 w-full max-w-sm">
                    <div className="flex mt-6 w-96 items-center space-x-3">
                    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="#008080"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path d="M256 0C114.609 0 0 114.609 0 256s114.609 256 256 256 256-114.609 256-256S397.391 0 256 0zm0 472c-119.297 0-216-96.703-216-216S136.703 40 256 40s216 96.703 216 216-96.703 216-216 216z"></path>
        <path d="M182.828 204.781c2.688-24.062 9.672-42.922 20.938-56.5C215.031 134.766 232.812 128 257.25 128c21.156 0 37.938 5.969 50.25 17.875s18.469 27.75 18.469 47.469c0 14.125-2.562 25.375-7.781 33.781-5.234 8.375-13.453 14.906-24.781 19.625 5.422 1.75 10.641 4.25 15.688 7.5 5.188 3.25 9.734 7.406 13.672 12.594 4.062 5.156 7.266 11.234 9.734 18.344 2.344 7.047 3.5 15.359 3.5 25.094 0 12.172-2.078 22.688-6.234 31.75-4.281 9.188-9.984 16.906-17.078 22.984-7.234 6.219-15.641 10.938-25.047 14.188-9.531 3.234-19.672 4.797-30.391 4.797-21.969 0-40.156-6.984-54.5-20.984-14.344-13.984-23.25-34.547-26.75-62h32.562c3.188 20 8.734 34.047 16.5 42.203 7.75 8.031 18.531 12.062 32.188 12.062 6.156 0 12.094-1.016 17.703-3.047 5.641-2.016 10.516-5.016 14.812-9.016 4.312-4 7.734-8.734 10.391-14.281 2.5-5.688 3.703-11.906 3.703-18.656 0-13.516-4.125-25.016-12.5-34.438-8.25-9.375-19.641-14.094-34.109-14.094h-18.516v-28.719h18.516c6.719 0 12.422-1.062 17.109-3.281 4.656-2.234 8.484-5.094 11.453-8.625 2.953-3.5 5.031-7.5 6.219-11.875 1.297-4.469 1.797-8.875 1.797-13.25 0-12.375-3.406-22.109-10.25-29.156-6.828-7.078-15.922-10.594-27.188-10.594-6.953 0-12.797 1.281-17.656 3.984-4.812 2.641-8.875 6.156-12.078 10.547-3.188 4.453-5.719 9.594-7.625 15.484a102.787 102.787 0 00-4 18.516h-32.204z"></path>
      </g>
    </svg>
                      <p className="text-left text-black font-medium">
                        Upload een foto van je kamer.
                      </p>
                    </div>
                  </div>
                  <UploadDropZone />
                </>
              ) : (
                !originalPhoto && (
                  <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] -mt-8">
                    <div className="max-w-xl text-black">
                     Meld je aan voor een gratis account ontwerp jouw nieuwe kamer vandaag nog. Je krijgt 1 gratis design.
                    </div><div className="flex gap-4">
                    <button
                      onClick={() => signIn("google")}
                      className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                    >
                      <Image
                        src="/google.png"
                        width={20}
                        height={20}
                        alt="google's logo"
                      />
                      <span>Sign in with Google</span>
                    </button>
                    <button
                      onClick={() => signIn("facebook")}
                      className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                    >
                      <Image
                        src="/facebook.png"
                        width={40}
                        height={40}
                        alt="facebook's logo"
                      />
                      <span>Sign in with Facebook</span>
                    </button></div>
                  </div>
                )
              )}
              {originalPhoto && !restoredImage && (
                <Image
                  alt="original photo"
                  src={originalPhoto}
                  className="rounded-2xl h-96"
                  width={475}
                  height={475}
                />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">Oorspronkelijke kamer</h2>
                    <Image
                      alt="original photo"
                      src={originalPhoto}
                      className="rounded-2xl relative w-full h-96"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">Genenereerde kamer</h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <Image
                        alt="restored photo"
                        src={restoredImage}
                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                        width={400}
                        height={400}
                        onLoadingComplete={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button
                  disabled
                  className="bg-teal-600 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8 max-w-[575px]"
                  role="alert"
                >
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Pobeer het later nog eens.
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    {error}
                  </div>
                </div>
              )}
              <div className="flex space-x-2 justify-center">
                {originalPhoto && !loading && !error && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition"
                  >
                    Ontwerp een nieuwe kamer
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(
                        restoredImage!,
                        appendNewToName(photoName!)
                      );
                    }}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-8 hover:bg-gray-100 transition"
                  >
                    Download jou nieuwe kamer
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
      <Footer />
    </div></div>
  );
};

export default Home;
