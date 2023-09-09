import React from 'react';
import styled from "styled-components";
import { Selector } from 'Component';
import { IconProvider } from 'utils/common.utils';
import { SocialShare } from 'utils/ObjectUtils';
import { Input, Skeleton } from "antd";
import { BiSearch, BiFilterAlt } from "react-icons/bi";
import { Modal, PaginationContainer } from 'Component';
import { enLangauge } from 'Contents/en-langauge'
import { useFetch } from "hooks";
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { DateRange } from 'react-date-range';
import { FaTelegramPlane } from 'react-icons/fa';

const TicketList = () => {
  const navigate = useNavigate()
  const [state, SetState] = React.useState(false);
  const [haveToshare, SetShare] = React.useState(false);
  const dateFormat = 'DD/MM/YYYY';
  const [dateState, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [filter_query, Setfilter_query] = React.useState({
    search: null,
    from: null,
    to: null,
    user_role: null
  })

  const { isLoading, data, callFetch } = useFetch({
    initialUrl: "/support/support_tickets",
    skipOnStart: false,
    config: {
      method: "get"
    }
  });



  const updateDate = React.useCallback((item) => {
    setState([item.selection])
    Setfilter_query({
      ...filter_query, from: moment(item.selection?.startDate).format(dateFormat),
      to: moment(item.selection?.endDate).format(dateFormat)
    })
  }, [filter_query])

  const paginationAction = React.useCallback((page, b) => {
    callFetch({
      url: `/support/support_tickets?page=${page}`,
      method: 'get'
    })
  }, [callFetch])


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
              <DateRange
                editableDateInputs={true}
                onChange={updateDate}
                moveRangeOnFirstSelection={false}
                ranges={dateState}
              />
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
          <div className="lg:col-span-2">

          </div>
          <div className="lg:col-span-3  md:col-span-2 ">
            <div className='grid lg:grid-cols-6 md:grid-cols-9 grid-cols-2'>
              <div className='lg:col-span-3 md:col-span-2 col-span-1 px-1 lg:py-0 md:py-0 py-1 '>
                <Input onChange={(e) => Setfilter_query({
                  ...filter_query, search: e.target?.value
                })} value={filter_query?.search} autoFocus={true} style={{ width: "100% ", boxShadow: "none" }} placeholder="Search..." prefix={<BiSearch />} />
              </div>
              <div className="px-1 lg:py-0 md:py-0 py-1 ">
                <CustomeText>
                  <Select size={"defaut"} theme={{ width: "100%" }} defaultOption={filter_query?.user_role ? 'Active' : 'InActive' ?? "Filter"} onChange={(e) =>
                    e === "ALL" ? Setfilter_query({
                      search: null,
                      from: null,
                      to: null,
                      user_role: null
                    }) :
                      Setfilter_query({
                        ...filter_query, user_role: e === 'Active' ? true : false
                      })
                  } options={["Active", "InActive" ,"ALL"]} />
                </CustomeText>
              </div>
              <div className="px-x lg:py-0 md:py-0 py-1 " onClick={() => SetState(!state)}>
                <Button icon={<BiFilterAlt />} IconClassName={'text-[20px] pt-1 mr-1'} color={""}>{enLangauge.USERS_TABLE_FILTER}</Button>
              </div>
              <div className="px-1 lg:py-0 md:py-0 py-1 " onClick={() => SetShare(!haveToshare)}>
                <Button icon={<FaTelegramPlane />} IconClassName={'text-[20px] pt-1 mr-1'} color={""}>{enLangauge.USERS_TABLE_SHARE} </Button>
              </div>
              {/* <div className="px-1 lg:py-0 md:py-0 py-1 ">
                <CustomeText>
                  <Select onChange={selectionFilterTwo} size={"defaut"} theme={{ width: "100%" }} defaultOption={"Pending"} options={["Pending", "Approved", "InActive"]} />
                </CustomeText>
              </div> */}
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
          <React.Fragment>
            <Filteration />
            <div className="lg:overflow-x-hidden md:overflow-x-hidden overflow-x-scroll ">
              {
                isLoading ? (
                  <React.Fragment>
                    <Skeleton active />
                    <br />
                    <Skeleton active />
                  </React.Fragment>) : (
                  <React.Fragment>
                    <table className="min-w-full leading-normal">
                      <thead >
                        <tr className='border-b border-t border-[#ccccd0]'>
                          <th className="px-5 flex py-3   bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">

                            <span className='mt-1'>
                              {enLangauge.TICKET_TABLE_HEADER_NAME}
                            </span>
                          </th>
                          <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            {enLangauge.TICKET_TABLE_HEADER_DATE}
                          </th>
                          <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            {enLangauge.TICKET_TABLE_HEADER_MSG}
                          </th>
                      
                          <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            {enLangauge.TICKET_TABLE_HEADER_RESOLVE_AT}
                          </th>
                          <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            {enLangauge.TICKET_TABLE_HEADER_STATUS}
                          </th>
                          <th className="px-5 py-3  bg-gray-100" />
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data?.supports?.data?.map((data, index) => (
                            <tr className='' key={index.toString()}>
                              <td className="px-5 py-3   bg-white text-sm">
                                <div className="flex">
                                  <div className="ml-3">
                                    <span onClick={() => navigate(`/ticket-detail/${data?.id}`)} className="text-gray-900 whitespace-no-wrap mt-2 cursor-pointer" >
                                      <CustomeText>{data?.id}</CustomeText>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-3  bg-white text-sm">
                                <span className="text-gray-900 whitespace-no-wrap"><CustomeText>{
                                  moment(data?.created_at).format('MMMM Do YYYY, h:mm:ss a')
                                }</CustomeText></span>
                              </td>
                              <td className="px-5 py-3  bg-white text-sm w-[300px]">
                                <span className="text-gray-900 whitespace-no-wrap"><CustomeText>
                                  <div className=''>
                                    <span className=' px-3 mr-2 rounded-[15px] leading-[18px] text-sm italic capitalize bg-[#d4d5d6]'>
                                      topic
                                    </span>
                                    <span className=' text-[#000] font-semibold italic '>
                                      {
                                        data?.topic
                                      }
                                    </span>
                                  </div>
                                  <div className='mt-1'>
                                    <span className='  px-3 mr-2 rounded-[15px] leading-[18px] text-sm italic capitalize bg-[#d4d5d6]'>
                                      subject
                                    </span>
                                    <span className='italic font-semibold'>
                                      {
                                        data?.subject
                                      }
                                    </span>
                                  </div>
                                  {data?.message}
                                </CustomeText></span>
                              </td>
                              <td className="px-5 py-3 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                                  <span className="relative"><CustomeText>{moment(data?.update_at).format('MMMM Do YYYY, h:mm:ss a')}</CustomeText></span>
                                </span>
                              </td>
                              <td className="px-5 py-3  bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                                  <span className="relative">
                                    {
                                      !data?.resolved ? (<Status theme={{}}>Active</Status>) : (
                                        <Status theme={{ border: "1px solid #f72323", bg: '#d8acac', color: "#f72323" }}>Closed</Status>
                                      )
                                    }

                                  </span>
                                </span>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </React.Fragment>
                )
              }
            </div>
            <div className="pt-2 lg:px-3 md:px-2 px-0">
              <PaginationContainer labelText={"Total : "
                + "" + data?.supports?.total + " of Page " + data?.supports?.current_page
              }  >
                <Pagination showSizeChanger={false}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  total={data?.supports?.total} onChange={paginationAction} />
              </PaginationContainer>
            </div>
          </React.Fragment>
        </BoxCantainer>
      </div>
    </React.Fragment>
  );
}

export default TicketList;

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
const Status = styled.button`
background: ${props => props?.theme?.bg ?? 'rgba(22, 192, 152, 0.38)'};
width: 80px;
color:${props => props?.theme?.color ?? '#00B087'};
height: 27px;
border: ${props => props?.theme?.border ?? '1px solid #00B087'};
border-radius: 4px;
`;
const Select = styled(Selector)`
width: ${props => props?.theme.width ?? '80px !important'};
&& :hover {
  box-shadow:none !important;
}import { IconProvider } from 'utils/common.utils';
import { useFetch } from 'hooks';

`;

const ShareButton = styled.button`
padding:3px 10px;
background:${props => props?.theme.bg};
color:${props => props?.theme?.color};
border-radius:3px;
width:100%;
`;
