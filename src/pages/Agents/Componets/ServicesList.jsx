import React from 'react';
import styled from "styled-components";
import { Selector, PaginationContainer } from 'Component';
import { IconProvider } from 'utils/common.utils';
import { SocialShare } from 'utils/ObjectUtils';
import { Input, Skeleton, Pagination } from "antd";
import { BiSearch, BiFilterAlt } from "react-icons/bi";
import { FaTelegramPlane } from 'react-icons/fa';
import { Modal } from 'Component';
import { enLangauge } from 'Contents/en-langauge';
import { useFetch } from 'hooks';
import toast from 'react-hot-toast';
import { DateRange } from 'react-date-range';
import moment from 'moment/moment';
import { ImgProvider } from 'utils/common.utils';
import { useNavigate } from 'react-router-dom';

const ServicesList = () => {
  
  const navigate = useNavigate()
  const [state, SetState] = React.useState(false);
  const [haveToshare, SetShare] = React.useState(false);
  const [unapproval, SetUnapproval] = React.useState([]);
  const [currentPage , setCurrentPage] = React.useState(1)
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

  const onFailure = React.useCallback((errors) => {
    toast.error(errors?.message);
  }, [])

  const onSuccess = React.useCallback((response) => {
    if (response?.message) {
      toast.success(response?.message);
    }
  }, [])
  // bulk action 
  const { isLoading, data, callFetch } = useFetch({
    initialUrl: `/offers/`,
    skipOnStart: false,
    onSuccess,
    onFailure
  });


  const bulkAction = React.useCallback((e) => {
    if (e) {
      if (unapproval?.some((i) => i === e)) {
        let undo = unapproval.filter((i) => i !== e)
        SetUnapproval(undo)
      } else {
        SetUnapproval(data => [...data, e]);
      }
    }
  }, [unapproval])

  const indiviualAction = React.useCallback((e) => {
    const formData = new FormData();
    if (e === `Approved`) {
      Array(1).fill().map(() => {
        formData.append("agent_id", e);
        return e;
      });
      callFetch({
        url: `/agents/approve_agent`,
        method: 'post',
        data: formData,
      })
      setTimeout(() => {
        callFetch({
          url: `/agents/unapproved_agents`,
          method: 'get',
        });
      }, [900])
      SetUnapproval([])
    }

  }, [callFetch])

  const allListActionCheck = React.useCallback((array) => {
    if (!isLoading) {
      if (array?.length === unapproval?.length) {
        SetUnapproval([])
      } else {
        SetUnapproval([])
        array?.map((agent, index) => SetUnapproval(data => [...data, agent?.id]))
      }
    }
  }, [unapproval, isLoading])



  const selectionFilterTwo = React.useCallback((e) => {
    const formData = new FormData()
    if (unapproval?.length > 0) {
      if (e === `Approved`) {
        unapproval?.map((data) => {
          formData.append("agent_id", data);
          return data;
        })
        callFetch({
          url: `/agents/approve_agent`,
          method: 'post',
          data: formData,
        })
        setTimeout(() => {
          callFetch({
            url: `/agents/unapproved_agents`,
            method: 'get',
          });
        }, [900])
        SetUnapproval([])
      }
    } else {
      toast.error('Have not selected any Item');
    }
  }, [callFetch, unapproval])

  React.useEffect(() => {
    Object.keys(filter_query).forEach((key) => (filter_query[key] === undefined
      || filter_query[key] === null
      || filter_query[key] === "")
      && delete filter_query[key]
    )
    let str = Object.keys(filter_query).map(function (key) {
      return key + '=' + filter_query[key]
    }).join('&')
    if (str) {
      callFetch({
        url: `/agents/unapproved_agents?page=${1}&${str}`,
        method: 'get'
      })
    }
  }, [filter_query , callFetch])

  const updateDate = React.useCallback((item) => {
    setState([item.selection])
    Setfilter_query({
      ...filter_query, from: moment(item.selection?.startDate).format(dateFormat),
      to: moment(item.selection?.endDate).format(dateFormat)
    })

  }, [filter_query])


  const paginationAction = React.useCallback((page, b) => {
    if (!isLoading) {
      setCurrentPage(page)
      Object.keys(filter_query).forEach(
        (key) =>
          (filter_query[key] === undefined ||
            filter_query[key] === null ||
            filter_query[key] === "") &&
          delete filter_query[key]
      );
      const str = Object.keys(filter_query).map(function (key) {
        return key + '=' + filter_query[key];
      }).join('&');
      callFetch({
        url: `/agents/unapproved_agents?page=${page}&${str}`,
        method: 'get'
      })
    }
  }, [callFetch , filter_query , isLoading])
  React.useLayoutEffect(() => {
    if (isLoading) {
      SetState(false)
    }
  }, [isLoading])

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
        <div className="grid lg:px-4  md:px-2 px-1 lg:grid-cols-6 md:grid-cols-3 grid-cols-1 mb-[15px]">
          <div className="lg:col-span-2">
            Items {data?.offers?.data?.length}
          </div>
          <div className="lg:col-span-4  md:col-span-2 ">
            <div style={{display:"none"}} className='grid lg:grid-cols-6 md:grid-cols-9 grid-cols-2'>
              <div className='lg:col-span-2 md:col-span-2 col-span-1 px-1 lg:py-0 md:py-0 py-1 '>
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
                  } options={["Active", "InActive", "ALL"]} />
                </CustomeText>
              </div>
              <div className="px-x lg:py-0 md:py-0 py-1 " onClick={() => SetState(!state)}>
                <Button icon={<BiFilterAlt />} IconClassName={'text-[20px] pt-1 mr-1'} color={""}>{enLangauge.USERS_TABLE_FILTER}</Button>
              </div>
              <div className="px-1 lg:py-0 md:py-0 py-1 " onClick={() => SetShare(!haveToshare)}>
                <Button icon={<FaTelegramPlane />} IconClassName={'text-[20px] pt-1 mr-1'} color={""}>{enLangauge.USERS_TABLE_SHARE} </Button>
              </div>
              <div className="px-1 lg:py-0 md:py-0 py-1 ">
                <CustomeText>
                  <Select onChange={selectionFilterTwo} size={"defaut"} theme={{ width: "100%" }} defaultOption={"Bulk Action"} options={["Approved"]} />
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
          {
            isLoading ? (
              <React.Fragment>
                <Skeleton active />
                <br />
                <Skeleton active />
              </React.Fragment>
            ) : (
              <div className="lg:overflow-x-hidden md:overflow-x-hidden overflow-x-scroll ">
                <table className="min-w-full leading-normal">
                  <thead >
                    <tr className='border-b-2 border-t-2 border-[#ccccd0]'>
                      <th className="px-5 flex py-3   bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        <span className="mx-2  ">
                          <input type="checkbox" className="checkbox" onClick={() => allListActionCheck(data?.unapproved_agents?.data)} />
                        </span>
                        <span className='mt-1'>
                        Product Name
                        </span>
                      </th>
                      <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Discount
                      </th>
                      <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Order Total
                      </th>
                      <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                       Action
                      </th>
                      <th className="px-5 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                       Status
                      </th>
                      <th className="px-5 py-3  bg-gray-100" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.offers?.data?.map((agent, index, array) => (
                        <tr className='' key={index}>
                          <td className="px-5 py-3   bg-white text-sm">
                            <div className="flex">
                              <div className="mx-2 pt-2 ">
                                {
                                  array?.length === unapproval?.length ? (
                                    <input type="checkbox" className="checkbox" checked />
                                  ) : (
                                    <input type="checkbox" className="checkbox" onClick={() => bulkAction(agent?.id)} />
                                  )
                                }
                              </div>
                              <div className="flex-shrink-0 w-10 h-10">
                                <img className="w-full h-full rounded-full"
                                 src={ImgProvider(agent?.profile?.profile_picture)} alt="loading..." />
                              </div>
                              <div className="ml-3 cursor-pointer " onClick={()=>navigate(`/offer-detail/${agent?.id}`)}>
                                <p className="text-gray-900 whitespace-no-wrap mt-2">
                                  <CustomeText>{agent?.title}</CustomeText>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3  bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              <CustomeText>{`$ ${agent?.price}`}</CustomeText></p>
                          </td>
                          <td className="px-5 py-3  bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              <CustomeText>--</CustomeText></p>
                          </td>
                          <td className="px-5 py-3 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                              <span className="relative"><CustomeText>--</CustomeText></span>
                            </span>
                          </td>
                          <td className="px-5 py-3  bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                              <span className="relative">
                                <CustomeText>
                                  <Select size={"small"}  onChange={indiviualAction} defaultOption={"Pending"} options={[]} />
                                </CustomeText>
                              </span>
                            </span>
                          </td>
                          <td className="px-5 py-3  bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                              <span className="relative"><Status>{enLangauge.AGENT_DETAIL_TABLE_STATUS_ACTIVE}</Status></span>
                            </span>
                          </td>
                        </tr>

                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          }
          <div className="pt-2 lg:px-3 md:px-2 px-0">
            <PaginationContainer labelText={"Total : "
              + "" + data?.offers?.total + " of Page " + data?.offers?.current_page
            }>
              <Pagination showSizeChanger={false}
                defaultCurrent={1}
                defaultPageSize={10}
                current={currentPage}
                total={data?.offers?.total}
                onChange={paginationAction} />
            </PaginationContainer>
          </div>
        </BoxCantainer>
      </div>
    </React.Fragment>
  );
}

export default ServicesList;

const BoxCantainer = styled.div`
background: #FFFFFF;
box-shadow: 0px 2px 5px rgba(38, 51, 77, 0.03);
border-radius: 10px;
padding:15px 15px 15px 15px;
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
width: 56px;
background: ${props => props?.theme?.bg ?? '#FFF2E2'};
color:black;
border-radius: 8px;
padding:2px 5px;
`;
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

