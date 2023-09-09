
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import React from 'react';
import styled from "styled-components"

export const AutoCompleteInput = () => {
  
  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: 'right',
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  });
  const options = [
    {
      label: renderTitle('Libraries'),
      options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
      label: renderTitle('Solutions'),
      options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
      label: renderTitle('Articles'),
      options: [renderItem('AntDesign design language', 100000)],
    },
  ];

  return (<CustomeSpan>
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{
        width: "100%",
        overflow:"hidden",
        border: "none",
        boxShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)"
      }}
      options={options}
    >
      <Input.Search bordered={false} size="large" style={{boxShadow:" 0px 2px 5px rgba(38, 51, 77, 0.03)" }} placeholder="Search" />
    </AutoComplete>
  </CustomeSpan>)
};

const CustomeSpan = styled.div`
&&{
  border-radius:30px;
  overflow:hidden !important;
  background:#F6FBFE ;
  height:38px !important;
  box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
  button{
    border:none !important;
    border-radius:30px;
  
  }
:hover{
  border:none !important;
  ouline:none !important;
  
}
}
`;
