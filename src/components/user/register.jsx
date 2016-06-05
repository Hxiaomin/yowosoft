import "./register.less";

export default class Register extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	register: {
	    		account: "",
		        name: "",
		        password: ""
	        }
	    }
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
  	}
  	
  	handleChange(event){
  		event.stopPropagation();
		event.preventDefault();

	    var form = event.target.form;
	    this.setState({
	        register: {
        		account: form.account.value,
	          	name: form.name.value,
	          	password: form.password.value
	        }
	    })
  	}
  	register(event){
  		event.stopPropagation();
		event.preventDefault();
  		var _data = this.state.register;	    
	    Http.post('/yowosoft/auth/register', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
         	swal("注册成功!", "账户为:" + this.state.register.account, "success");
	        this.setState({
	        	register: {
		    		account: "",
			        name: "",
			        password: ""
		        }
	        })
	      }else{
	        //console.log(resultMsg + '['+ resultCode +']')
	        swal("注册失败!", res.resultMsg + '['+ res.resultCode +']', "error") 
	      }
	    })
  	}
	render(){
		return (
			<div className="register animated zoomIn mt57">
				<form className="form-horizontal">
					<h4>用户注册</h4>
					<div className="form-group">
	                    <label htmlFor="account" className="col-sm-2 control-label">登录账号</label>
	                    <div className="col-sm-10">
	                    	<input type="text" name="account" className="form-control" value={this.state.register.account} onChange={this.handleChange} placeholder="account" />
	                    </div>
                  	</div>
     				<div className="form-group">
	                    <label htmlFor="name" className="col-sm-2 control-label">用户名</label>
	                    <div className="col-sm-10">
	                    	<input type="text" name="name" className="form-control" value={this.state.register.name} onChange={this.handleChange} placeholder="name" />
	                    </div>
                  	</div>

                  	<div className="form-group">
	                    <label htmlFor="password" className="col-sm-2 control-label">密码</label>
	                    <div className="col-sm-10">
	                    	<input type="password" name="password" className="form-control" value={this.state.register.password} onChange={this.handleChange} placeholder="password" />
	                    </div>
                  	</div>
				  	<button type="button" className="btn btn-green fr" onClick={this.register}  disabled={!this.state.register.name || !this.state.register.password || !this.state.register.account}>立即注册</button>
				</form>
			</div>
		)
	}	
}
