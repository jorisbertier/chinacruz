import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import carousel1 from '../assets/carousel/carousel1.png';
import carousel2 from '../assets/carousel/carousel2.png';
import carousel3 from '../assets/carousel/carousel3.png';

import 'swiper/css';
import 'swiper/css/pagination';

const SwiperNavButtons = () => {
    const swiper = useSwiper();

    const buttonStyle = "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-white/10 backdrop-blur-sm w-10 h-10 rounded-full border border-white/20 hover:bg-white/30 transition-all shadow-lg active:scale-95";

    return (
        <div className="hidden md:block">
            <button 
                onClick={() => swiper.slidePrev()} 
                className={`${buttonStyle} left-6 cursor-pointer`}
                aria-label="Diapositive précédente"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#000" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button 
                onClick={() => swiper.slideNext()} 
                className={`${buttonStyle} right-6 cursor-pointer`}
                aria-label="Diapositive suivante"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#000" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

const BannerCarousel = () => {
    const slides = [
        { id: 1, title: '', img: carousel1 },
        { id: 2, title: '', img: carousel2 },
        { id: 3, title: '', img: carousel3 },
    ];

    return (
        <div className="w-full mx-auto mb-5 mt-12">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                // navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                style={{
                    "--swiper-pagination-color": "#000",
                }}
                className="w-full h-auto"
                >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                    <div className="relative w-full h-full">
                        <img 
                        src={slide.img} 
                        alt={slide.title}
                        className="w-full h-full object-cover max-h-[500px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent flex items-center px-16">
                        <div className="max-w-xl">
                            <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-xl">
                            {slide.title}
                            </h2>
                            {/* <button className="mt-8 bg-black hover:opacity-80 text-white font-bold py-3.5 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl active:scale-95">
                            Explorar
                            </button> */}
                        </div>
                        </div>
                    </div>
                    </SwiperSlide>
                ))}

                <SwiperNavButtons />
                </Swiper>
            </div>
        </div>
    );
};

export default BannerCarousel;