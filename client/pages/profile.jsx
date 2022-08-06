import React from 'react';
import Navbar from '../components/navbar';
import ProfileHeader from '../components/profileHeader';
import ProfileStats from '../components/profileStats';
import ListeningReportMenu from '../components/listeningReportMenu';
import RecentEventsMenu from '../components/recentEventsMenu';

const Profile = () => {
	return (
		<section className='w-screen'>
			<Navbar />
			<div className='container mx-auto w-full'>
				<ProfileHeader />
				<div className='md:flex mt-5'>
					<ProfileStats />

					<section className='w-full container mx-auto md:w-6/12'>
						<ListeningReportMenu />
						<RecentEventsMenu />
					</section>
				</div>
			</div>
		</section>
	);
};

export default Profile;
