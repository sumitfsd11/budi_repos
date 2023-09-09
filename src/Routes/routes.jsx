import React from "react";
import { Wrapper } from "Component";
import Login from "pages/Login/Login";
import Dashboard from "pages/Dashboard/Dashboard";
import Profile from "pages/Profile/Profile";
import Revenue from "pages/Revenue/Revenue";
import Agents from "pages/Agents/Agents";
import AgentDetails from "pages/Agents/AgentDetails";
import Users from "pages/User/Users";
import ServiceDetail from "pages/Agents/Componets/ServiceDetail";
import UserDetails from "pages/User/UserDetails";
import ForgetPassword from "pages/ForgetPassword/ForgetPassword";
import VerifyOtp from "pages/ForgetPassword/VerifyOtp";
import TicketList from "pages/Supports/components/TicketsList";
import TicketDetail from "pages/Supports/TicketDetail";
import TermsCondition from "pages/TermConditions/TermsCondition";
import Policy from "pages/Policy/policy";

const PublicRouteList = [
  {
    path: "/login",
    component: (<Wrapper>
      <Login />
    </Wrapper>)
  },
  {
    path: "/forget-password",
    component: (<Wrapper>
      <ForgetPassword />
    </Wrapper>)
  },
  {
    path: "/otp-verifcation",
    component: (<Wrapper>
      <VerifyOtp />
    </Wrapper>)
  }
];

const PrivateRouteList = [
  {
    path: "/",
    component: (<Wrapper>
      <Dashboard />
    </Wrapper>)
  }, {
    path: '/dashboard-revenue',
    component: (<Wrapper>
      <Revenue />
    </Wrapper>)
  }
  ,
  {
    path: '/profile',
    component: (<Wrapper>
      <Profile />
    </Wrapper>)
  }
  ,
  {
    path: '/agents',
    component: (<Wrapper>
      <Agents />
    </Wrapper>)
  },
  {
    path: '/offer-detail/:id',
    component: (<Wrapper>
      <  ServiceDetail />
    </Wrapper>)
  },
  {
    path: '/agent/:id',
    component: (<Wrapper>
      <AgentDetails />
    </Wrapper>)
  }
  ,
  {
    path: '/users',
    component: (<Wrapper>
      <Users />
    </Wrapper>)
  },
  {
    path: '/user/:id',
    component: (<Wrapper>
      <UserDetails />
    </Wrapper>)
  },
  {
    path: '/support',
    component: (<Wrapper>
      <TicketList />
    </Wrapper>)
  },
  {
    path: '/ticket-detail/:id',
    component: (<Wrapper>
      <TicketDetail />
    </Wrapper>)
  },
  {
    path: '/term-condition',
    component: (<Wrapper>
      <TermsCondition />
    </Wrapper>)
  },
  {
    path: '/privacy',
    component: (<Wrapper>
      <Policy />
    </Wrapper>)
  }
];


export { PublicRouteList, PrivateRouteList };