import { Link } from 'react-router';
import "./ProjectEdit.less";

export default class ProjectEdit extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            projectEdit: {
                id:"",
                projectName: "",
                content: "",
                lowestProjectFund: "",
                highProjectFund: "",
                startTime: "",
                endTime: "",
                contact: "",
                address: "",
                company: "",
                qqNumber: "",
                username: "",
                remark: "",
                type: ""
            }
        };
        this.projectId = "";
        this.projectEditFromData = [
            {name: 'projectName', title: '项目名称'},
            {name: 'content', title: '需求内容'},
            {name: 'lowestProjectFund', title: '最少项目经费'},
            {name: 'highProjectFund', title: '最高项目经费'},
            {name: 'startTime', title: '需求开始时间'},
            {name: 'endTime', title: '需求结束时间'},
            {name: 'contact', title: '联系方式'},
            {name: 'address', title: '联系地址'},
            {name: 'company', title: '需求方公司单位'},
            {name: 'qqNumber', title: '客户QQ号码'},
            {name: 'username', title: '客户姓名'},
            {name: 'remark', title: '附加信息'},
            {name: 'type', title: '项目类型'}
        ];
        this.editProject = this.editProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.getProjectDetail(this.props.params.id);
    }

    //获取项目详情
    getProjectDetail(id){
        Http.get('/yowosoft/project/' + id).then((res)=>{
            if(res.success){
                this.setState({
                    projectEdit: {
                        projectName: res.data.projectName,
                        content: res.data.content,
                        lowestProjectFund: res.data.lowestProjectFund,
                        highProjectFund: res.data.highProjectFund,
                        startTime: res.data.startTime,
                        endTime: res.data.endTime,
                        contact: res.data.contact,
                        address: res.data.address,
                        company: res.data.company,
                        qqNumber: res.data.qqNumber,
                        username: res.data.username,
                        remark: res.data.remark,
                        type: res.data.type
                    }
                });
                this.projectId = res.data.id;
            }else{
                console.log(res.resultMsg + '['+ res.resultCode +']')
            }
        })
    }

    handleChange(event){
        var form = event.target.form;
        this.setState({
            projectEdit: {
                projectName: form.projectName.value,
                content: form.content.value,
                lowestProjectFund: form.lowestProjectFund.value,
                highProjectFund: form.highProjectFund.value,
                startTime: form.startTime.value,
                endTime: form.endTime.value,
                contact: form.contact.value,
                address: form.address.value,
                company: form.company.value,
                qqNumber: form.qqNumber.value,
                username: form.username.value,
                remark: form.remark.value,
                type: form.type.value
            }
        })
    }

    editProject(){
        var _data = this.state.projectEdit;
        this.state.projectEdit.id = this.projectId;
        var id = this.projectId;
        Http.post('/yowosoft/project/' + id, JSON.stringify(_data)).then((res)=>{
            if(res.success){
                swal("修改成功!", "", "success");
            }else{
                swal("修改失败!", res.resultMsg + '['+ res.resultCode +']', "error");
            }
        })
    }

    render(){
        let projectEditFormData = this.projectEditFromData.map((item, i) => {
            return(
                <div className="form-group" key={i}>
                    <label  htmlFor={item.name} className="col-sm-2 control-label">{item.title}</label>
                    <div className="col-sm-10">
                        <input type="text" name={item.name} className="form-control" value={this.state.projectEdit[item.name]} onChange={this.handleChange} placeholder={item.title} />
                    </div>
                </div>
            )
        });
        return (
            <div className="projectEdit-container">
                <Link to={'/userCenter/project'}>返回列表</Link>
                <h4>修改项目</h4>
                <form className="form-horizontal">
                    {projectEditFormData}
                    <button type="button" className="btn btn-green fr" onClick={this.editProject}>修改</button>
                </form>
            </div>
        )
    }

}