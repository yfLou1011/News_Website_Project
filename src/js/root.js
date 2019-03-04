import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import PCUserCenter from './components/pc_usercenter';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import MobileUserCenter from './components/mobile_usercenter';

//import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

class Root extends React.Component {
  render() {
    return (<div>
      <MediaQuery query='(min-device-width:1224px)'>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
            <Route path="/usercenter" component={PCUserCenter}></Route>
          </div>
        </BrowserRouter>
      </MediaQuery>

      <MediaQuery query='(max-device-width:1224px)'>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
            <Route path="/usercenter" component={MobileUserCenter}></Route>
          </div>
        </BrowserRouter>
      </MediaQuery>

    </div>);
  }
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
export default Root;
