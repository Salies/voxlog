import Navbar from '../components/navbar'
import Image from 'next/image'
export default function Home() {
  return (
    // citar, drums, drums_2, guitar, guitar_2, piano, sax
    <div className="h-screen w-full md:grid md:grid-cols-3">
      <Image src="/instruments_guitar_2.png" width={1000} height={1000} alt="guitar_2" />
      <Image src="/instruments_drums.png" width={1000} height={1000} alt="drums" />
      <Image src="/instruments_sax.png" width={1000} height={1000} alt="sax" />
      <Image src="/instruments_citar.png" width={1000} height={1000} alt="citar" />
      {/* <Image src="/instruments_drums_2.png" width={1000} height={1000} alt="drums_2" /> */}
      <Image src="/instruments_piano.png" width={1000} height={1000} alt="piano" />
      <Image src="/instruments_guitar.png" width={1000} height={1000} alt="guitar" />
    </div>
  )
}
