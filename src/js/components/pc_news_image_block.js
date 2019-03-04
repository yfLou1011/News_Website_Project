import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'antd';

export default class PCNewsImageBlock extends Component {
    constructor(){
      super();
      this.state = {news:''};
    }
    componentWillMount(){
      var myFetchOptions = {
        method:"GET"
      };
      console.log("Will");
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+
        this.props.type+"&count="+this.props.count, myFetchOptions)
        .then(response => response.json())
        .then(json=>this.setState({news:json}));
    }

    render() {
      const styleImage = {
  			display: "block",
  			width: this.props.imageWidth,
  			height: "90px"
  		};
  		const styeH3 = {
  			width: this.props.imageWidth,
        // 超过长度时 实现...
  			whiteSpace: "nowrap",
  			overflow: "hidden",
  			textOverflow: "ellipsis"
  		};
      const {news} = this.state;
      const newsList = news.length
      ?
      news.map((newsItem,index)=>{
        //console.log(newsItem.title);
        return(
          <div key={index} className='imageblock'>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              <div className='custom-image'>
                <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s}/>
              </div>
              <div className='custom-card'>
                <h3 style={styeH3}>{newsItem.title}</h3>
                <p>{newsItem.author_name}</p>
              </div>
            </Link>
          </div>
        )
      })
      :
      "没有加载任何新闻"
      return (
        <div className="topNewsList">
  				<Card title={this.props.cartTitle} bordered={true} style={{
  					width: this.props.width
  				}}>
  					{newsList}
  				</Card>
  			</div>
      );
    }
}

//export default PCNewsImageBlock;
