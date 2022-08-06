import React from 'react';
import Link from 'next/link';

const ListeningReportMenu = () => {
	return (
		<section>
			<h2 className='text-2xl font-bold text-center'>Listening Report</h2>
			<ul className='justify-center items-center pl-10'>
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
