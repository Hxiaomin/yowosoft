import "./join.less";

export default class Join extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	job: {
	    		name: '',
		    	sex: '',
		    	contact: '',
		    	qqNumber: '',
		    	jobIntension: '',
		    	professionalSkill: '',
		    	highestDegree: '',
		    	workExperience: '',
		    	studyExperience: '',
		    	selfAssessment : ''
	    	}
	    	
	    }
	    this.handleChange = this.handleChange.bind(this);
	    this.sumbmitJobInfo = this.sumbmitJobInfo.bind(this);
	    this.processFiles = this.processFiles.bind(this);
	    this.filesPaths=[];

	    this.joinUsFormData = [
	    	{name: 'name', desc: '姓名'},
	    	{name: 'sex', desc: '性别'},
	    	{name: 'contact', desc: '联系方式'},
	    	{name: 'qqNumber', desc: 'QQ号码'},
	    	{name: 'jobIntension', desc: '工作意向'},
	    	{name: 'professionalSkill', desc: '专业技能'},
	    	{name: 'highestDegree', desc: '最高学历'},
	    	{name: 'workExperience', desc: '工作经历'},
	    	{name: 'studyExperience', desc: '学习经历'},
	    	{name: 'selfAssessment', desc: '自我评价'},
	    ]
  	}
  	handleChange(event){
	    var form = event.target.form;
      	this.setState({
	      	job: {
	      		name: form.name.value,	
		    	sex: form.sex.value,
		    	contact: form.contact.value,
		    	qqNumber: form.qqNumber.value,
		    	jobIntension: form.jobIntension.value,
		    	professionalSkill: form.professionalSkill.value,
		    	highestDegree: form.highestDegree.value,
		    	workExperience: form.workExperience.value,
		    	studyExperience: form.studyExperience.value,
		    	selfAssessment : form.selfAssessment.value,
	      	}
      	})
	      
  	}

  	initForm(){
  		this.setState({
  			job: {
  				name: '',
		    	sex: '',
		    	contact: '',
		    	qqNumber: '',
		    	jobIntension: '',
		    	professionalSkill: '',
		    	highestDegree: '',
		    	workExperience: '',
		    	studyExperience: '',
		    	selfAssessment : ''
  			}
  		})
  	}
  	processFiles() { 
      var message = this.refs.message;
      var files = this.refs.file.files;
      console.log(files.length);
      var j = 0;
      for(var i=0; i<files.length;i++) {
        //取得下一个文件  
        var file = files[i];    
        
        Http.post('yowosoft/file/upload',{"file":file}).then((res)=>{ 
        	if(res.success){ 
		        swal("上传成功!", "", "success");
		        message.innerHTML += "文件名：" + files[j].name + "<br>";
		        message.innerHTML += "文件大小：" + files[j].size + "字节<br>";
		        message.innerHTML += "文件类型：" + files[j].type + "<br><br>";
		        this.filesPaths.push(res.data);
		        j++;
		    }else{
		        swal("上传失败!", res.resultMsg + '['+ res.resultCode +']', "error");
		    }
        })
      }      
    }
  	sumbmitJobInfo(){
  		var _data = this.state.job;
  		var message = this.refs.message;
  		var form = this.refs.joinUsForm;
  		_data["accessoryPaths"] = this.filesPaths;
	    Http.post('yowosoft/job', JSON.stringify(_data)).then((res)=>{
	      if(res.success){
	        //console.log('提交求职信息成功');	 
	        swal("提交求职信息成功!", "", "success");
	        this.initForm(); 
	        this.filesPaths=[];   
	        message.innerHTML = null;   
	        form.reset();
	      }else{
	        //console.log(res.resultMsg + '['+ res.resultCode +']');
	        swal("提交求职信息失败!", res.resultMsg + '['+ res.resultCode +']', "error");
	      }
	    })
  	}
	render(){
		let joinUsFormData = this.joinUsFormData.map((item, i) => {
			return(
				<div className='form-group' key={i}>
					<label  htmlFor={item.name} className="col-sm-2 control-label">{item.desc}</label>
					<div className="col-sm-10">
						<input type="text" className="form-control" name={item.name} value={this.state.job[item.name]} onChange={this.handleChange} placeholder={item.desc} />
					</div>
				</div>
			)
		});

		return (
			<div className="joinUs animated zoomIn mt57">
				<h4>求职信息</h4>
				<form ref='joinUsForm' className="form-horizontal">
     				{joinUsFormData}
     				<input id="fileInput" ref="file" type="file" onChange={this.processFiles} multiple={true} />
     				<div ref="message"></div>
				  	<button type="button" className="btn btn-green col-sm-2 fr" onClick={this.sumbmitJobInfo}>提交信息</button>
				</form>
			</div>
		)
	}	
}

