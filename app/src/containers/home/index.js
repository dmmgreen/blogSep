import React,{Component} from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import style from './style.css';
import {Pagination} from 'antd';
import ArticleList from './components/articleList/ArticleList';
import {actions as frontActions} from '../../reducers/frontReducer';
const {get_article_list,get_article_detail}=frontActions;

class Home extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        this.props.get_article_list(this.props.match.params.tag || "");
    }
    render(){
        const {tags}=this.props;
        localStorage.setItem('userInfo',JSON.stringify(this.props.userInfo));
        return (
            tags.length>1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)
                ?
                <Redirect to="/404"/>
                :
            <div className={style.container}>
                <ArticleList history={this.props.history} data={this.props.articleList} getArticleDetail={this.props.get_article_detail}/>
            </div>
        )
    }
}
Home.defaultProps={
    userInfo:{},
    pageNum:1,
    total:0,
    articleList:[]
};

Home.propsType={
    pageNum:PropTypes.number.isRequired,
    total:PropTypes.number.isRequired,
    articleList:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        tags:state.admin.tags,
        pageNum:state.front.pageNum,
        total:state.front.total,
        articleList:state.front.articleList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        get_article_list:bindActionCreators(get_article_list,dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);