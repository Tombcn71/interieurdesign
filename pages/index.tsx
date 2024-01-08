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
import ContactForm from "../components/ContactForm";

const Home: NextPage = () => {
  return (
    <div>
      <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <Head>
          <title>interieurdesign.ai</title>
        </Head>
        <Header />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
          <h1 className="mx-auto max-w-4xl font-display font-bold text-5xl  tracking-normal text-black sm:text-7xl">
            Coming soon! Interieur design{" "}
            <span className="relative whitespace-nowrap text-blue-600">
              <span className="relative text-teal-600">
                met behulp van A.i.
              </span>
            </span>{" "}
            voor jouw huis.
          </h1>

          <div className="flex justify-between  items-center w-full flex-col sm:mt-10 mt-6">
            <div className="max-w-screen-xl mx-auto md:px-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                <div className="flex-1 sm:hidden lg:block">
                  <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Who />

        <ContactForm />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
