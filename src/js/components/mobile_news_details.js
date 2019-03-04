import React, {Component} from 'react';
import {Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comment'

class MobileNewsDetails extends Component {
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
    return (<div id='mobileDetailsContainer'>
      <MobileHeader></MobileHeader>
      <div className='ucmobileList'>
        <Row>

          <Col span={24} className='container'>
            <div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}></div>
          </Col>

        </Row>
        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
        <MobileFooter/>
        <BackTop/>
      </div>
    </div>);
  }
}

export default MobileNewsDetails;
