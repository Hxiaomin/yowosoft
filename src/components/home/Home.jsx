import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import "./home.less";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}, //用户信息
            permissionInfo: [], //用户权限列表
            isLogin: false, //是否登陆
            isTop: true,//定义一个布尔值，用于判断是否到达顶部
            display: 'none',
            timer: '',
            showUserInfo:false
        };
        this.setLogoutStatus = this.setLogoutStatus.bind(this);
        this.setLoginStatus = this.setLoginStatus.bind(this);
        this.toTop = this.toTop.bind(this);
    }

    componentWillMount() {
        this.isLogin();
    }

    componentDidMount() {
        var _this = this;
        window.onscroll = function () {
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var clientHeight = document.documentElement.clientHeight;
            //如果滚动高度大于可视区域高度，则显示回到顶部按钮
            if (osTop >= clientHeight) {
                _this.setState({
                    display: 'block'
                });
            } else {         //否则隐藏
                _this.setState({
                    display: 'none'
                });
            }

            //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
            if (!_this.state.isTop) {
                clearInterval(_this.timer);
            }
            _this.state.isTop = false;
        };

        /*if(document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady', this.sendMessage(), false);
        }else if(document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady' , this.sendMessage());
            document.attachEvent('onWeixinJSBridgeReady' , this.sendMessage());
        }*/
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    isLogin() {
        Http.post('/yowosoft/auth/isLogin').then((res)=> {
            if (res.success) {
                this.setLoginStatus(res.data);
            } else {
                this.setLogoutStatus();
            }
        })
    }

    setLogoutStatus() {
        this.setState({
            userInfo: {},
            permissionInfo: [],
            isLogin: false
        })
    }

    setLoginStatus(userInfo) {
        this.setState({
            userInfo: userInfo.userInfo,
            permissionInfo: userInfo.permissionInfo,
            isLogin: true
        })
    }

    toTop() {
        //设置一个定时器
        this.timer = setInterval(function () {
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            // this.setState({
            // 	isTop: true
            // });
            this.state.isTop = true;
            //用于阻止滚动事件清除定时器
            if (osTop == 0) {
                clearInterval(this.timer);
            }
        }.bind(this), 30);
    }

    sendMessage(){
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid":"", 									//appid 设置空就好了。
                "img_url":"http://www.yowosoft.com/images/Members/5.jpg",	//分享时所带的图片路径
                "img_width":"120", 								//图片宽度
                "img_height":"120", 							//图片高度
                "link":"http://www.yowosoft.com", 				//分享附带链接地址
                "desc":"优沃软件--放心有我，记得优沃", 			    //分享内容介绍
                "title":"分享内容"
            }, function(res){/*** 回调函数，最好设置为空 ***/

            });
        });

        WeixinJSBridge.on('menu:share:timeline', function(argv){
            WeixinJSBridge.invoke('shareTimeline',{
                "appid":"", 									//appid 设置空就好了。
                "img_url":"http://www.yowosoft.com/images/Members/5.jpg",	//分享时所带的图片路径
                "img_width":"120", 								//图片宽度
                "img_height":"120", 							//图片高度
                "link":"http://www.yowosoft.com", 				//分享附带链接地址
                "desc":"优沃软件--放心有我，记得优沃", 			    //分享内容介绍
                "title":"分享内容"
            }, function(res){/*** 回调函数，最好设置为空 ***/
            });

        });
    }

    render() {
        return (
            <div>
                <img className="dn" src="http://www.yowosoft.com/images/Members/5.jpg" alt=""/>
                <Nav
                    setLogoutStatus={this.setLogoutStatus}
                    setLoginStatus={this.setLoginStatus}
                    isLogin={this.state.isLogin}
                    userInfo={this.state.userInfo}
                    permissionInfo={this.state.permissionInfo}
                    showUserInfo={this.state.showUserInfo}
                />
                {this.props.children && React.cloneElement(this.props.children, {
                    userInfo: this.state.userInfo,
                    permissionInfo: this.state.permissionInfo,
                    isLogin: this.state.isLogin,
                    setLoginStatus: this.setLoginStatus
                })}
                <Footer />
                <div id="to_top" onClick={this.toTop} style={{display: this.state.display}}></div>
            </div>
        )
    }
}

