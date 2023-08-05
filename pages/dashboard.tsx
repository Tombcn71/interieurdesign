import Head from "next/head";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "../components/Footer";
import prisma from "../lib/prismadb";
import { Room } from "@prisma/client";
import { RoomGeneration } from "../components/RoomGenerator";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Dashboard({ rooms }: { rooms: Room[] }) {
  const { data: session } = useSession();

  return (
    <div className="bg-white">
      <div className="flex max-w-6xl  mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <Head>
          <title>InterieurDesign Dashboard</title>
        </Head>
        <Header
          photo={session?.user?.image || undefined}
          email={session?.user?.email || undefined}
        />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mb-0 mb-8">
          <h1 className="mx-auto max-w-4xl font-display text-black text-4xl  tracking-normal  sm:text-6xl mb-5">
            Bekijk jouw nieuwe{" "}
            <span className="text-teal-600">interieur designs</span>
          </h1>
          {rooms.length === 0 ? (
            <p className="text-black">
              Je hebt nog geen nieuw interieur ontworpen . Ontwerp er een{" "}
              <Link
                href="/dream"
                className="text-teal-600 underline underline-offset-2">
                hier
              </Link>
            </p>
          ) : (
            <p className="text-black">
              Bekijk hieronder door je interieurdesigns. Feedback? Email
              Tom@interieurdesign.ai
            </p>
          )}
          {rooms.map((room) => (
            <RoomGeneration
              original={room.inputImage}
              generated={room.outputImage}
            />
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session || !session.user) {
    return { props: { rooms: [] } };
  }

  let rooms = await prisma.room.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    select: {
      inputImage: true,
      outputImage: true,
    },
  });

  return {
    props: {
      rooms,
    },
  };
}
