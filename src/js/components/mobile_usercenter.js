import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
import {Card} from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  Form,
  Input,
  Button,
  CheckBox,
  Modal,
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

class MobileUserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usercollection:"",
      usercomments:"",
      previewImage:"",
      previewVisible:false
    };
  }
  componentDidMount(){
    var myFetchOptions = {
      method:"GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
  }

  render(){
    const props = {
			action: 'http://newsapi.gugujiankong.com/handler.ashx',
			headers: {
				"Access-Control-Allow-Origin": "*"
			},
			listType: 'picture-card',
			defaultFileList: [
				{
					uid: -1,
					name: 'xxx.png',
					state: 'done',
					url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
					thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
				}
			],
			onPreview: (file) => {
				this.setState({previewImage: file.url, previewVisible: true});
			}
		};
    const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length ?
		usercollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
		:
		'您还没有收藏任何的新闻，快去收藏一些新闻吧。';

    const usercommentList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={`于${comment.datetime}发表了评论`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'您还没有发表任何评论，快去评论一些新闻吧。';

    return(
      <div>
        <mobileHeader />
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <div className="comment">
                  <Row>
                    <Col span={24}>{usercollectionList}</Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <Row>
                  <Col span={24}>{usercommentList}</Col>
                </Row>
              </TabPane>
              <TabPane tab="头像设置" key="3">
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <mobileFooter/>
      </div>
    )
  }

}

export default MobileUserCenter;
