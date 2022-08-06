import React from 'react';
import Link from 'next/link';
// we are using taiwlind CSS to style our header component
const Header = () => {
	return (
		<>
			<header className="bg-red-500 shadow-md">
				<div className="container mx-auto px-4 py-6 bg-blue-500">
					<div className="flex justify-between items-center bg-red-500">
						<div className="flex items-center">
							{/* Songs, Albums, Artists, Lists, Events and Members links */}
							<Link href="/">
								<a className="text-gray-800 font-semibold text-xl">
									<img src="/logo.png" alt="logo" className="w-8 h-8" />
									{/* <span className="ml-2">voxlog</span> */}
								</a>
							</Link>
							<NavItems />
						</div>
					</div>
				</div>
			</header>

		</>
	);
};

export default Header;

const NavItems = () => {
	// Key: value pairs for the nav items
	const navItems = [];
	return (
		<div className="flex items-center">
			{Array.from(navItems).map(([key, value]) => (
				<Link href={value} key={key}>
					<a className="text-gray-800 font-semibold text-xl">{key}</a>
				</Link>
			))}
		</div>
	);
};
