import { TypeAnimation } from 'react-type-animation';

export default function HomeHero() {

    return (
        <div className='w-full h-[400px] py-20 mx-auto'>
            <div className='flex flex-row py-5'>
                <h1 className='text-4xl text-center animate-bounce1 ml-auto'>🎵</h1>
                <h1 className='text-4xl text-center animate-bounce1 delay-75 mr-auto'>🎵</h1>
            </div>
            <TypeAnimation
                className='text-4xl font-bold text-center'
                sequence={[
                    'Hey,',
                    220,
                    'Hey, what Genre Is This?'
                ]}
                wrapper="p"
                cursor={false}
                repeat={0}
                speed={25}
            />
            <div style={{ position: "relative" }}>

            </div>
        </div>
    )
}