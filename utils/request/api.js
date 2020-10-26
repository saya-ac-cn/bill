import { mGet, mPost } from "./xhr";
 
// 获取用户openId
export const getWxUserDetail = (params) => mGet("/backend/wx/user", params);

// 用户登录
export const login = (params) => mPost("/backend/login/wx",params);

// 查询指定月份的账单（按天）
export const getBillByDay = (params) => mGet("/backend/api/financial/bill/billByDay", params);