import Navbar from "../../components/navbar";
import { useState } from 'react';
import Link from 'next/link';
import Map from '../../components/map';

export default function CreateEvent() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        dateStart: '',
        dateFinish: '',
        locationLatitude: '',
        locationLongitude: '',
        artists: [] as string[],
    });

    const center = {
        lat: 51.505,
        lng: -0.09
    };

    const { name, description, dateStart, dateFinish, locationLatitude, locationLongitude, artists } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            <Navbar />
            <div className='my-0 mx-auto max-w-screen-md'>
                <h1 className='w-full text-4xl font-bold my-4'>Create Event</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <div>
                            <label htmlFor='name'>Event Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={name}
                                onChange={onChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                id='description'
                                name='description'
                                value={description}
                                onChange={onChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='mt-4 float-left'>
                            <label htmlFor='date'>Starting</label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                value={dateStart}
                                onChange={onChange}
                                className='block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            />
                        </div>
                        <div className='float-left my-4 ml-4'>
                            <label htmlFor='time'>Finishing</label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                value={dateFinish}
                                onChange={onChange}
                                className='block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                            />
                        </div>
                        <div className='clear-both'>
                            <label htmlFor='artists'>Artists</label>
                            <input
                                type='text'
                                name='artists'
                                id='artists'
                                placeholder="search for artists"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor='location'>Location</label>
                            <Map center={center} zoom={5}>
                                {({ TileLayer, Marker, Popup }: any) => (
                                    <>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                    </>
                                )}
                            </Map>
                        </div>
                        <button className='my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create event</button>
                    </div>
                </form>
            </div>
        </>
    );
}
