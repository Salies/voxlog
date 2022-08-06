import React from 'react';
import Link from 'next/link';

const ListeningReportMenu = () => {
	return (
		<section className='w-full'>
			<h2 className='text-2xl font-bold'>Listening Report</h2>
			<ul className='justify-center items-center'>
				<li className='items-center justify-center w-full'>
					<Link href='/last-day'>
						<a className='text-lg'>Last Day</a>
					</Link>
				</li>
				<li className='items-center justify-center w-full'>
					<Link href='/last-week'>
						<a className='text-lg'>Last Week</a>
					</Link>
				</li>
				<li className='items-center justify-center w-full'>
					<Link href='/last-month'>
						<a className='text-lg'>Last Month</a>
					</Link>
				</li>
				<li className='items-center justify-center w-full'>
					<Link href='/last-year'>
						<a className='text-lg'>Last Year</a>
					</Link>
				</li>
			</ul>
		</section>
	);
};

export default ListeningReportMenu;
