import { injectGlobal } from "@emotion/css";

export default function createGlobalStyle() {
  injectGlobal`  
    
body {
  margin: 0; line-height: normal;
}
:root {

/* Figma Variables */

/* Spacing */
--Body-Font-Weight-Regular: 400;
--Body-Size-Medium: 16px;
--Heading-Font-Weight: 600;
--Heading-Size-Base: 24px;
--Subheading-Font-Weight: 400;
--Subheading-Size-Medium: 20px;
--Subtitle-Font-Weight: 400;
--Subtitle-Size-Base: 32px;
--Title-Page-Font-Weight: 700;
--Title-Page-Size-Base: 48px;

/* Font */
--Body-Font-Family: Inter;
--Heading-Font-Family: Inter;
--Subheading-Font-Family: Inter;
--Subtitle-Font-Family: Inter;
--Title-Page-Font-Family: Inter;

/* Common Style Variables */

/* Color */
--color-cadetblue: #4fbac8;
--color-slategray-100: rgba(113, 118, 128, 0.25);
--Gray-100: #f5f5f5;
--Gray-300: #d5d7da;
--Gray-500: #717680;
--Gray-700: #414651;
--White: #fff;

/* Gap */
--gap-1: 1px;
--gap-2: 2px;
--gap-3: 3px;
--gap-7: 7px;
--gap-8: 8px;
--gap-10: 10px;
--gap-12: 12px;
--gap-13: 13px;
--gap-15: 15px;
--gap-16: 16px;
--gap-17: 17px;
--gap-18: 18px;
--gap-19: 19px;
--gap-20: 20px;
--gap-21: 21px;
--gap-22: 22px;
--gap-27: 27px;
--gap-28: 28px;
--gap-31: 31px;
--gap-32: 32px;
--gap-36: 36px;
--gap-39: 39px;
--gap-60: 60px;
--gap-653: 653px;

/* Padding */
--padding-0: 0px;
--padding-01: 0;
--padding-1: 1px;
--padding-2: 2px;
--padding-3: 3px;
--padding-4: 4px;
--padding-5: 5px;
--padding-6: 6px;
--padding-7: 7px;
--padding-8: 8px;
--padding-9: 9px;
--padding-10: 10px;
--padding-11: 11px;
--padding-12: 12px;
--padding-13: 13px;
--padding-14: 14px;
--padding-15: 15px;
--padding-16: 16px;
--padding-17: 17px;
--padding-18: 18px;
--padding-19: 19px;
--padding-20: 20px;
--padding-21: 21px;
--padding-22: 22px;
--padding-23: 23px;
--padding-24: 24px;
--padding-25: 25px;
--padding-26: 26px;
--padding-32: 32px;
--padding-35: 35px;
--padding-38: 38px;
--padding-48: 48px;
--padding-50: 50px;
--padding-56: 56px;
--padding-64: 64px;
--padding-80: 80px;
--padding-170: 170px;
--padding-171: 171px;
--padding-256: 256px;
--padding-546: 546px;

/* BorderRadius */
--br-8: 8px;
--br-10: 10px;
--br-15: 15px;
--br-25: 25px;
--br-45: 45px;
--br-90: 90px;

/* FontSize */
--fs-16: 16px;
--fs-19: 19px;
--fs-20: 20px;
--fs-22: 22px;
--fs-24: 24px;
--fs-28: 28px;
--fs-29: 29px;
--fs-32: 32px;
--fs-38: 38px;
--fs-64: 64px;

/* Borders */
--border-1: 1px solid var(--Gray-300);
--border-2: 1px solid var(--color-cadetblue);

/* Shadows */
--shadow-drop: 0px 0px 30px rgba(0, 0, 0, 0.25);
--Shadow-xs: 0px 1px 2px rgba(10, 13, 18, 0.05);

/* Gradients */
--Background-events-2: linear-gradient(242.97deg, rgba(45, 206, 227, 0.05), rgba(36, 165, 182, 0.9));

/* WidthHeights */
--height-1: 1px;
--height-24: 24px;
--height-25: 25px;
--height-27: 27px;
--height-28: 28px;
--height-29: 29px;
--height-30: 30px;
--height-32: 32px;
--height-35: 35px;
--height-40: 40px;
--height-45: 45px;
--height-48: 48px;
--height-58: 58px;
--height-66: 66px;
--height-72: 72px;
--height-95: 95px;
--height-125: 125px;
--height-158: 158px;
--height-170: 170px;
--height-200: 200px;
--height-365: 365px;
--height-405: 405px;
--height-550: 550px;
--min-w-193: 193px;
--width-20: 20px;
--width-24: 24px;
--width-28: 28px;
--width-32: 32px;
--width-36: 36px;
--width-48: 48px;
--width-109: 109px;
--width-137: 137px;
--width-174: 174px;
--width-182: 182px;
--width-227: 227px;
--width-401: 401px;
--width-412: 412px;
--width-415: 415px;
--width-440: 440px;
--width-478: 478px;
--width-860: 860px;
--width-1279: 1279px;
--width-1280: 1280px;
--width-1338: 1338px;
--width-1340: 1340px;
--width-1440: 1440px;
--width-343_4: 343.4px;
--width-87_4: 87.4px;

/* LineHeights */
--lh-19: 19px;
--lh-20: 20px;
--lh-23: 23px;
--lh-24: 24px;
--lh-35: 35px;
--lh-46: 46px;
--lh-48: 48px;
--lh-normal: normal;

/* LetterSpacings */
--ls--0_02: -0.02;
--ls-normal: normal;

}
  
`;
}
