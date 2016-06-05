import { Link } from 'react-router';
import "./UserDetail.less";


export default class UserDetail extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	curUserDetail: {},

	    }
  	}
  	getUserDetail(id){
  		Http.get('/yowosoft/user/' + id).then((res)=>{
	      if(res.success){
	        console.log(res);
	        this.setState({
	        	curUserDetail: res.data
	        })
	      }else{
	        console.log(res.resultMsg + '['+ res.resultCode +']')
	      }
	    })
  	}
  	componentWillMount(){
  		this.getUserDetail(this.props.params.id)
  	}
  	componentDidMount(){
  		
  	}
	render(){
		return (
			<div className="UserDetail">
				<div clasName="backToList">
					<Link to={'/userCenter/manager'}>返回列表</Link> 
				</div>
				<h4>用户信息</h4>
				<div className="userInfoDetail">
					<blockquote>
					 	<p>id: {this.props.params.id}</p>
						<p>账号: {this.state.curUserDetail.account}</p>
						<p>姓名: {this.state.curUserDetail.name}</p>
						<p>QQ号码: {this.state.curUserDetail.qqNumber}</p>
						<p>公司: {this.state.curUserDetail.company}</p>
						<p>地址: {this.state.curUserDetail.address}</p>
						<p>邮箱: {this.state.curUserDetail.email}</p>
					</blockquote>
				</div>
			</div>
		)
	}	
}