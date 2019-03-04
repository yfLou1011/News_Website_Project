import React, { Component } from 'react';
import {Col,Row} from 'antd';


class PCFooter extends Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='footer'>
                        &copy;&nbsp;2018 ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        );
    }
}

export default PCFooter;