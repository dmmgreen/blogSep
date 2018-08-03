import React,{Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NotFound from "../../components/notFound/NotFound";
import AdminMenu from "../../components/adminMenu/AdminMenu";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import style from './style.css';
import {actions} from '../../reducers/admin';
const {change_location_admin}=actions;

class Admin extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        const {url}=this.props.match;
        if(this.props.userInfo && this.props.userInfo.userType){
            return (
                <div>
                    {
                        this.props.userInfo.userType === "admin" ?
                            <div className={style.container}>
                                <div className={style.menuContainer}>
                                    <AdminMenu history={this.props.history} url={this.props.adminUrl}/>
                                </div>
                                <div className={style.contentContainer}>

                                </div>
                            </div>
                            :
                            <Redirect to="/"/>
                    }
                </div>
            )
        }else{
            return <NotFound/>
        }

    }
}

Admin.defaultProps={
    adminUrl:"/"
};

Admin.propTypes={
    adminUrl:PropTypes.string,
    change_location_admin:PropTypes.func
};

function mapStateToProps(state) {
    return {
        userInfo:state.globalState.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        change_location_admin:bindActionCreators(change_location_admin,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);