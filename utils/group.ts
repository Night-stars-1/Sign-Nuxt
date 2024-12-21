/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-12-21 16:42:52
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-21 17:29:04
 */
import { UserGroup } from "~/types/user";

const group2Name = new Map([
  [UserGroup.Normal, "普通用户"],
  [UserGroup.Admin, "管理员"],
  [UserGroup.Goods1, "商品兑换用户1"],
  [-1, "未知"],
]);

function getGroupName(group: UserGroup) {
  return group2Name.get(group) || "未知";
}

export {
  getGroupName,
  group2Name,
}