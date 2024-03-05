import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const AdsNavigation = ({setAdsOpen}) => {
  const [openClose, setOpenClose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setOpenClose(false);
    setAdsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenClose(false);
    }, 200)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])

  return (
    !isLoading &&
    <div className="flex flex-col h-fit border border-gray-200 bg-white rounded-md divide-y font-light overflow-hidden">
      <div className="p-4 flex justify-between relative items-center">
        <span className="text-xl font-semibold">DEV News</span>
        <button onClick={() => setOpenClose(!openClose)} onBlur={handleBlur}>
          <IoClose className="w-6 h-6 hover:text-indigo-600 cursor-pointer" />
        </button>
        {
          openClose && 
          <div className="absolute z-10 right-5 -bottom-[84px] bg-white rounded-md flex flex-col p-2 border border-gray-200 gap-1">
            <button onClick={() => setOpenClose(false)} className="py-2 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Abort</button>
            <button onClick={handleClose} className="py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-700">Close</button>
          </div>
        }
      </div>
      <div className="aspect-square">
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          <SwiperSlide className="flex relative">
            <a href="https://developers.google.com/community/gdsc-solution-challenge" target="_blank" className="flex">
              <img className="object-cover hover:transition hover:ease-in-out hover:duration-500 hover:scale-110" src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-dsc/events/Add%20a%20heading_W5ZZ9g6.png" alt="Google Solution Challenge" />
              <span id="dialog" className="absolute w-full text-white bottom-0 left-0 p-4 flex font-semibold justify-center">
                Google Solution Challenge 2024
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide className="flex relative">
            <a href="https://hcmiu.edu.vn/" target="_blank" className="flex">
              <img className="object-cover hover:transition hover:ease-in-out hover:duration-500 hover:scale-110" src="https://oga.hcmiu.edu.vn/wp-content/uploads/2022/09/IU-OGA.jpg" alt="Internation University" />
              <span id="dialog" className="absolute w-full text-white bottom-0 left-0 p-4 flex font-semibold justify-center">
                International University
              </span>
            </a>
          </SwiperSlide>
          <SwiperSlide className="flex relative">
            <a href="https://github.com/phamgiaphuc" target="_blank" className="flex">
              <img className="object-cover hover:transition hover:ease-in-out hover:duration-500 hover:scale-110" src="https://beecrowd.io/wp-content/uploads/2022/08/Beecrowd-Agosto-6-02-larger.png" alt="GitHub Project" />
              <span id="dialog" className="absolute w-full text-white bottom-0 left-0 p-4 flex font-semibold justify-center">
                GitHub Project
              </span>
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default AdsNavigation