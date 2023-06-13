import { TypeAnimation } from 'react-type-animation';
import WaveformAnimation from './WaveformAnimation';

export default function HomeHero() {


    return (
        <div className='w-full h-[400px] py-20'>
            <TypeAnimation
                className='text-4xl font-bold text-center'
             sequence={[
                'Hey,',
                120,
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