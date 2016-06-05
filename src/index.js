
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import Home from '../src/components/home/Home.jsx';
import IndexPage from '../src/components/home/IndexPage.jsx';
import About from '../src/components/about/About.jsx';
import Register from '../src/components/user/Register.jsx';
import Login from '../src/components/user/Login.jsx';
import Join from '../src/components/join/Join.jsx';

import UserCenter from '../src/components/user/userCenter.jsx';

import Job from '../src/components/job/Job.jsx';
import JobLetterDetail from '../src/components/job/JobLetterDetail.jsx';

import Me from '../src/components/user/Me.jsx';

import Project from '../src/components/project/Project.jsx';
import NewProject from '../src/components/project/NewProject.jsx';
import ProjectDetail from '../src/components/project/ProjectDetail.jsx';
import ProjectEdit from '../src/components/project/ProjectEdit.jsx';


import UserList from '../src/components/UserManager/UserList.jsx';
import UserDetail from '../src/components/UserManager/UserDetail.jsx';
import EditUserInfo from '../src/components/UserManager/EditUserInfo.jsx';

import Stage from '../src/components/Stage/StageList.jsx';
import StageDetail from '../src/components/Stage/StageDetail.jsx';
import StageEdit from '../src/components/Stage/StageEdit.jsx';
import NewStage from '../src/components/Stage/NewStage.jsx';


//路由
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
        <IndexRoute component={IndexPage} />
        <Route path="home" component={IndexPage} />
        <Route path="about" component={About} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route path="join" component={Join} />
        <Route path="userCenter" component={UserCenter}>
            <IndexRoute component={Me}/>
            <Route path="job" component={Job} />
            <Route path="jobLetterDetail/:id" component={JobLetterDetail} />
            <Route path="me" component={Me} />
            <Route path="project" component={Project} />
            <Route path="newProject" component={NewProject} />
            <Route path="projectDetail/:id" component={ProjectDetail} />
            <Route path="projectEdit/:id" component={ProjectEdit} />
            <Route path="manager" component={UserList} />
            <Route path="userDetail/:id" component={UserDetail} />
            <Route path="editUserInfo/:id" component={EditUserInfo} />
            <Route path="stage" component={Stage} />
            <Route path="newStage" component={NewStage} />
            <Route path="stageDetail/:id" component={StageDetail} />
            <Route path="stageEdit/:id" component={StageEdit} />
        </Route>
    </Route>
  </Router>
), document.getElementById('app'));