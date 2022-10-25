import React from 'react';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='bg-black text-white'>
			<div className='container mx-auto py-3'>
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
		</nav>
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
			<div className='flex items-center flex-wrap justify-center mx-auto'>
				{navItems.map(([name, href]) => (
					<Item key={name} name={name} href={href} />
				))}
			</div>
		</>
	);
};

type ItemProps = {
	name: string;
	href: string;
};

const Item = ({name, href}: ItemProps) => {
	return (
		<Link href={href}>
			<a className='px-4 font-semibold text-xl'>{name}</a>
		</Link>
	);
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
