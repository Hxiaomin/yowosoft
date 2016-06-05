import { Link } from 'react-router';
import "./EditUserInfo.less";

export default class EditUserInfo extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	edit: {
				id:"",
	    		name: "",
	    		company: "",
	    		address: "",
	    		qqNumber: "",
	    		sex: "",
	    		email: "",
	    		contact: "",
	    		avatar: ""
	    	},
	    	editPassword: {
	    		password: '',
	    		newPassword: ''
	    	},
	    	curUserDetail: {}
	    };

	    this.handleChange = this.handleChange.bind(this);
	    this.handlePasswordChange = this.handlePasswordChange.bind(this);
	    this.editUserInfo = this.editUserInfo.bind(this);
	    this.editAccountPassword = this.editAccountPassword.bind(this);

	    this.formData = [
	    	{title: '用户昵称', name: 'name'},
	    	{title: '公司', name: 'company'},
	    	{title: '地址', name: 'address'},
	    	{title: 'QQ号码', name: 'qqNumber'},
	    	{title: '性别', name: 'sex'},
	    	{title: '邮箱', name: 'email'},
	    	{title: '联系方式', name: 'contact'}
	    ]
  	}
  	// componentWillReceiveProps(nextProps){
  	// 	console.log("componentWillReceiveProps")
  	// 	this.setState({
  	// 		edit:{
  	// 			name: nextProps.userInfo.name,
	  //   		company: nextProps.userInfo.company,
	  //   		address: nextProps.userInfo.address,
	  //   		qqNumber: nextProps.userInfo.qqNumber,
	  //   		sex: nextProps.userInfo.sex,
	  //   		email: nextProps.userInfo.email,
	  //   		contact: nextProps.userInfo.contact,
	  //   		avatar: nextProps.userInfo.avatar,
  	// 		}
  	// 	})
  	// }
  	componentWillMount(){
  		this.getUserDetail(this.props.params.id)
  	}

  	getUserDetail(id){
  		Http.get('/yowosoft/user/' + id).then((res)=>{
	      if(res.success){
	        console.log(res);
	        this.setState({
	        	curUserDetail: res.data,
	        	edit: {
					id:res.data.id,
		    		name: res.data.name,
		    		company: res.data.company,
		    		address: res.data.address,
		    		qqNumber: res.data.qqNumber,
		    		sex: res.data.sex,
		    		email: res.data.email,
		    		contact: res.data.contact,
		    		avatar: res.data.avatar
		    	}
	        })
	      }else{
	        console.log(res.resultMsg + '['+ res.resultCode +']')
	      }
	    })
  	}

  	handleChange(event){
	    var form = event.target.form;
	    this.setState({
	        edit: {
	    		name: form.name.value,
	    		company: form.company.value,
	    		address: form.address.value,
	    		qqNumber: form.qqNumber.value,
	    		sex: form.sex.value,
	    		email: form.email.value,
	    		contact: form.contact.value
	    		//avatar: form.avatar.value,
	    	}
	    })
  	}

  	handlePasswordChange(event){
	    var form = event.target.form;
	    this.setState({
	        editPassword: {
	    		password: form.password.value,
	    		newPassword: form.newPassword.value
	    	}
	    })
  	}

  	editUserInfo(){
	    var id = this.props.params.id;
		this.state.edit.id = id;
		var _data = this.state.edit;
	    Http.post('/yowosoft/user/' + id, JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	        swal("修改用户信息成功!", "", "success");
	      }else{
	        //console.log(resultMsg + '['+ resultCode +']') 
	        swal("修改用户信息失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
  	}

  	editAccountPassword(){
  		var _data = this.state.editPassword;	    
	    Http.post('/yowosoft/user/password', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	        swal("修改密码成功!", "", "success");
	      }else{
	        //console.log(resultMsg + '['+ resultCode +']') 
	        swal("修改密码失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
  	}

	render(){
		let userInfoformData = this.formData.map((item, i) => {
			return(
				<div className="form-group" key={i}>
					<label  htmlFor={item.name} className="col-sm-2 control-label">{item.title}</label>
					<div className="col-sm-10">
						<input type="text" name={item.name} className="form-control" value={this.state.edit[item.name]} onChange={this.handleChange} placeholder={item.title} />
					</div>
				</div>
			)
		})

		return (
			<div className="editUserInfo animated fadeIn editUserInfo-text">
				<div className="backToList">
					<Link to={'/userCenter/manager'} className="backTo">返回列表</Link> 
				</div>
				<h4>用户个人资料</h4>	
				<form name="editUserInfo" className="form-horizontal editUserInfo">
					{userInfoformData}
                  	<button type="button" className="btn btn-green fr" onClick={this.editUserInfo}>修改信息</button>
				</form>
				<h4>密码管理</h4>
				<form name="editAccountPassword" className="form-horizontal editAccountPassword">
					<div className="form-group">
	                    <label htmlFor="password" className="col-sm-2 control-label">新密码</label>
	                    <div className="col-sm-10">
	                    	<input type="password" name="password" className="form-control" value={this.state.editPassword.password} onChange={this.handlePasswordChange} placeholder="新密码" />
	                    </div>
                  	</div>
                  	<div className="form-group">
                  	    <label htmlFor="password" className="col-sm-2 control-label">确认密码</label>
                  	    <div className="col-sm-10">
	                    	<input type="password" name="newPassword" className="form-control" value={this.state.editPassword.newPassword} onChange={this.handlePasswordChange} placeholder="确认密码" />
                  	    </div>
                  	</div>

                  	<button type="button" className="btn btn-green fr" onClick={this.editAccountPassword}>修改密码</button>
				</form>
			</div>
		)
	}	
}