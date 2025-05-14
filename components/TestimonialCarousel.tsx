'use client';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { testimonials } from '@/data/content';

export const TestimonialCarousel = () => {
  return (
    <section className="py-16 bg-muted" id="testimonials">
      <div className="w-full max-w-96  mx-auto px-4 ">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What Travelers Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 h-full flex flex-col justify-between transition hover:shadow-lg">
                <p className="text-muted-foreground italic mb-4 text-base">
                  “{testimonial.comment}”
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 relative rounded-full overflow-hidden border mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <div className="text-yellow-400 text-sm mt-1">
                      {'★'.repeat(testimonial.rating)}
                      {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Optional: Custom Pagination Styling */}
        <style jsx global>{`
          .swiper-pagination-bullet {
            background-color: #a1a1aa;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: #000;
          }
        `}</style>
      </div>
    </section>
  );
};
