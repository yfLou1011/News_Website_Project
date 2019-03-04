import React, {Component} from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comment'

class PCNewsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: ''
    }
  }
  componentDidMount() {
    var myFetchOptions = {
      action: "GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({newItem: json});
      document.title = this.state.newItem.title + " - React News | React 驱动的新闻平台";
    })
  }
  createMarkup() {
    return {__html: this.state.newItem.pagecontent};
  }
  render() {
    return (
    <div>
      <PCHeader/>
      <Row>
        <Col span={2}></Col>
        <Col span={14} className='container'>
          <div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}></div>
          <CommonComments uniquekey={this.props.match.params.uniquekey}/>
        </Col>
        <Col span={1}></Col>
        <Col span={5}>
          <PCNewsImageBlock count={40} type='top' width='100%' cardTitle='头条新闻' imageWidth="145px"/>
        </Col>
        <Col span={2}></Col>
      </Row>
      <PCFooter/>
      <BackTop/>
    </div>);
  }
}

export default PCNewsDetails;
