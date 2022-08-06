import React from 'react';
import Link from 'next/link';

const RecentEventsMenu = () => {
	const events = [
		['Banda Marília Gabriela', 'New York, NY', 'Mar 25', 'https://ingresso.com'],
		['Detonautas', 'Pres. Prudente, SP', 'may 30', 'https://ingresso.com'],
		['Raça Negra', 'São Paulo, SP', 'aug 06', 'https://ingresso.com'],
	];
	return (
		<section className='w-full'>
			<h2 className='text-2xl font-bold'>Recent Events</h2>
			<ul className='justify-center items-center'>
				{events.map(([artist, location, date, href]) => (
					<EventCard key={artist} artist={artist} location={location} date={date} href={href} />
				))}
			</ul>
		</section>
	);
};

type EventCardProps = {
	artist: string;
	location: string;
	date: string;
	href: string;
};

const EventCard = ({artist, location, date, href}: EventCardProps) => {
	return (
		<li className='w-full'>
			<Link href={href}>
				<a className='text-lg items-center justify-center w-full border-b-2 border-gray-100'>
					<h1 className='font'>{artist}</h1>
					<span className='text-sm font-extralight'>
						{date} - {location}
					</span>
				</a>
			</Link>
		</li>
	);
};

export default RecentEventsMenu;
