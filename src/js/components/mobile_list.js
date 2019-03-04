import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'antd';
import {Row,Col} from 'antd';

export default class PCNewsBlock extends Component {
  constructor() {
    super();
    this.state = {
      news: ''
    };
  }
  componentWillMount() {
    var myFetchOptions = {
      method: "GET"
    };
    console.log("Will");
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
  }

  render() {
    const {news} = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => {
        // console.log(newsItem.title);
        return (
          <section key={index} className='m_article list-item special_section clearfix'>
            <Link key={index} to={`details/${newsItem.uniquekey}`} target="_blank">
              <div className="m_article_img">
                <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
              </div>
            </Link>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{newsItem.realtype}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>
          </section>)
      })
      : "没有加载任何新闻"
    return (<div>
      <Row>
        <Col span={24}>
          {newsList}
        </Col>
      </Row>
    </div>);
  }
}

//export default PCNewsBlock;
