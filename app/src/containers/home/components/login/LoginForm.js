import React,{Component} from 'react';
import {Input,Form,Icon,Button} from 'antd';
import style from './style.css';
const FormItem=Form.Item;

class LoginFormCom extends Component{
    constructor(props){
        super(props);
    }
    handleLogin(e){
        e.preventDefault();
        this.props.form.validateFields((err,value)=>{
            if(!err){
                this.props.login(value.userName,value.passWord);
            }
        })
    }
    render(){
        const {getFieldDecorator}=this.props.form;
        return (
            <Form className={style.formStyle} onSubmit={e=>this.handleLogin(e)}>
                <FormItem>
                    {
                        getFieldDecorator('userName',{
                            rules:[{required:true,message:"请输入用户名!"}]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize:13}}/>} placeholder="Username" />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator("passWord",{
                            rules:[{
                                required:true,
                                message:"请输入密码!"
                            }]
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize:13}}  />} type="password" placeholder="Password"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const LoginForm=Form.create()(LoginFormCom);
export default LoginForm;