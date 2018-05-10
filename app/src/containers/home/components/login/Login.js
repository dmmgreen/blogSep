import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {Tabs} from 'antd';
const TabPane=Tabs.TabPane;

export default class Login extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const {login,register}=this.props;
        return (
            <Tabs defaultActiveKey="1" className={style.container} tabBarStyle={{textAlign:"center"}}>
                <TabPane tab="登录" key="1">
                    <LoginForm login={login}/>
                </TabPane>
                <TabPane tab="注册" key="2">
                    <RegisterForm register={register}/>
                </TabPane>
            </Tabs>
        )
    }
}