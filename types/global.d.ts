import { MessageApi } from "naive-ui"

export declare global {
  var $message: MessageApi
  interface Window {
    $message: MessageApi;  // 你可以根据需要修改类型
  }
}