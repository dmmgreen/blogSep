import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style.css';
import {Carousel} from 'antd';
const carouselImgs=[
    require("./banner_1.png"),
    require("./banner_2.png"),
    require("./banner_3.png")
];

export default class Banner extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderCarousel=this.renderCarousel.bind(this);
    }
    renderCarousel(imgs){
        return imgs.map((item,index)=>(
            <div key={index} className={style.carouselImgContainer}>
                <div className={style.pic} alt={index} style={{backgroundImage:"url("+item+")"}}></div>
            </div>
        ))
    }
    render(){
        return (
            <Carousel>
                {this.renderCarousel(carouselImgs)}
            </Carousel>
        )
    }
}