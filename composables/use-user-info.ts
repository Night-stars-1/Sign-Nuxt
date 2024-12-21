/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-12-20 23:52:00
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-21 18:40:31
 */
import { UserGroup } from "~/types/user";

export async function getUserInfo() {
  const userInfo = useState("userInfo", () => ({
    id: -1,
    group: UserGroup.Normal,
  }));
  const { data } = await useHttp.get("user/info");
  userInfo.value.id = data.id;
  userInfo.value.group = data.group;
}

export default () =>
  useState("userInfo", () => ({
    id: -1,
    group: UserGroup.Normal,
  }));
