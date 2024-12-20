import { UserGroup } from "~/types/user";

export default async function () {
  const { data } = await useHttp.get("user/info");
  userInfo.id = data.id;
  userInfo.group = data.group;
}

export const userInfo = reactive({
  id: -1,
  group: UserGroup.Normal,
});
