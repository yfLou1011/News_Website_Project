import React, { Component } from 'react';
import {Tabs,Carousel} from 'antd';
import {Row,Col} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_products'
const TabPane = Tabs.TabPane;

class PCNewsContainer extends Component {
  render(){
    const settings = {
        dots:true,
        infinite:true,
        speed: 500,
        slidesToShow:1,
        autoplay:true
    };
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">

              <div className="leftContainer">
                <div className="carousel">
                  <Carousel {...settings}>
                    <div><img src="./src/images/carousel_1.jpg"/></div>
                    <div><img src="./src/images/carousel_2.jpg"/></div>
                    <div><img src="./src/images/carousel_3.jpg"/></div>
                    <div><img src="./src/images/carousel_4.jpg"/></div>
                  </Carousel>
                </div>
                <PCNewsImageBlock count={6} type="top"  cartTitle="国际头条" imageWidth="112px"/>
              </div>

              <Tabs className="tabs_news">
                <TabPane tab='新闻' key='1'>
                  <PCNewsBlock count={23} type="top" width="100%" bordered="false"/>
                </TabPane>
                <TabPane tab='国际新闻' key='2'>
                  <PCNewsBlock count={23} type="guoji" width="100%" bordered="false"/>
                </TabPane>
              </Tabs>

              <Tabs className='tabs_product'>
                <TabPane tab="ReactNews 产品" key="1">
  								<PCProduct/>
  							</TabPane>
              </Tabs>

              <div className='rightContainer'>
                <PCNewsImageBlock count={9} type="keji" width="100%" cartTitle="科技" imageWidth="132px"/>
							  <PCNewsImageBlock count={9} type="yule" width="100%" cartTitle="娱乐" imageWidth="132px"/>
              </div>
            </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}

export default PCNewsContainer;
