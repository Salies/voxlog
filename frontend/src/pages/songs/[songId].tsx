import React from "react";
import { parse } from "superjson";
import api from "../../lib/axios";
import { NextPageContext } from "next";
import { Song } from "../../utils/dtos/Resources";
import Image from "next/image";

export default ({ song }: { song: Song }) => {
  return (
    <div className="w-full h-screen">
      <div className="items-center w-full mx-auto mt-8">
        <div className="">
          <Image
            src={song.coverArtUrl}
            alt={song.title}
            width={200}
            height={200}
            className="mx-auto rounded-md shadow-xl dark:shadow-none"
          />
          <div>
            <h1 className="mt-4 text-5xl font-extrabold text-center">
              {song.title}
            </h1>
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              {song.artist.name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { songId } = context.query;
    const { data } = await api.get(`/songs/${songId}`);
    const song = parse(data);

    if (!song) throw new Error("User not found");
    return {
      props: {
        song,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
