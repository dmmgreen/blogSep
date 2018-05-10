import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../reducers';
import Front from './front/Front';
import NotFound from '../components/notFound/NotFound';
import {Loading} from './components/loading/Loading';
import {notification} from 'antd';
const {clear_msg,user_auth}=actions;


class AppIndex extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
        this.openNotification=this.openNotification.bind(this);
    }
    openNotification(type,message){
        let that=this;
        notification[type]({
            message:message,
            onClose:()=>{
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();
    }
    componentDidMount(){
        this.props.user_auth();
    }
    render(){
        let {isFetching}=this.props;
        return (
            <Router>
                <div>
                    <Switch>
                        <Route component={NotFound} path="/404"/>
                        <Route component={Front} />
                    </Switch>
                    {
                        isFetching && <Loading/>
                    }

                </div>
            </Router>
        )
    }
}
function mapStateToProps(state) {
    return {
        notification:state.globalState.msg,
        isFetching:state.globalState.isFetching,
        userInfo:state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg:bindActionCreators(clear_msg,dispatch),
        user_auth:bindActionCreators(user_auth,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)