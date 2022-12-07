import React from "react";
import { parse } from "superjson";
import api from "../../lib/axios";
import { NextPageContext } from "next";
import { Song } from "../../utils/dtos/Resources";

export default ({ song }: { song: Song }) => {
  return (
    <>
      <h1>Título: {song.title}</h1>
      <img
        src={song.coverArtUrl}
        alt={song.title}
        className="mx-auto rounded-full"
      />
      <h2>Artista: {song.artist.name}</h2>
    </>
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
