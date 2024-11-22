/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-18 21:04:26
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-22 15:01:18
 */
interface ResponseModel<T> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}