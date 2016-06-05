import "./userCenter.less";
import UserPageOper from "./UserPageOper.jsx";

export default class UserCenter extends React.Component{
	constructor(props) {
	    super(props);

	    // this.userOperMenu = [
	    // 	{name: '个人资料', url: '/userCenter/me'},
	    // 	{name: '用户管理', url: '/userCenter/manager'},
	    // 	{name: '项目管理', url: '/userCenter/project'},
	    // 	{name: '求职信息管理', url: '/userCenter/job'}
	    // ];

	    this.state = {
	    	currentUserOperMenu: [{name: '个人资料', url: '/userCenter/me'}]
	    };
	    this.rights = {
	    	project: false,
	    	user: false,
	    	stage: false,
	    	job: false
	    }

  	}

  	componentWillReceiveProps(nextProps){
  		//console.log("componentWillReceiveProps");
  		this.updateCurrentUserRight(nextProps.permissionInfo);
  	}
  	componentWillMount(){
  		//console.log("componentWillMount");
  		this.updateCurrentUserRight(this.props.permissionInfo);
  	}

  	//权限管理--粗略控制菜单（未完成）
  	updateCurrentUserRight(data){
  		this.state.currentUserOperMenu = [{name: '个人资料', url: '/userCenter/me'}];
  		data.forEach((item, i) => {
  			//this.state.currentUserOperMenu.push(item);
  			if(item.indexOf('project') !== -1 ){
  				this.rights.project = true;
  			}
  			if(item.indexOf('user') !== -1 ){
  				this.rights.user = true;
  			}
  			if(item.indexOf('job') !== -1 ){
  				this.rights.job = true;
  			}
  			if(item.indexOf('stage') !== -1 ){
  				this.rights.stage = true;
  			}
  		});

  		if(this.rights.user){
  			this.state.currentUserOperMenu.push({
  				name: '用户管理', url: '/userCenter/manager'
  			})
  		}

  		if(this.rights.project){
  			this.state.currentUserOperMenu.push({
  				name: '项目管理', url: '/userCenter/project'
  			})
  		}
  		if(this.rights.job){
  			this.state.currentUserOperMenu.push({
  				name: '求职信息管理', url: '/userCenter/job'
  			})
  		}
  		if(this.rights.stage){
  			this.state.currentUserOperMenu.push({
  				name: '项目日志', url: '/userCenter/stage'
  			})
  		}

  		//console.log(this.state.currentUserOperMenu);
  	}

	render(){
		return (
			<div className="userCenter mt57">
				<div className="userCenter-container">
					<UserPageOper 
						userOperMenu={this.state.currentUserOperMenu} 
						userInfo={this.props.userInfo}
						permissionInfo={this.props.permissionInfo}
					/>
					{this.props.children&& React.cloneElement(this.props.children, {
			            userInfo: this.props.userInfo,
			            isLogin: this.props.isLogin,
			            permissionInfo: this.props.permissionInfo
		          	})}
					<div className="clearfix"></div>
				</div>
			</div>
		)
	}	
}

