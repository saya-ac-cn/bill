import { mGet, mPost,mPut } from "./xhr";
 
// 获取用户openId
export const getWxUserDetail = (params) => mGet("/backend/wx/user", params);

// 用户登录
export const login = (params) => mPost("/backend/login/wx",params);

// 查询所有的交易方式
export const getMethod = () => mGet("/backend/api/financial/transactionType", null);

// 查询所有的摘要
export const getAmount = () => mGet("/backend/api/financial/transactionAmount", null);

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

// 申报账单
export const saveTransaction = (params) => mPost("/backend/api/financial/insertTransaction", params);

// 修改财政记录父
export const editTransaction = (params) => mPut("/backend/api/financial/updateTransaction", params);

// 添加添加财政子记录
export const addTransactioninfo = (params) => mPost("/backend/api/financial/insertTransactioninfo", params);