import React from "react";
import { parse } from "superjson";
import api from "../../lib/axios";
import { NextPageContext } from "next";
import { Artist } from "../../utils/dtos/Resources";
import Image from "next/image";
import UserImage from "../../components/userImage/index";

export default function ({ artist }: { artist: Artist }) {
  return (
    <div className="w-full h-screen">
      <div className="items-center w-full mx-auto mt-8">
        <div className="">
          <UserImage
            profilePictureUrl={artist.artUrl}
            name={artist.name}
            sizeInPixels={200}
            className="mx-auto bg-red-100"
          />
          <div>
            <h1 className="mt-4 text-5xl font-extrabold text-center">
              {artist.name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { artistId } = context.query;
    const { data } = await api.get(`/artists/${artistId}`);
    const artist = parse(data);

    if (!artist) throw new Error("Artist not found");
    return {
      props: {
        artist,
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
