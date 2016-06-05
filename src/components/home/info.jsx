import "./info.less";
export default
class Info extends React.Component {
    constructor(props) {
        super(props);
        //标注点数组
        this.markerArr = [{
            title: "优沃软件",
            content: "专业提供微信开发、网站建设、系统开发、升级运维等服务",
            point: "113.404712|23.04157",
            isOpen: 1,
            icon: {w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5}
        }];
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.initMap();//创建和初始化地图
    }

    componentWillUnmount(){

    }

    //创建和初始化地图函数：
    initMap() {
        this.createMap();//创建地图
        this.setMapEvent();//设置地图事件
        this.addMapControl();//向地图添加控件
        this.addMarker();//向地图中添加marker
    }

    //创建地图函数：
    createMap() {
        var map = new BMap.Map("map");//在百度地图容器中创建一个地图
        var point = new BMap.Point(113.404743, 23.041586);//定义一个中心点坐标
        map.centerAndZoom(point, 18);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }

    //地图事件设置函数：
    setMapEvent() {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
    }

    //创建InfoWindow
    createInfoWindow(i) {
        var json = this.markerArr[i];
        var iw = new BMap.InfoWindow("<b className='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div className='iw_poi_content'>" + json.content + "</div>");
        return iw;
    }

    //创建marker
    addMarker() {
        for (var i = 0; i < this.markerArr.length; i++) {
            var json = this.markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0, p1);
            var iconImg = this.createIcon(json.icon);
            var marker = new BMap.Marker(point, {icon: iconImg});
            var iw = this.createInfoWindow(i);
            var label = new BMap.Label(json.title, {"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)});
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            var index = i;
            var _iw = this.createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open", function () {
                _marker.getLabel().hide();
            });
            _iw.addEventListener("close", function () {
                _marker.getLabel().show();
            });
            label.addEventListener("click", function () {
                _marker.openInfoWindow(_iw);
            });
            if (!!json.isOpen) {
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        }
    }

