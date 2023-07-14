
    import { Swiper, SwiperSlide} from "swiper/react";
    import {Pagination, Navigation, Autoplay} from "swiper";
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import Image from "next/image";
   
    import t from  '../public/assets/t.png'
    import b from  '../public/assets/b.png'



    const Examples=[
     {
          image:t
         },{
          image:b
         },
                  
                  ]


     const Exampleslider = () => {
      return (
        <>
        <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
centeredSlides={true}

        slidesPerView={'auto'}
        spaceBetween={30}
        loop={true}
       
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
          {

            Examples.map((example,index)=>{
          return (
              <>


<SwiperSlide key={index}>
            <div>
            < Image src={example.image} width={600} height={300}
            
            />   

            </div>
            
            </SwiperSlide>

               </>
                 )


            }

            )
          }

          
        </Swiper>
      </>
      )
    }
    export default Exampleslider