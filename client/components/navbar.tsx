import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
const Navbar = () => {
	return (
		<header className='bg-black text-white w-screen'>
			<div className='container mx-auto py-3 w-full'>
				<div className='md:flex justify-between items-center text-center'>
					<Link href='/'>
						<a className='font-black text-3xl font-mono'>voxlog</a>
					</Link>
					<div className='flex items-center'>
						<NavItems />
					</div>
					<Account />
				</div>
			</div>
		</header>
	);
};

export default Navbar;

const NavItems = () => {
	const navItems = [
		['songs', '/songs'],
		['albums', '/albums'],
		['artists', '/artists'],
		['events', '/events'],
		['members', '/members'],
	];
	return (
		<>
			<div className='flex items-center flex-wrap justify-center'>
				{navItems.map(([name, href]) => (
					<Item key={name} name={name} href={href} />
				))}
			</div>
		</>
	);
};

const Item = ({name, href}) => {
	return (
		<Link href={href}>
			<a className='px-4 font-semibold text-xl'>{name}</a>
		</Link>
	);
};

Item.propTypes = {
	name: propTypes.string.isRequired,
	href: propTypes.string.isRequired,
};

const Account = () => {
	return (
		<Link href='/profile'>
			<a>
				<div className='flex items-center justify-center mt-2 md:mt-0'>
					<img src='https://github.com/becelli.png' alt='avatar' className='w-8 h-8 rounded-full' />
					<h1 className='text-md mx-4'>Gustavo</h1>
				</div>
			</a>
		</Link>
	);
};
