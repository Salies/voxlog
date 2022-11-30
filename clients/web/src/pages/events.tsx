import Navbar from "../components/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl font-bold md:text-6xl">
            ⚠️ Work in progress ⚠️
          </h1>
        </div>
      </div>
    </>
  );
}