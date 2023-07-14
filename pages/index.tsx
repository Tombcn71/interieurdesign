import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Faq from "../components/Faq";
import Who from "../components/Who";
import Pricing from "../components/Pricing";
import { Testimonials } from "../components/Testimonials";

const Home: NextPage = () => {
  return (<div className='bg-white'>
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>interieurgpt</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        
        <h1 className="mx-auto max-w-4xl font-display text-5xl  tracking-normal text-black sm:text-7xl">
          Interieur design{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative text-teal-600">met behulp van AI</span>
          </span>{" "}
          voor jouw huis.
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-600  text-gray-800 leading-7">
        Upload een foto van je kamer en kies uit 30+ verschillende design stijlen. Herontwerp vandaag nog jouw nieuwe kamer.
        </h2>
        <Link
          className="bg-teal-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-teal-400 transition"
          href="/dream"
        >
          Probeer nu 30+ design stijlen op jouw huis
        </Link>
        <div className="flex justify-between  items-center w-full flex-col sm:mt-10 mt-6">
        <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    <div className="flex-1 sm:hidden lg:block">
                    <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/Diy.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />                   
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        
                        </div>
                    </div>
                    <div className="flex-1 sm:hidden lg:block">
                    <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/Pro.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />                    
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        
                        
                       </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
      
      <Who/>
      <Testimonials/>
      <Pricing/>
      <Faq/>
      <Footer />
    </div></div>
  );
};

export default Home;
