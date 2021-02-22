import React from "react";
import { Route } from "react-router-dom";

// container
import PageForm from "./components/main/page";
import LoginForm from "./components/auth/loginForm";
import RegisterForm from "./components/auth/registerForm";
import ProfileForm from "./components/profile";
import UploadForm from "./components/main/upload";
import PostForm from "./components/posts/post";
import WatchVideoForm from "./components/main/watchvideo";
import OtherProfile from "./components/otherProfile";

const App = () => {
  return (
    <>
      <Route component={PageForm} path="/" exact />
      <Route component={WatchVideoForm} path="/video/:videoId" exact />
      <Route component={ProfileForm} path="/profile" exact />
      <Route component={LoginForm} path="/login" exact />
      <Route component={RegisterForm} path="/register" exact />
      <Route component={UploadForm} path="/upload" exact />
      <Route component={PostForm} path="/post" exact />
      <Route component={OtherProfile} path="/profile/:userId" exact />
    </>
  );
}

export default App;
