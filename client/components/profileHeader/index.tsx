import React from 'react';

const ProfileHeader = () => {
	const personalData = {
		name: 'Gustavo Becelli',
		username: 'becelli',
		picture: 'https://github.com/becelli.png',
	};

	const personalMusicData = {
		hours: 350234,
		artists: 695,
		albums: 1112,
		songs: 403506,
	};

	return (
		<div className='px-4 py-6 bg-gray-100 w-full'>
			<section className='flex justify-between flex-wrap items-center w-full'>
				<ProfileInfo {...personalData} />
				<ProfileMusicStatus {...personalMusicData} />
			</section>
		</div>
	);
};

type ProfileInfoProps = {
	name: string;
	username: string;
	picture: string;
};
const ProfileInfo = ({picture, name, username}: ProfileInfoProps) => {
	return (
		<div className='flex justify-center'>
			<img src={picture} alt='avatar' className='w-32 h-32 rounded-full' />
			<div className='px-5 flex flex-col justify-center'>
				<h1 className='text-3xl font-bold'>{name}</h1>
				<h1 className='text-xl'>@{username}</h1>
			</div>
		</div>
	);
};

type ProfileMusicStatusProps = {
	hours: number;
	artists: number;
	albums: number;
	songs: number;
};

const ProfileMusicStatus = ({hours, artists, albums, songs}: ProfileMusicStatusProps) => {
	const intToAbbrev = (num: number, fixed = 1) => {
		const abbrev = ['', 'K', 'M', 'B', 'T'];
		const exp = Math.floor(Math.log(num) / Math.log(1000));
		const result = num / Math.pow(1000, exp);
		if (exp === 0) return `${result.toFixed(0)}${abbrev[exp]}`;
		return `${result.toFixed(fixed)}${abbrev[exp]}`;
	};
	return (
		<section className='justify-center text-center mx-auto md:mx-0 mt-5 md:mt-0'>
			<h1 className='text-xl font-bold'>{intToAbbrev(hours, 0)} hours listening</h1>
			<div className='flex justify-evenly mt-2'>
				<div className='flex flex-col items-center'>
					<p className='text-lg -m-2'>{intToAbbrev(artists)}</p>
					<p className='font-light text-sm'>artists</p>
				</div>
				<div className='flex flex-col'>
					<p className='text-lg -m-2'>{intToAbbrev(albums)}</p>
					<p className='font-light text-sm'>albums</p>
				</div>
				<div className='flex flex-col'>
					<p className='text-lg -m-2'>{intToAbbrev(songs)}</p>
					<p className='font-light text-sm'>songs</p>
				</div>
			</div>
		</section>
	);
};

export default ProfileHeader;
