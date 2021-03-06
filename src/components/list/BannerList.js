import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiChevronLeft} from 'react-icons/bi'
import { imageUrl } from "../../utils/functions";
import LazyLoad from 'react-lazyload';
import "swiper/css/pagination";
import "swiper/css";
import './BannerList.scss'

const BannerList = (props) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(`https://www.namava.ir/api/v1.0/medias/banners/${props.data.payloadKey}?pi=1&ps=20`)
        .then(res => {
            setItems(res.data.result)
        })
    }, [props.data])

    return (
        <div className='col-12 px-5 pt-2'>
            <Swiper
                slidesPerView={3.3}
                spaceBetween={15}
                pagination={{clickable: true }}
                dir="rtl"
                className="bannersList"
                breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3.3,
                        spaceBetween: 15,
                    }
                  }}
            >
                {items.length > 0 && 
                    items.map(item => (
                        <SwiperSlide key={item.id || item.episodId} >
                            <Link to={`/collection-${item.referenceId}-${item.caption || item.seriesCaption}`}>
                                <LazyLoad className="banner-placeholder" >
                                    <img src={imageUrl(item.imageUrl || item.seriesImageUrl)} />
                                </LazyLoad>
                                <h6>{item.caption || item.seriesCaption }</h6>
                                <span>{item.episodCaption?.split('-')[1]}</span>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default BannerList

