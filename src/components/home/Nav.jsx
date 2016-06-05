import {Link} from 'react-router';
//import Login from '../user/login.jsx';
import "./Nav.less";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserInfo: false, //是否显示用户下拉信息框

            userInfo: {},
            permissionInfo: [],
            isLogin: false
        };

        this.logout = this.logout.bind(this);
        this.showUserMenu = this.showUserMenu.bind(this);
        this.hideUserMenu = this.hideUserMenu.bind(this);

        this.navMenu = [
            {name: '首页', url: '/home'},
            {name: '关于我们', url: '/about'},
            {name: '加入我们', url: '/join'}
        ]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userInfo: nextProps.userInfo,
            permissionInfo: nextProps.permissionInfo,
            isLogin: nextProps.isLogin
        })
    }

    // //登陆之后控制状态
    toggleLoginStatus(isLogin, userInfo) {
        if (isLogin) {
            this.props.setLoginStatus(userInfo);
        } else {
            this.props.setLogoutStatus();
        }

    }

    logout() {
        Http.post('/yowosoft/logout').then((res)=> {
            if (res.success) {
                this.toggleLoginStatus(false, {});
                swal("成功退出登录!", "", "success");
                window.location.href = '/home';
            } else {
                console.log(res.resultMsg + '[' + res.resultCode + ']');
                swal("退出登录失败!", res.resultMsg + '[' + res.resultCode + ']', "error")
            }
        })
    }

    showUserMenu() {
        this.setState({
            showUserInfo: true
        })
    }

    hideUserMenu() {
        this.setState({
            showUserInfo: false
        })
    }


    render() {
        //菜单
        let navMenu = this.navMenu.map((item, i)=> {
            return (
                <li key={i}>
                    <Link to={item.url} activeClassName='active'>{item.name}</Link>
                </li>
            )
        });

        let showUserInfoClassName = this.state.showUserInfo ? "menu-li dropdown open" : "menu-li dropdown";

        let otherMenu = () => {
            //登录的时候
            if (this.state.isLogin) {
                return (
                    <li id="menu-li" className={showUserInfoClassName}>
                        <a href="javascript:;" className="menu-li dropdown-toggle" onMouseOver={this.showUserMenu}
                           onMouseOut={this.hideUserMenu}>{this.state.userInfo.name} <span className="caret"></span></a>
                        <ul className="dropdown-menu" onMouseOver={this.showUserMenu} onMouseOut={this.hideUserMenu}>
                            <li>
                                <Link to="/userCenter">个人中心</Link>
                            </li>
                            <li>
                                <a href="javascript:;" onClick={this.logout}>退出登录</a>
                            </li>
                        </ul>
                    </li>
                )
            } else {
                return (
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/login" activeClassName="active">登录</Link>
                        </li>
                        <li>
                            <Link to="/register" activeClassName="active">注册</Link>
                        </li>
                    </ul>

                )
            }
        };

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="logo" href="javascript:;"></a>
                        </div>

                        <div className="navbar-menu">
                            <ul className="nav navbar-nav navbar-right">
                                {navMenu}
                                {otherMenu()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}