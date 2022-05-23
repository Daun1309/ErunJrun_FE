import React, { lazy, Suspense, useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
//페이지 변경시 마다 맨 위부터 보이게
import ScrollToTop from "./ScrollToTop";
import { useDispatch } from "react-redux";
import { loginCheckDB, logoutDB } from "../redux/modules/user";
import { getCookie } from "./Cookie";
import "./GlobalStyles";
import styled from "styled-components";
import { Spinner, LogoSpinner } from "../elements";

const Main = lazy(() => import("../pages/Main"));
const Header = lazy(() => import("../components/Header"));
const Footer = lazy(() => import("../components/Footer"));
const Login = lazy(() => import("../pages/Login"));
const Mypage = lazy(() => import("../pages/Mypage"));
const GroupFeed = lazy(() => import("../pages/GroupFeed"));
const GroupFilterMob = lazy(() =>
  import("../components/groupFeed/GroupFilterMob")
);
const GroupUpload = lazy(() => import("../pages/GroupUpload"));
const GroupDetail = lazy(() => import("../pages/GroupDetail"));
const KakaoLogin = lazy(() => import("../components/login/KakaoLogin"));
const NaverLogin = lazy(() => import("../components/login/NaverLogin"));
const Recommend = lazy(() => import("../pages/Recommend"));
const Badge = lazy(() => import("../pages/Badge"));
const Check = lazy(() => import("../pages/Check"));
const LoginInfo = lazy(() => import("../pages/LoginInfo"));
const MypageEdit = lazy(() => import("../pages/MypageEdit"));
const GroupEdit = lazy(() => import("../pages/GroupEdit"));
const ServiceInfo = lazy(() => import("../pages/ServiceInfo"));
const Contact = lazy(() => import("../pages/Contact"));
const ServiceTerms = lazy(() => import("../pages/ServiceTerms"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const CourseFeed = lazy(() => import("../pages/CourseFeed"));
const Evaluation = lazy(() => import("../pages/Evaluation"));

function App() {
  const dispatch = useDispatch();

  const token = getCookie("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(loginCheckDB());
    }
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Suspense fallback={<Spinner type="page" />}>
          <Wrapper>
            <Header></Header>
            <ScrollToTop />
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/mypage/:userId" exact component={Mypage} />
            <Route path="/groupfeed" exact component={GroupFeed} />
            <Route path="/groupfeed/filter" exact component={GroupFilterMob} />
            <Route path="/groupupload" exact component={GroupUpload} />
            <Route path="/kakao" exact component={KakaoLogin}></Route>
            <Route path="/naver" exact component={NaverLogin}></Route>
            <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
            <Route path="/mypage/recommend" exact component={Recommend} />
            <Route path="/mypage/badge" exact component={Badge} />
            <Route path="/check/:groupId" exact component={Check} />
            <Route path="/loginInfo" exact component={LoginInfo} />
            <Route path="/groupEdit/:groupId" exact component={GroupEdit} />
            <Route path="/edit" exact component={MypageEdit} />
            <Route path="/coursefeed" exact component={CourseFeed} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/serviceInfo" exact component={ServiceInfo} />
            <Route path="/serviceTerms" exact component={ServiceTerms} />
            <Route path="/privacyPolicy" exact component={PrivacyPolicy} />
            <Route path="/evaluation" exact component={Evaluation} />
          </Wrapper>
          <Footer></Footer>
        </Suspense>
      </ConnectedRouter>
    </React.Fragment>
  );
}

//Footer 고정
const Wrapper = styled.div`
  height: auto;
  min-height: 90vh;
`;

export default App;
