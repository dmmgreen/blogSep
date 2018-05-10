import React,{Component} from 'react';
import {Input,Form,Icon,Button} from 'antd';
import style from './style.css';

const FormItem=Form.Item;

class RegisterFormCom extends Component{
    constructor(props){
        super(props);
    }
    handleRegister(e){
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                this.props.register(values);
            }
        });
    }
    render(){
        const {getFieldDecorator}=this.props.form;
        return (
            <Form className={style.formStyle} onSubmit={e=>this.handleRegister(e)}>
                <FormItem>
                    {
                        getFieldDecorator("userName",{
                            rules:[{
                                required:true,
                                message:"请输入用户名!"
                            }]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator("password",{
                            rules: [{required: true, message: '请输入密码!'}]
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('passwordRe', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Repeat password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        注册
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const RegisterForm=Form.create()(RegisterFormCom);
export default RegisterForm;