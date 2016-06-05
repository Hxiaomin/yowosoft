import { Link } from 'react-router';
import "./UserList.less";
import Page from '../../../src/Components/page/page.jsx';

export default class UserList extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	curPage: 1,
	    	userList: [],
	    	userPageInfo: {},
	    	getUserListStatus: ""
	    };

	    this.getUserList = this.getUserList.bind(this)
  	}

  	getUserList(curPage){
  		this.setState({
  			getUserListStatus: 'init'
  		});
  		Http.get('/yowosoft/user?curPage=' + curPage).then((res)=>{
	      if(res.success){
	      	if(res.dataList.length > 0){
				this.setState({
		        	userList: res.dataList,
		        	userPageInfo: res.pageInfo,
		        	getUserListStatus: 'success'
		        })
	      	}else{
	      		this.setState({
		        	getUserListStatus: 'empty'
		        }) 
	      	}
	            
	      }else{
	        console.log(res.resultMsg + '['+ res.resultCode +']')
	        this.setState({
	        	getUserListStatus: 'fail'
	        }) 
	      }
	    })
  	}
  	removeUser(id){
  		var that = this;
  		swal({   
  			title: "确定删除?",   
  			text: "删除此用户",   
  			ype: "warning",   
  			showCancelButton: true,   
  			confirmButtonColor: "#DD6B55",   
  			confirmButtonText: "确认删除",   
  			closeOnConfirm: false }, 
  			function(){   
  				Http.post('/yowosoft/user/remove/' + id).then((res)=>{
			      if(res.success){
			      	that.getUserList(that.state.curPage);
			      	swal("操作成功!", "用户已删除", "success"); 
			      }else{
			        //console.log(res.resultMsg + '['+ res.resultCode +']')
			        swal("操作失败!", res.resultMsg + '['+ res.resultCode +']', "error"); 
			      }
			    })
  				
  			}
		);
  		
  	}
  	componentWillMount(){
  		this.getUserList(this.state.curPage);
  	}
	render(){
		var self = this;
		let _list = this.state.userList.map((item, i)=>{
			return(
				<tr key={i}>
					<td>{item.name}</td>
					<td>{item.account}</td>
					<td>{item.email}</td>
					<td>{item.qqNumber}</td>
					<td>{item.contact}</td>
					<td className="oper-box">
						<Link to={'/userCenter/userDetail/' + item.id} className="oper">详情</Link>
						<Link to={'/userCenter/editUserInfo/' + item.id} className="oper">修改</Link>
						<a href="javascript:;" className="oper" onClick={this.removeUser.bind(this, item.id)}>删除</a>  
					</td>
				</tr>
			)
		});

		let result = () =>{
			let status;
			switch(this.state.getUserListStatus)
			{	
				case 'init':
					status = <tr><td colSpan="6" className="text-center">正在加载中...</td></tr>;
					break;
				case 'empty':
					status = <tr><td colSpan="6" className="text-center">暂无数据</td></tr>;
					break;
				case 'success':
					status = _list;
					break;
				case 'fail':
					status = <tr><td colSpan="6" className="text-center">加载失败</td></tr>;
					break;
			}
			
			return status;
		};

		return (
			<div className="UserList-container">
				<h4>用户管理</h4>
				<table className="table table-hover table-bordered table-striped">
					<thead>
						<tr>
							<th>用户名</th>
							<th>账号</th>
							<th>邮箱</th>
							<th>QQ</th>
							<th>联系方式</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{result()}
					</tbody>
				</table>
				<Page 
					totalPage={this.state.userPageInfo.totalPage} 
					selectPage={this.getUserList}
				/>
			</div>
		)
	}	
}
