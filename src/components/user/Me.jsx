import "./Me.less";

export default class Me extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: {
                name: this.props.userInfo.name,
                company: this.props.userInfo.company,
                address: this.props.userInfo.address,
                qqNumber: this.props.userInfo.qqNumber,
                sex: this.props.userInfo.sex,
                email: this.props.userInfo.email,
                contact: this.props.userInfo.contact,
                avatars: this.props.userInfo.avatars
            },
            editPassword: {
                password: '',
                newPassword: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.editUserInfo = this.editUserInfo.bind(this);
        this.editAccountPassword = this.editAccountPassword.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.iframeLoad = this.iframeLoad.bind(this);
        this.setAvatar = this.setAvatar.bind(this);

        this.formData = [
            {title: '昵称', name: 'name'},
            {title: '公司', name: 'company'},
            {title: '地址', name: 'address'},
            {title: 'QQ', name: 'qqNumber'},
            {title: '性别', name: 'sex'},
            {title: '邮箱', name: 'email'},
            {title: '手机', name: 'contact'}
        ]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            edit: {
                name: nextProps.userInfo.name,
                company: nextProps.userInfo.company,
                address: nextProps.userInfo.address,
                qqNumber: nextProps.userInfo.qqNumber,
                sex: nextProps.userInfo.sex,
                email: nextProps.userInfo.email,
                contact: nextProps.userInfo.contact,
                avatars: nextProps.userInfo.avatars
            }
        })
    }

    componentDidMount() {

    }

    handleChange(event) {
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

    handlePasswordChange(event) {
        var form = event.target.form;
        this.setState({
            editPassword: {
                password: form.password.value,
                newPassword: form.newPassword.value
            }
        })
    }

    editUserInfo() {
        var _data = this.state.edit;
        Http.post('/yowosoft/user/person', JSON.stringify(_data)).then((res)=> {
            if (res.success) {
                swal("修改用户信息成功!", "", "success");
            } else {
                //console.log(resultMsg + '['+ resultCode +']')
                swal("修改用户信息失败!", res.resultMsg + '[' + res.resultCode + ']', "error");
            }
        })
    }

    editAccountPassword() {
        var _data = this.state.editPassword;
        Http.post('/yowosoft/user/password', JSON.stringify(_data)).then((res)=> {
            if (res.success) {
                swal("修改密码成功!", "", "success");
            } else {
                //console.log(resultMsg + '['+ resultCode +']')
                swal("修改密码失败!", res.resultMsg + '[' + res.resultCode + ']', "error");
            }
        })
    }

    uploadAvatar(event) {
        var file = event.target.files[0];
        console.info(event.target.files[0]);
        if (file != null) {
            event.target.form.submit();
        }

    }

    iframeLoad() {
        var iframebody = window.frames['uploadAvatarIframe'].document.body;
        var resultData = JSON.parse(iframebody.childNodes['0'].innerText);
        console.info(JSON.parse(iframebody.childNodes['0'].innerText));
        var avatarsArr = [];
        avatarsArr.push(resultData.data);
        if (resultData.success) {
            this.state.edit.avatars = avatarsArr;
            this.props.userInfo.avatars = avatarsArr;
            this.setAvatar();
        }
    }

    setAvatar() {
        var _data = {avatars: this.state.edit.avatars};
        console.info(_data);
        Http.post('/yowosoft/user/person', JSON.stringify(_data)).then((res)=> {
            if (res.success) {
                swal("修改用户头像成功!", "", "success");
                location.reload();
            } else {
                swal("修改用户头像失败!", res.resultMsg + '[' + res.resultCode + ']', "error");
            }
        })
    }

    render() {
        let userInfoformData = this.formData.map((item, i) => {
            return (
                <div className="form-group" key={i}>
                    <label htmlFor={item.name} className="col-sm-2 control-label">{item.title}</label>
                    <div className="col-sm-10">
                        <input type="text" name={item.name} className="form-control" value={this.state.edit[item.name]}
                               onChange={this.handleChange} placeholder={item.title}/>
                    </div>
                </div>
            )
        });

        return (
            <div className="me animated fadeIn">
                <h4>个人资料</h4>

                <iframe className="hidden" name="uploadAvatarIframe" width="0" height="0" scrolling="no"
                        onLoad={this.iframeLoad}></iframe>
                <form id="avatar-form" name="upload" className="form-horizontal uploadAvatar" method="post"
                      encType="multipart/form-data" target="uploadAvatarIframe" action="/yowosoft/file/upload">
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 control-label">头像</label>
                        <div className="col-sm-10">
                            <input type="file" accept="image/jpg, image/jpeg, image/png" name="file"
                                   onChange={this.uploadAvatar}/>
                        </div>
                    </div>
                    <button type='button' className="btn btn-green uploadfile" onClick={this.setAvatar}>上传新头像</button>
                </form>
                <form name="editUserInfo" className="form-horizontal editUserInfo">
                    {userInfoformData}
                    <button type="button" className="btn btn-green fr" onClick={this.editUserInfo}>修改信息</button>
                </form>
                <h4>密码管理</h4>
                <form name="editAccountPassword" className="form-horizontal editAccountPassword">
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 control-label">新密码</label>
                        <div className="col-sm-10">
                            <input type="password" name="password" className="form-control"
                                   value={this.state.editPassword.password} onChange={this.handlePasswordChange}
                                   placeholder="新密码"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 control-label">确认密码</label>
                        <div className="col-sm-10">
                            <input type="password" name="newPassword" className="form-control"
                                   value={this.state.editPassword.newPassword} onChange={this.handlePasswordChange}
                                   placeholder="确认密码"/>
                        </div>
                    </div>

                    <button type="button" className="btn btn-green fr" onClick={this.editAccountPassword}>修改密码</button>
                </form>
            </div>
        )
    }
}