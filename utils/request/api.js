import { mGet, mPost } from "./xhr";
 
// 获取用户openId
export const getWxUserDetail = (params) => mGet("/backend/wx/user", params);

// 用户登录
export const login = (params) => mPost("/backend/login/wx",params);

// 查询指定月份的账单（按天）
export const getBillByDay = (params) => mGet("/backend/api/financial/bill/billByDay", params);

// 查询账单明细
export const getBillDetail = (params) => mGet("/backend/api/financial/bill/billDetail", params);

// 统计指定月份的总收入和支出
export const totalBalance = (params) => mGet("/backend/api/financial/bill/totalBalance", params);

// 统计指定月份中各摘要的收支情况
export const totalBillByAmount = (params) => mGet("/backend/api/financial/bill/totalBillByAmount", params);

// 查询指定月份中支出（flag=-1）或收入（flag=1）的排行
export const getBillBalanceRank = (params) => mGet("/backend/api/financial/bill/billBalanceRank", params);

// 查询指定月份中，某一摘要类型的收支数据
export const getBillByAmount = (params) => mGet("/backend/api/financial/bill/billByAmount", params);