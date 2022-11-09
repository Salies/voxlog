import React from "react";
import ProfileHeader from "../components/profileHeader";
import ProfileStats from "../components/profileStats";
import ListeningReportMenu from "../components/listeningReportMenu";
import RecentEventsMenu from "../components/recentEventsMenu";
import Navbar from "../components/navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <section className="md:w-full">
        <div className="container w-full mx-auto border-solid border-neutral-50 dark:border-neutral-800 border-x-2">
          <ProfileHeader />
          <div className="px-2 mt-5 md:flex">
            <div className="w-full md:border-r-2 md:border-neutral-100 dark:md:border-neutral-800 md:border-solid md:px-2">
              <ProfileStats />
            </div>
            <section className="container w-full mx-auto text-center md:w-6/12 md:text-left">
              <div className="items-center px-6 sm:flex md:flex-col justify-evenly">
                <ListeningReportMenu />
                <RecentEventsMenu />
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
