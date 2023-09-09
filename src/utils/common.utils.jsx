// import NoImage from "Asset/.png";
import React from "react";
import { CURRENCY_SYMBOL } from "constants/common.constants";
import moment from "moment";
import { IconContext } from "react-icons";
import toast from 'react-hot-toast';
import ProfileImg from "Assets/profile_pic.jpg";
import LogoImg from "Assets/budiLogo.png";
import styled from "styled-components";
// import { imgBaseUrl } from "constants/config.constants";



export const Logo = ({style, src}) => <LogoIcon theme={style} src={src??LogoImg} alt="budi" />;

export const asyncWrapper = (promise) =>
  promise
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ data: null, error }));

export const isFunction = (fn) => typeof fn === "function";

export const isPublicApi = (url) => {
  const publicApiArray = ["/api/login/", "/api/register/"];
  return Boolean(publicApiArray.filter((e) => url?.includes(e))?.length);
};

export const IconProvider = ({ color, className, props, children }) => {
  return (
    <IconContext.Provider value={{ color: color ?? props?.className, className: ` ${className ?? props.className}` }}>
      {
        children
      }
    </IconContext.Provider>
  )
}
export const stringifyError = (errors) => {
  return errors;
};

export const getLocalStorage = (key, initialValue) => {
  const resource = localStorage.getItem(key);
  return resource ? JSON.parse(resource) : initialValue;
};
export const isMobile = () => {

  if (window) {
    if (window.matchMedia("(max-width: 700px)").matches) {
      return true;
    } else {
      return false;
    }
  }
}
export const TxtCopy = (textBoad) => {
  const node = document.getElementById(textBoad);
  navigator.clipboard.writeText(node.innerText).then((done) => {
    toast.success("Copied");
  }).catch((error) => {
    toast.error("Something gone wrong ");
  })
}


export const getProductNameByLang = (detail, language = "end") => {
  if (detail?.length > 0)
    return detail?.find((a) => a.language === language) ?? detail[0];
  return (
    detail?.find((a) => a.language === language) ?? {
      name: "",
      description: "",
    }
  );
};

export const numberFormatter = (number, isCurrency) => {
  const isCurrencyBoolean = isCurrency ? true : false;
  return `${isCurrencyBoolean ? CURRENCY_SYMBOL : ""} ${new Intl.NumberFormat(
    "en-IN",
    { maximumSignificantDigits: 3 }
  ).format(number)}`;
};

export const generateYears = () => {
  var max = new Date().getFullYear()
  const moonLanding = new Date('July 20, 20 00:20:18').getFullYear();
  const current = max - moonLanding;
  var min = max - current;
  var years = []
  for (var i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}

export const formatDate = (date, formate = "YYYY-MM-DD") => {
  return date ? moment(date).format(formate) : "-";
};
export const contactNumberFormatter = (phoneNumberString) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumberString;
}


export const weekFirstDateLastDate = () => {
  let wDate = new Date();
  let dDay = wDate.getDay() > 0 ? wDate.getDay() : 7;
  let first = wDate.getDate() - dDay + 1;
  let firstDateWeek = new Date(wDate.setDate(first));
  let lastDateWeek = new Date(wDate.setDate(firstDateWeek.getDate() + 6));
  return { firstDateWeek, lastDateWeek };
}

export const monthFirstDateLastDate = () => {
  var date = new Date();
  var monthFirstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var monthLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { monthFirstDate, monthLastDate };
}



export const preciseNum = (num, decimal) => {
  return parseInt(num)?.toFixed(decimal ?? 2);
}
export const toExponent = (num, decimalValue = 3, isCurrency = false) => {
  if (num < 50000) {
    return ` ${isCurrency ? '$' : ''} ${parseInt(numberFormatter(num))}`;
  } else {
    return ` ${isCurrency ? '$' : ''} ${parseInt(num)?.toExponential(decimalValue)}`;
  }
}

export const ImgProvider = (src) => {
  if (src) {
    return `${src}`;
  } else {
    return ProfileImg;
  }
}

export const phoneFormat = (input, prefix) => {
  if (!input || isNaN(input)) return ` must be number  ${input}`
  if (typeof (input) !== 'string') input = input.toString()
  if (input.length === 10) {
    if (prefix) {
      return `${prefix} ${input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`;
    } else {
      return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
  } else if (input.length < 10) {
    return 'must be 10 digit'
  } else if (input.length > 10) {
    return 'must be  10 digit number'
  } else {
    return 'something went wrong'
  }
}
export const redirectOut = (e) => {
  if (window) {
    window.open(e);
  }
}
export function isDebugging(debugging) {
  if (!debugging)
    try {
      if (typeof (window.console) != "undefined") {
        window.console = {};
        window.console.log = function () {
        };
        window.console.debug = function () {
        };
        window.console.info = function () {
        };
        window.console.warn = function () {
        };
        window.console.error = function () {
        };
      } else {

      }
    } catch (ex) {

    }
}

const LogoIcon = styled.img`
width: ${props=>props?.theme.width?? '140px'};
height:auto;
margin:auto;
&& @media only screen and (max-width:550px){
  width: ${props=>props?.theme.width?? '140px'};
}
`;