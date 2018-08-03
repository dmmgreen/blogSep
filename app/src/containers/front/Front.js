import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Switch,Route} from 'react-router-dom';
import style from './style.css';
import Menus from '../components/menu/Menus';
import Banner from '../components/banner/Banner';
import Home from '../home/index';
import Detail from '../detail/Detail';
import {Logined} from '../home/components/logined/Logined';
import Login from '../home/components/login/Login';
import {actions as TagsAction} from '../../reducers/adminManagerTags';
const {get_all_tags}=TagsAction;
import {actions as FrontActions} from '../../reducers/frontReducer';
const {get_article_list} =FrontActions;
import {actions as IndexActions} from '../../reducers/index';
const {get_login,get_register}=IndexActions;

class Front extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.get_all_tags();
    }
    render(){
        const {url}=this.props.match;
        const {login,register}=this.props;
        return (
            <div>
                <Menus getArticleList={(tag)=>this.props.get_article_list(tag,1)} history={this.props.history} categories={this.props.categories}/>
                <Banner/>
                <div className={style.container}>
                    <div className={style.contentContainer}>
                        <div className={style.content}>
                            <Switch>
                                <Route exact path={url} component={Home}/>
                                <Route path={`/detail/:id`} component={Detail}/>
                                <Route path={`/:tag`} component={Home}/>
                            </Switch>
                        </div>
                        <div className={style.loginContainer}>
                            {
                                this.props.userInfo.userId
                                ?
                                    <Logined history={this.props.history} userInfo={this.props.userInfo} />
                                    :
                                    <Login login={login} register={register}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Front.defaultProps={
    categories:[]
};

Front.propTypes={
    categories:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        categories:state.admin.tags,
        userInfo: state.globalState.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
        get_article_list:bindActionCreators(get_article_list,dispatch),
        login:bindActionCreators(get_login,dispatch),
        register:bindActionCreators(get_register,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front);