import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { BannerList } from "../../utils/BannerList";
import { Link } from "react-router-dom";
const colors = [
  "--color-banner-color1",
  "--color-banner-color2",
  "--color-banner-color3",
];

const HomeBanner = () => {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        pagination={{
          clickable: true,
        }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
      >
        {BannerList.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`carousel-item rounded-md sm:h-[500px] h-96}`}
              style={{
                backgroundColor: `var(${colors[i]})`,
              }}
            >
              <div className="flex justify-center items-center">
                <div className="hidden lg:flex justify-center w-1/2">
                  <div className="text-center">
                    <h3 className="text-3xl text-white font-bold">
                      {item.title}
                    </h3>
                    <h1 className="text-5xl text-white font-bold mt-2">
                      {item.subtitle}
                    </h1>
                    <p className="text-white font-bold mt-4">
                      {item.description}
                    </p>
                    <Link
                      className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-600"
                      to="/products"
                    >
                      shop
                    </Link>
                  </div>
                </div>
                <div className=" w-full flex justify-center lg:w-1/2 p-4">
                  <img src={item?.image}></img>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default HomeBanner;
