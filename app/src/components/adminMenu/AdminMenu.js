import React,{Component} from 'react';
import {Menu,Icon} from 'antd';

const menus=[
    {url:"/",name:"首页",iconType:"home"},
    {url: '/managerUser', name: '用户管理', iconType: 'usergroup-delete'},
    {url: '/newArticle', name: '发文', iconType: 'file-text'},
    {url: '/managerTags', name: '标签管理', iconType: 'tags-o'},
    {url: '/managerArticle', name: '文章管理', iconType: 'edit'}
];

export default class AdminMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Menu
                    mode="inline"
                    theme="dark"
                    onClick={({key})=>{

                    }}
                    selectedKeys={[this.props.url]}>
                    {
                        menus.map((item,index)=>(
                            <Menu.Item key={item.url}>
                                <Icon type={item.iconType} />
                                <span>{item.name}</span>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        )
    }
}