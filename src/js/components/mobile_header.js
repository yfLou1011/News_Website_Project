import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Col,Row, message} from 'antd';
import {Menu,
        Icon,
        Tabs,
        Message,
        Form,
        Input,
        Button,
        Checkbox,
        Modal} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class MobileHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            current:'top',
            modalVisible:false,
            action:'login',
            isLogined:false,
            userNickName:'',
            userid:0
        }
    }
    setModalVisible(value){
        this.setState({modalVisible: value});
    };
    componentWillMount() {
  		if (localStorage.userid != '') {
  			this.setState({isLogined: true});
  			this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid});
  		}
  	};
    handleClick(e){
        if(e.key=='register'){
            this.setState({current:"register"});
            this.setState({modalVisible:true})
        }else{
            this.setState({current:e.value})
        }
    };
    handleSubmit(e){
        e.preventDefault();
        var myFetchOption = {
            method:"GET"
        }
        var formData = this.props.form.getFieldsValue();
		console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username="+formData.userName
            +"&password="+formData.password
            +"&r_userName=" + formData.r_userName
            + "&r_password=" + formData.r_password
            + "&r_confirmPassword="+ formData.r_confirmPassword
            ,myFetchOption)
            .then(response=>response.json())
            .then(json=>{
                this.setState({userNickName:json.NickUserName, userid:json.userId})
            })
        message.success("请求成功");
        this.setModalVisible(false)
        console.log(this.state.isLogined)
    };
    login(){
        this.setModalVisible(true)
    }
    callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};
    render() {
      let {getFieldProps} = this.props.form;
  		const userShow = this.state.isLogined
      ?
      <Link to={`/usercenter`}>
        <Icon type="inbox"/>
      </Link>
  		:
  		<Icon type="setting" onClick={this.login.bind(this)}/>
        return (
            <div id='mobileheader'>
                <header>
                  <a href="/">
                    <img src="./src/images/logo.png" alt="logo"/>
                    <span>ReactNews</span>
                  </a>
                  {userShow}
                </header>

                <Modal title='用户中心' wrapClassName='vertical-center-modal'
                    visible={this.state.modalVisible}
                    onCancel= {()=>this.setModalVisible(false)}
                    onOk={() => this.setModalVisible(false)}
                    okText = "close">
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                          <Form onSubmit={this.handleSubmit.bind(this)}>
                              <FormItem label='账户'>
                                  <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                              </FormItem>
                              <FormItem label='密码'>
                                  <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                              </FormItem>
                              <Button type='primary' htmlType='submit'>Log in</Button>
                          </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label='账户'>
                                    <Input placeholder='请输入账号' {...getFieldProps("r_username")}/>
                                </FormItem>
                                <FormItem label='密码'>
                                    <Input type='password' placeholder='请输入密码' {...getFieldProps("r_password")}/>
                                </FormItem>
                                <FormItem label='确认密码'>
                                    <Input type='password' placeholder='请再次输入密码' {...getFieldProps("r_comfirmPassword")}/>
                                </FormItem>
                                <Button type='primary' htmlType='submit'>Sign Up</Button>
                            </Form>
                        </TabPane>
                    </Tabs>

                </Modal>

            </div>

        );
    }
}

export default MobileHeader = Form.create({})(MobileHeader);
