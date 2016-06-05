import './Login.less'

export default class Login extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	login: {
		        account: "",
		        password: "",
		        rememberMe: false
		      }
	    };

	    this.login = this.login.bind(this);
	    this.handleChange = this.handleChange.bind(this);
  	}
  	
  	login(event){
  		event.stopPropagation();
		event.preventDefault();
    	var _data = this.state.login;
    	this.state.login.rememberMe = this.state.login.rememberMe ? '1' : '0';
	    Http.post('/yowosoft/auth/login', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
            this.toggleLoginStatus(res.data);
	        window.location.href = '/home';
	        swal("登录成功!", "当前用户:" + res.data.userInfo.name, "success");
	      }else{
	        console.error(res.resultMsg + '['+ res.resultCode +']');
	        swal("登录失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
    }

	handleChange(event){
		//event.stopPropagation();
		//event.preventDefault();
	    var form = event.target.form;
	    this.setState({
	        login: {
	          account: form.account.value,
	          password: form.password.value,
	          rememberMe: !this.state.login.rememberMe
	        }
	    })
	}
	toggleLoginStatus(userInfo){
		this.props.setLoginStatus(userInfo);
	}

	render(){
		return (
			<div className='login animated zoomIn mt57'>
				<h4>用户登录</h4>	
	        	<form className="form-horizontal" onSubmit={this.login}>
                    <div className="form-group">
                      	<label htmlFor="account" className="col-sm-2 control-label">姓名</label>
                        <div className="col-sm-10">
                        	<input type="text" name="account" className="form-control" value={this.state.login.account} onChange={this.handleChange} placeholder="Username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 control-label">密码</label>
                        <div className="col-sm-10">
                        	<input type="password" name="password" className="form-control" value={this.state.login.password} onChange={this.handleChange} placeholder="Password" />
                        </div>
                    </div>
                   
                    <div className="checkbox fl">
					    <label>
				     	 	<input type="checkbox" name="rememberMe" checked={this.state.login.rememberMe} onChange={this.handleChange} /> 
					    	记住密码
					    </label>
			  	 	</div>
                  
                    <button type="submit" className="btn  fr btn-green" disabled={!this.state.login.account || !this.state.login.password}>登录</button>
                      
              	</form>   
          	</div>
		)
	}	
}