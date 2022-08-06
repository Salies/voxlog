import React from 'react';

const ProfileHeader = () => {
	const personalData = {
		name: 'Gustavo Becelli',
		username: 'becelli',
		picture: 'https://github.com/becelli.png',
	};

	const personalMusicData = {
		hours: 150234,
		artists: 695,
		albums: 1012,
		songs: 43306,
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

const ProfileInfo = ({picture, name, username}) => {
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

ProfileInfo.propTypes = {
	picture: propTypes.string,
	name: propTypes.string.isRequired,
	username: propTypes.string.isRequired,
};

ProfileInfo.defaultProps = {
	picture: '/static/images/avatar.png',
};

const ProfileMusicStatus = ({hours, artists, albums, songs}) => {
	return (
		<section className='justify-center text-center mx-auto md:mx-0 mt-5 md:mt-0'>
			<h1 className='text-xl font-bold'>{hours} hours listening</h1>
			<div className='flex justify-between'>
				<div className='flex flex-col'>
					<p>{artists}</p>
					<h6>artists</h6>
				</div>
				<div className='flex flex-col'>
					<p>{albums}</p>
					<h6>albums</h6>
				</div>
				<div className='flex flex-col'>
					<p>{songs}</p>
					<h6>songs</h6>
				</div>
			</div>
		</section>
	);
};

ProfileMusicStatus.propTypes = {
	hours: propTypes.number,
	artists: propTypes.number,
	albums: propTypes.number,
	songs: propTypes.number,
};

export default ProfileHeader;
