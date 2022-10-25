import React from 'react';
import ProfileHeader from '../components/profileHeader';
import ProfileStats from '../components/profileStats';
import ListeningReportMenu from '../components/listeningReportMenu';
import RecentEventsMenu from '../components/recentEventsMenu';

const Profile = () => {
	return (
		<section className='md:w-full'>
			<div className='container mx-auto w-full border-neutral-50 dark:border-neutral-800 border-solid border-x-2'>
				<ProfileHeader />
				<div className='md:flex mt-5 px-2'>
					<div className='w-full md:border-r-2 md:border-neutral-100 dark:md:border-neutral-800 md:border-solid md:px-2'>
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
