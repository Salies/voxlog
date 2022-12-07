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
            <Link href='/events'>Go Back</Link>
            <h1>Create Event</h1>
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
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            id='description'
                            name='description'
                            value={description}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Starting</label>
                        <input
                            type='date'
                            id='date'
                            name='date'
                            value={dateStart}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Finishing</label>
                        <input
                            type='date'
                            id='date'
                            name='date'
                            value={dateFinish}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='artists'>Artists</label>
                        <input
                            type='text'
                            name='artists'
                            id='artists'
                            placeholder="search for artists"
                        />
                    </div>
                    <div>
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
                </div>
            </form>
        </>
    );
}
