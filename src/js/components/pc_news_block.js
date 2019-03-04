import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'antd';

export default class PCNewsBlock extends Component {
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
      const {news} = this.state;
      const newsList = news.length
      ?
      news.map((newsItem,index)=>{
        // console.log(newsItem.title);
        return(
          <Link key={index} to={`details/${newsItem.uniquekey}`} target="_blank">
            <li >{newsItem.title}</li>
          </Link>
        )
      })
      :
      "没有加载任何新闻"
      return (
        <div className="topNewsList">
          <Card>
            <ul>
              {newsList}
            </ul>
          </Card>
        </div>
      );
    }
}

//export default PCNewsBlock;