    //创建一个Icon
    createIcon(json) {
        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
            imageOffset: new BMap.Size(-json.l, -json.t),
            infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            offset: new BMap.Size(json.x, json.h)
        });
        return icon;
    }


    render() {
        return (
            <div className="info">
                <div id="module-one">
                    <div className="service-title">
                        <span className="cn">服务内容</span>
                        <div className="en-div">
                            <span className="line">&nbsp;</span>
                            <span className="en">What we do</span>
                            <span className="line">&nbsp;</span>
                        </div>
                    </div>
                    <div className="service-content">
                        <div className="group group-four">
                            <div className="logo-div"></div>
                            <div className="name">微信开发</div>
                            <div className="detail">
                                <span>为企业及个人建设多种微信宣传平台，汇聚潜在微信用户群，向微信用户提供具有针对性的服务。 如：微网站、微商城、微问卷、微游戏、刮刮乐等。</span>
                            </div>
                        </div>
                        <div className="group group-one">
                            <div className="logo-div"></div>
                            <div className="name">网站建设</div>
                            <div className="detail">
                                <span>向企业及个人提供专业且具有个性化的对外宣传门户网站，帮助客户基于网站宣传实现价值回报。 如：官方网站、电商平台、个人博客、企业论坛等。</span>
                            </div>
                        </div>
                        <div className="group group-two">
                            <div className="logo-div"></div>
                            <div className="name">系统开发</div>
                            <div className="detail">
                                <span>帮企业及个人建设便捷且具有多元化的内部自动办公系统，帮助客户基于信息系统提升办公效率。 如：进销存系统、客户管理系统、资源管理系统等。</span>
                            </div>
                        </div>
                        <div className="group group-three">
                            <div className="logo-div"></div>
                            <div className="name">升级运维</div>
                            <div className="detail">
                                <span>替企业及个人对已有网站或系统进行升级维护服务，帮助客户摆脱技术困扰，更专心于业务领域。 如：速度优化、功能更新、系统重构、技术支持等。</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="module-two">
                    <div className="head">
                        <span className="cn">值得信赖</span>
                        <span className="en">We are a team
                            worth your trusting</span>
                    </div>
                    <div className="content">
                        <div className="row row_one">
                            <div className="group group_one">
                                <div className="logo-div"></div>
                                <div className="light"></div>
                                <div className="name">精英成员团队</div>
                                <div className="detail">
                                    <span>我们的团队成员都毕业于重点大学，并且具有丰富的从业经验，是一支N+N&gt;2N的团队</span>
                                </div>
                            </div>
                            <div className="group group_two">
                                <div className="logo-div">
                                    <div className="logo1"></div>
                                    <div className="logo2"></div>
                                </div>
                                <div className="name">成熟完善技术</div>
                                <div className="detail">
                                    <span>我们始终站在技术的前沿，不断引进专业的技术以满足客户日新月异的多元化需求</span>
                                </div>
                            </div>
                        </div>
                        <div className="row row_two">
                            <div className="group group_three">
                                <div className="logo-div"></div>
                                <div className="name">专业项目实施</div>
                                <div className="detail">
                                    <span>我们誓将“需求分析、系统设计、系统开发、系统测试、系统运维”各个环节做到极致</span>
                                </div>
                            </div>
                            <div className="group group_four">
                                <div className="logo-div"></div>
                                <div className="name">高效优质服务</div>
                                <div className="detail">
                                    <span>我们尊重客户、理解客户，持续提供超越客户期望的产品与服务，做客户永远的伙伴</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="module-three">
                    <div className="head">
                        <span className="cn">关于我们</span>
                        <div className="en_wrap">
                            <span className="line">&nbsp;</span>
                            <span className="en">Who we are</span>
                            <span className="line">&nbsp;</span>
                        </div>
                    </div>
                    <div className="content">
                        <div className="group_wrap">
                            <div className="group group_one">
                                <div className="name">放心&nbsp;有我</div>
                                <div className="detail">
                                    <span>您有绝妙的创意和靠谱的团队，就差程序员来开发网站应用了？</span>
                                    <span>您的公司稳中上进，日趋规模，就差程序员来编写办公系统了？</span>
                                    <span>您受够办公系统种种老旧流程，就差程序员来升级完善流程了？</span>
                                    <span>放心，有我。我们是一支具有丰富建站及系统研发经验的团队。</span>
                                </div>
                            </div>
                            <div className="group group_two">
                                <div className="name">记得&nbsp;优沃</div>
                                <div className="detail">
                                    <span>我们专业提供微信开发、网站建设、系统开发、升级运维等服务。团队成员都有丰富的建站及系统研发经验。我们提供的服务贯彻“需求分析、系统设计、系统开发、系统测试、系统实施、系统运维”各个软件生命周期。</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="module-four">
                    <div className="head">
                        <span className="cn">我们的团队</span>
                        <span className="en">Young and
                            talented people</span>
                    </div>
                    <div className="avatar_wrap">
                        <div className="row_one">
                            <span className="avatar avatar_one"></span>
                            <span className="avatar avatar_four avatar_center"></span>
                            <span className="avatar avatar_seven"></span>
                        </div>
                        <div className="row_two">
                            <span>客户经理</span>
                            <span className="center">项目经理</span>
                            <span>技术顾问</span>
                        </div>
                        <div className="row_three">
                            <span className="avatar avatar_eight"></span>
                            <span className="avatar avatar_two avatar_center"></span>
                            <span className="avatar avatar_three"></span>
                        </div>
                        <div className="row_four">
                            <span>高级前端工程师</span>
                            <span className="center">高级后台工程师</span>
                            <span>高级视觉工程师</span>
                        </div>
                        <a title="查看更多" href="/about" className="more">查看更多>></a><br/><br/>
                        <span className="join_us">
                            <a title="加入我们" href="/join">加入我们</a>
                        </span>

                    </div>
                </div>
                <div id="module-five">
                    <div className="head">
                        <span className="cn">联系我们</span>
                        <div className="en_wrap">
                            <span className="line">&nbsp;</span>
                            <span className="en">Contact us</span>
                            <span className="line">&nbsp;</span>
                        </div>
                    </div>
                    <div id="map"></div>
                    <div className="contain">
                        <ul>
                            <li className="li_one">
                                <span className="logo-span logo_one"></span>
                                <span className="li_one_span">地址：广州大学城外环西路100号广东工业大学工学馆</span>
                            </li>
                            <li className="li_two">
                                <span className="logo-span logo_two"></span>
                                <div>
                                    <span>15626266699、18825155756</span>
                                </div>
                            </li>
                            <li className="li_three">
                                <span className="logo-span logo_three"></span>
                                <span>邮箱：business@yowosoft.com</span>
                            </li>
                            <li className="li_four">
                                <span className="logo-span logo_four"></span>
                                <span>QQ：919019447</span>
                            </li>
                        </ul>
                        <div className="link_wrap">
                            <div className="logo-div"></div>
                            <div className="code_wrap">
                                <div className="name">微信 : yowosoft</div>
                                <img src="/images/module_5_code.png" alt="QR code"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}