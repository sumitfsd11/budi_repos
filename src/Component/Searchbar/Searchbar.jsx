
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { AutoComplete, Input } from 'antd';

const SearchBar = () => {
  const navigate = useNavigate()
  const [ setValue] = React.useState('')
  const search_options = [
    {
      value: "Dashboard",
      label: 'Dashboard',
      link: '/'
    },
    {
      value: "Dashboard Revenue",
      label: 'Dashboard Revenue',
      link: '/dashboard-revenue'
    },
    {
      value: "Profile",
      label: 'Profile',
      link: '/profile'
    },
    {
      value: "Agents",
      label: "Agents",
      link: '/agents'
    },
    {
      value: "Unappoved Agesnts",
      label: "Unappoved Agesnts",
      link: '/agents'
    },
    {
      value: "Users",
      label: "Users",
      link: '/users'
    },
    {
      value: "Support",
      label: "Support",
      link: '/support'
    },
    {
      value: "Add Listing",
      label: "Add Staff",
      link: '/add-staff'
    },
    {
      value: "Notification Listing",
      label: " Add Notification",
      link: '/notification'
    },
    {
      value: "Support Ticket listing",
      label: "Support Ticket listing",
      link: '/supprot/ticket-list'
    },
    {
      value: "Document Term & condition ",
      label: "Document Term & condition ",
      link: '/term-condition'
    },
    {
      value: "Document Policy ",
      label: "Document Policy ",
      link: '/privacy'
    },
    {
      value: "Document Fqs ",
      label: "Document Fqs  ",
      link: '/document/fqs'
    },
    {
      value: "Feeback ",
      label: "Feeback    ",
      link: '/feedback'
    },

  ];

  let onSelect = React.useCallback((a, data) => {
    setValue(a)
    if (data) {
      navigate(data?.link)
    }
  }, [navigate ,setValue])

  return (
    <CustomeSpan
      style={{
        width: "100%",
        border: "none",

      }}
      className="pr-[5px]"
      size={"medium"}
      options={search_options}
      bordered={false}
      notFoundContent={"Not Found"}
      onSelect={onSelect}
      filterOption={(inputValue, option) =>
        option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      <Input.Search  bordered={false} style={{ border: "none", width: "100%" }} size="large" placeholder="Search ..." />
    </CustomeSpan>
  )
};

export default SearchBar;

const CustomeSpan = styled(AutoComplete)`
&& {
  padding-top:10px;
  font-size:16px;
  width:100% !important;
border : none !important;
  overflow:hidden !important;
  background:#F6FBFE ;
padding-top:0px !important ;
  padding-bottom:5px;
  height:38px !important;
  border-radius:20px;
  box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
  button{
    border:none !important;
    border-radius:30px;
  
  }

:hover{
//   border:none !important;
  ouline:none !important;
}
}
`;
