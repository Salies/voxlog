import React from 'react';
import Link from 'next/link';

const RecentEventsMenu = () => {
	return (
		<section>
			<h2 className='text-2xl font-bold text-center'>Recent Events</h2>
			<ul className='justify-center items-center pl-10'>
				<li className='items-center justify-center w-full'>
					<Link href='/last-day'>
						<a className='text-lg'>Last Day</a>
					</Link>
				</li>
			</ul>
		</section>
	);
};

export default RecentEventsMenu;
