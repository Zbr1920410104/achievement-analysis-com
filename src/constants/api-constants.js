import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * optuser
 ***************************/
export const USER_LOGIN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/login`;  // 登录
export const GET_USER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/getUserInfo`; // 获取用户信息
export const SET_USER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_USER}/setUserInfo`; // 获取用户信息

/**
 * optsystem
 ***************************/
export const GET_ADDRESS_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getAddressOption`;
export const GET_SCHOOL_OPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SYSTEM}/getSchoolOption`;

/**
 * optentry score
 ***************************/
export const GET_ENTRY_SCORE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ENTRY_SCORE}/getEntryScore`;

/**
 * optschool
 **************************/
export const GET_SCHOOL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SCHOOL}/getSchool`
// 获取上传Token
export const GetUploadToken = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_UPLOAD}/getuploadtoken`;
