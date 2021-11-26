import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,     // we use this to navigate any other url to a particular url like /myapps to /learn
  Link,         // we use this at a place of anchor (a) tag.
  Outlet,       // we use this to set that where we want to show content.
  useParams,    // we use this to get url params
  NavLink,      // we use this to set with active url
  useNavigate,  // we use this to send data from one url to another
  useLocation   // we use this to get data which transfered by useNavigate()
} from 'react-router-dom';

ReactDOM.render(
  <Router>

    <Routes>

      {/* Here we have to use element instead of components */}
      <Route path="/" element={<Home />} />

      {/* By this way we can navigate any other url to any particular url */}
      <Route path="/myapps" element={<Navigate to="/learn" />} />

      <Route path="/learn" element={<Learn />}>

        {/* Here we are declaring a innerpath which is in under /learn and here we don't need to type / before path name otherwise it will show error */}
        {/* Here we are declaring element which we want to show but it is not going to show... to show it we have to use outlet and it show content where we set outlet */}
        {/* To create a complete separate page we have to use a different route */}
        <Route path="courses" element={<Courses />} >

          {/* By using this way we can fetch url data and we can show it anywhere */}
          <Route path=":courseid" element={<Courseid />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>

  </Router>,
  document.getElementById('root')
);


function Home() {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  )
}


function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here...</h4>


      <Link style={{ padding: "8px 19px 10px 19px", textDecoration: "none", backgroundColor: "black", borderRadius: "5px", margin: "5px", color: "white" }} to="/learn/courses">courses</Link>


      <Link style={{ padding: "8px 19px 10px 19px", textDecoration: "none", backgroundColor: "blue", borderRadius: "5px", margin: "5px", color: "white" }} to="/learn/bundles">bundle</Link>


      <Outlet />
    </div>
  )
}



function Courses() {
  const courseName = ["React", "Nodejs", "Angular", "Vue", "Django"];
  const courseId = courseName[Math.floor(Math.random() * courseName.length)];

  return (
    <div>
      <h1>Courses List</h1>
      <h4>Course Card</h4>

      {/* By this way we can show that which tab is active now */}

      <NavLink to={`/learn/courses/${courseId}`} style={({ isActive }) => { return { backgroundColor: isActive ? "black" : "blue", padding: "8px 19px 10px 19px", textDecoration: "none", borderRadius: "5px", margin: "5px", color: "white" } }} >
        {courseId}
      </NavLink>

      <NavLink to={`/learn/courses/tests`} style={({ isActive }) => { return { backgroundColor: isActive ? "black" : "blue", padding: "8px 19px 10px 19px", textDecoration: "none", borderRadius: "5px", margin: "5px", color: "white" } }} >
        Tests
      </NavLink>


      <NavLink to={`/learn/courses/model`} style={({ isActive }) => { return { backgroundColor: isActive ? "black" : "blue", padding: "8px 19px 10px 19px", textDecoration: "none", borderRadius: "5px", margin: "5px", color: "white" } }} >
        Model Papers
      </NavLink>


      <NavLink to={`/learn/courses/assignment`} style={({ isActive }) => { return { backgroundColor: isActive ? "black" : "blue", padding: "8px 19px 10px 19px", textDecoration: "none", borderRadius: "5px", margin: "5px", color: "white" } }} >
        Assignments
      </NavLink>


      <Outlet />
    </div>
  )
}


function Bundles() {
  return (
    <div>
      <h1>Bundle List</h1>
      <h4>Bundle Card</h4>
    </div>
  )
}


function Courseid() {
  // To fetch url data we have to use useParams and it already look all params so we don't need to use :
  const { courseid } = useParams();

  // We use navigate to redirect user and to hold data from one component to other component
  const navigate = useNavigate();

  return (
    <div>
      <h2>User has selected {courseid} course.</h2>

      {/* There are two ways to transfer data (navigate and Link) and we use state to set data which we want to transfer */}
      <button style={{ padding: "8px 19px 10px 19px", textDecoration: "none", backgroundColor: "black", borderRadius: "5px", margin: "5px", color: "white"}}onClick={() => {
        navigate("/dashboard", {state: "399"});
      }}>Price</button>

      <Link to="/dashboard" state={courseid} >Random</Link>
    </div>
  )
};

function Dashboard() {
  // Here we are getting data which is transfered by useNavigate and we use useLocation to get data
  const location = useLocation();

  return (
    <div>
      {/* Here we are setting data which is getting through useNavigate */}
      <h1>Price for your course is {location.state}</h1>
    </div>
  )
}