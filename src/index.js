import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams
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
  return (
    <div>
      <h1>Courses List</h1>
      <h4>Course Card</h4>
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
  return (
    <div>
      <p>User has selected {courseid} course.</p>
    </div>
  )
};