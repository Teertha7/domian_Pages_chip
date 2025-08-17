import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const ImageSlider = ({ images }) => {
	return (
		<div className="Slider-container">
			<Swiper
				modules={[Pagination, Autoplay, Navigation]}
				pagination={{ clickable: true }}
				navigation={true}
				autoplay={{ delay: 3000 }}
				loop={true}
				spaceBetween={20}
				slidesPerView={2}
				breakpoints={{
					1024: { slidesPerView: 2 }, // desktops
					768: { slidesPerView: 2 }, // tablets
					0: { slidesPerView: 1 }, // phones
				}}>
				{images.map((img, idx) => (
					<SwiperSlide key={idx}>
						<img src={process.env.PUBLIC_URL + img.src} alt={img.alt} className="Slider-image" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ImageSlider;
