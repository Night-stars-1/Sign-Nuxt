/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-18 21:04:26
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-05 20:12:22
 */
interface ResponseModel<T = any> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}