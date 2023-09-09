import React from 'react';
import styled from "styled-components";
import { CheckBox, Selector } from 'Component';
import { IconProvider } from 'utils/common.utils';
import { SocialShare } from 'utils/ObjectUtils';
import { Input, Skeleton } from "antd";
import { BiSearch, BiFilterAlt } from "react-icons/bi";
import { FaTelegramPlane } from 'react-icons/fa';
import { Modal } from 'Component';
import { DatePicker } from 'antd';
import { enLangauge } from 'Contents/en-langauge';
import { useFetch } from 'hooks';
const { RangePicker } = DatePicker;
const Items = () => {
  const [state, SetState] = React.useState(false);
  const [haveToshare, SetShare] = React.useState(false);

  const { isLoading } = useFetch({
    initialUrl: `/`,
    skipOnStart: true,
    config: {
      method: 'get'
    }
  })

  const Button = React.memo(({ IconClassName, color, icon, children }) => (
    <button className="bg-white w-full text-center hover:bg-gray-100 flex text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">
      <span>
        <IconProvider className={IconClassName ?? ''} color={color}>
          {icon}
        </IconProvider>
      </span>
      <span>
        {
          children
        }
      </span>
    </button>
  ))


  const Filteration = React.memo(() => {
    return (
      <React.Fragment>
        <Modal title={"Filter By Date "} state={state} SetState={SetState}>
          <div className="grid w-full">
            <div className="m-auto">
              <RangePicker onChange={(e) => console.log(e, "===> DATE PCIKER ")} />
            </div>
          </div>
        </Modal>
        {/*  */}
        <Modal title={"Share "} state={haveToshare} SetState={SetShare}>
          <div className="grid w-full">
            <div className="m-auto">
              <div className='grid lg:grid-col-4 md:grid-cols-3 grid-cols-2 gap-2'>
                {
                  SocialShare?.map((i, index) => (
                    <div key={index}>
                      <ShareButton theme={{ bg: i?.bg, color: i?.color }} >
                        <div className="inline-flex">
                          <IconProvider className={i?.className ?? ''} color={i?.color}>
                            {i?.icon}
                          </IconProvider>
                          <span>{i?.title}</span>
                        </div>
                      </ShareButton>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </Modal >
        <div className="grid lg:px-4  md:px-2 px-1 lg:grid-cols-5 md:grid-cols-3 grid-cols-1 mb-[15px]">
          <div className="lg:col-span-2 pt-1">
            <TableHeader>{enLangauge.USER_DETAIL_TABEL_TITLE}</TableHeader>
          </div>
          <div className="lg:col-span-3  md:col-span-2 ">
            <div className='grid lg:grid-cols-6 md:grid-cols-9 grid-cols-2'>
              <div className='lg:col-span-2 px-1 '>
                <Input style={{ width: "100% ", boxShadow: "none" }} placeholder="Search..." prefix={<BiSearch />} />
              </div>
              <div className="px-1  ">
                <CustomeText>
                  <Select size={"defaut"} theme={{ width: "100%" }} defaultOption={"Filter"} options={["Pending", "Approved", "InActive"]} />
                </CustomeText>
              </div>
              <div className="px- " onClick={() => SetState(!state)}>
                <Button icon={<BiFilterAlt />} IconClassName={'text-[20px] pt-1 mr-1'} color={""}>Filter</Button>
              </div>
              <div className="px-1 " onClick={() => SetShare(!haveToshare)}>
                <Button icon={<FaTelegramPlane />} IconClassName={'text-[20px] pt-1 mr-1'} color={""}>Share </Button>
              </div>
              <div className="px-1  ">
                <CustomeText>
                  <Select size={"defaut"} theme={{ width: "100%" }} defaultOption={"Pending"} options={["Pending", "Approved", "InActive"]} />
                </CustomeText>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment >
    )
  }, [])

  return (
    <React.Fragment>
      <div className=" mt-3">
        <BoxCantainer>
          <Filteration />
          <div className="lg:overflow-x-hidden md:overflow-x-hidden overflow-x-scroll ">
            <table className="min-w-full leading-normal">
              <thead >
                <tr className='border-b border-t border-[#ccccd0]'>
                  <th className="px-5 flex py-3   bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <span className="mx-2  ">
                      <CheckBox />
                    </span>
                    <span className='mt-1'>
                      {enLangauge.USER_DETAIL_TABEL_HEADER_ORDER_DATE}
                    </span>
                  </th>
                  <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {enLangauge.USER_DETAIL_TABEL_HEADER_ORDER_TYPE}
                  </th>
                  <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {enLangauge.USER_DETAIL_TABEL_HEADER_TRACKING_ID}
                  </th>
                  <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {enLangauge.USER_DETAIL_TABEL_HEADER_ORDER_TOTAL}
                  </th>
                  <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {enLangauge.USER_DETAIL_TABEL_HEADER_ACTION}
                  </th>
                  <th className="px-5 py-3  bg-gray-100" />
                </tr>
              </thead>
              <tbody>
                {
                  isLoading ? (<Skeleton active />) :
                    Array(5).fill().map((_, index) => (
                      <tr className=''>
                        <td className="px-5 py-3   bg-white text-sm">
                          <div className="flex">
                            <div className="mx-2 pt-2 ">
                              <CheckBox />
                            </div>

                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap mt-2">
                                <CustomeText>Molly Sanders</CustomeText>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3  bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap"><CustomeText>$20,000</CustomeText></p>
                        </td>
                        <td className="px-5 py-3  bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap"><CustomeText>$10,000</CustomeText></p>
                        </td>
                        <td className="px-5 py-3 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                            <span className="relative"><CustomeText>98</CustomeText></span>
                          </span>
                        </td>
                        <td className="px-5 py-3  bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                            <span className="relative">
                              <CustomeText>
                                <Select size={"small"} defaultOption={"Pending"} options={["Pending", "Approved", "InActive"]} />
                              </CustomeText>
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </BoxCantainer>
      </div>
    </React.Fragment>
  );
}

export default Items;

const BoxCantainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:15px 15px 15px 15px;
&& @media only screen and (max-width:760px){
  overflow-x:scroll; 
 }
`;

const CustomeText = styled.div`
// font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
color: #6E7079;
`;

// const Status = styled.button`
// width: 56px;
// background: ${props => props?.theme?.bg ?? '#FFF2E2'};
// color:black;
// border-radius: 8px;
// padding:2px 5px;
// `;
const Select = styled(Selector)`
width: ${props => props?.theme.width ?? '80px !important'};
&& :hover {
  box-shadow:none !important;
}import { IconProvider } from 'utils/common.utils';

`;

const ShareButton = styled.button`
padding:3px 10px;
background:${props => props?.theme.bg};
color:${props => props?.theme?.color};
border-radius:3px;
width:100%;
`;


const TableHeader = styled.div`
font-family: 'Open Sans';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 22px;
color: #45464E;

`;