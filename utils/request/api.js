import { mPost } from "./xhr";
 
const getArticleList = (params) => mPost("app/mock/262524/get/article/list", params);
 
export { getArticleList };