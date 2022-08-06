import React from 'react';
import Navbar from '../components/navbar';
import ProfileHeader from '../components/profileHeader';
import ProfileStats from '../components/profileStats';
import ListeningReportMenu from '../components/listeningReportMenu';
import RecentEventsMenu from '../components/recentEventsMenu';

const Profile = () => {
	return (
		<section className='md:w-full'>
			<Navbar />
			<div className='container mx-auto w-full border-gray-50 border-solid border-x-2'>
				<ProfileHeader />
				<div className='md:flex mt-5 px-2'>
					<div className='w-full md:border-r-2 md:border-gray-100 md:border-solid md:px-2'>
						<ProfileStats />
					</div>
					<section className='w-full container mx-auto md:w-6/12 text-center md:text-left'>
						<div className='px-6 items-center sm:flex md:flex-col justify-evenly'>
							<ListeningReportMenu />
							<RecentEventsMenu />
						</div>
					</section>
				</div>
			</div>
		</section>
	);
};

export default Profile;
