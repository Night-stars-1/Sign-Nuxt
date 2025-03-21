<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-12-01 01:33:47
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-29 00:09:48
-->
<script setup lang="ts">
const emit = defineEmits(["close"]);
import { NInfiniteScroll } from "naive-ui";
import dayjs from "dayjs";

interface AccountData {
  name: string;
  account_id: string;
}
interface GoodsGame {
  name: string;
  key: string;
}
interface Goods {
  goods_id: string;
  goods_name: string;
  icon: string;
  price: number;
  start: string;
  next_time: number;
  next_num: number;
  total: number;
  /* 1 需要收获地址 2 是游戏道具 */
  type: number;
  /* not_in_sell online */
  status: string;
  game_biz: string;
}
interface GoodsData {
  games: GoodsGame[];
  list: Goods[] | null;
  total: number;
}

interface AddressData {
  id: string;
  connect_name: string;
  connect_mobile: string;
  province_name: string;
  city_name: string;
  county_name: string;
  addr_ext: string;
}

interface UserGameData {
  game_uid: string;
  game_biz: string;
  nickname: string;
  region: string;
  region_name: string;
}

const message = useMessage();
const accountData = ref<AccountData[]>([]);
var goods: Goods;
const goodsData = ref<GoodsData>();
const addressData = ref<AddressData[]>([]);
const userGameData = ref<UserGameData[]>([]);
const potion = ref(0);
const step = ref<string>("loading"); // 账号选择->奖品选择->1.地址选择/2.游戏账号选择 特殊状态 loading
var goodsPage = 1;
var accountId = "0";
const timestamp = Math.floor(Date.now() / 1000);

const getAccountList = async () => {
  step.value = "loading";
  const { data } = await useHttp.get<AccountData[]>("mihoyo/list");
  accountData.value = data;
  step.value = "账号选择";
};
getAccountList();

const getGoodsList = async () => {
  if (
    goodsData.value &&
    goodsData.value.list &&
    goodsData.value.list.length >= goodsData.value.total
  ) {
    console.log("忽略");
    return;
  }
  const { data } = await useHttp.post<GoodsData>("goods/list", {
    account_id: accountId,
    game: "",
    page: goodsPage.toString(),
  });
  goodsPage += 1;
  console.log(data.list);
  if (goodsData.value) {
    if (data.list && goodsData.value.list) {
      goodsData.value.list = goodsData.value.list.concat(data.list);
    }
  } else {
    goodsData.value = data;
  }
  step.value = "奖品选择";
};

/** 去除已经开售的 */
const getGoods = () =>
  goodsData.value?.list?.filter(
    (item) =>
      (timestamp < item.next_time &&
        item.status == "online" &&
        item.total == 0) ||
      item.status == "not_in_sell"
  ) ?? [];

const getPotion = async () => {
  const { data } = await useHttp.get<number>(`mihoyo/potion/${accountId}`);
  potion.value = data;
};

const accountSelect = (account: AccountData) => {
  step.value = "loading";
  accountId = account.account_id;
  getGoodsList();
  getPotion();
};

const goodsSelect = async (_goods: Goods) => {
  if (_goods.price > potion.value) {
    message.warning("米游币不足");
    return;
  }
  goods = _goods;
  switch (_goods.type) {
    case 1:
      return addressSelect();
    case 2:
      return userGameSelect(_goods);
    default:
      message.success("未适配类型");
      emit("close");
      break;
  }
};

const addressSelect = async () => {
  step.value = "loading";
  const { data } = await useHttp.get<AddressData[]>("goods/address", {
    accountId,
  });
  addressData.value = data;
  step.value = "地址选择";
};

const userGameSelect = async (_goods: Goods) => {
  step.value = "loading";
  const { data } = await useHttp.get<UserGameData[]>("goods/userGame", {
    accountId,
    goodsId: _goods.goods_id,
  });
  userGameData.value = data;
  step.value = "游戏账号选择";
};

const addScheduled = async (
  addressId: string,
  gameBiz?: string,
  gameUid?: string,
  region?: string
) => {
  const { message: msg } = await useHttp.post<GoodsData>("goods/add", {
    account_id: accountId,
    goods_id: goods.goods_id,
    address_id: addressId,
    game_biz: gameBiz,
    game_uid: gameUid,
    region: region,
  });
  message.success(msg);
  emit("close");
};
const deleteGoods = async () => {
  const { message: msg } = await useHttp.post("goods/delete");
  message.success(msg);
  emit("close");
};
</script>

<template>
  <NSpin class="loading" v-if="step == 'loading'" />
  <div class="mihoyo-goods" v-if="step == '账号选择'">
    <NButton
      class="goods-btn"
      @click="accountSelect(account)"
      v-for="account in accountData"
    >
      {{ account.name }}
    </NButton>
    <NButton class="goods-delete-btn" @click="deleteGoods"> 删除任务 </NButton>
  </div>
  <div class="mihoyo-goods" v-if="step == '奖品选择' && goodsData">
    <div class=""></div>
    <NInfiniteScroll style="max-height: 100%" @load="getGoodsList">
      <NButton
        class="goods-btn goods1-btn"
        v-for="goods in getGoods()"
        @click="goodsSelect(goods)"
      >
        <div class="goods-btn-content">
          <div>商品: {{ goods.goods_name }}</div>
          <div>
            米游币: {{ goods.price }}/{{ potion }} 数量: {{ goods.next_num }}
          </div>
          <div v-if="goods.status == 'not_in_sell'">未开售</div>
          <div v-else>
            时间: {{ dayjs.unix(goods.next_time).format("YYYY-MM-DD HH:mm") }}
          </div>
        </div>
      </NButton>
    </NInfiniteScroll>
  </div>
  <div class="mihoyo-goods" v-if="step == '地址选择' && addressData">
    <NInfiniteScroll style="max-height: 100%">
      <NButton
        class="goods-btn goods1-btn"
        v-for="address in addressData"
        @click="addScheduled(address.id)"
      >
        <div class="goods-btn-content">
          <div>{{ address.connect_name }} {{ address.connect_mobile }}</div>
          <div>
            {{ address.province_name }} {{ address.city_name }}
            {{ address.county_name }} {{ address.addr_ext }}
          </div>
        </div>
      </NButton>
    </NInfiniteScroll>
  </div>
  <div class="mihoyo-goods" v-if="step == '游戏账号选择' && userGameData">
    <NInfiniteScroll style="max-height: 100%">
      <NButton
        class="goods-btn goods1-btn"
        v-for="userGame in userGameData"
        @click="
          addScheduled(
            '',
            userGame.game_biz,
            userGame.game_uid,
            userGame.region
          )
        "
      >
        <div class="goods-btn-content">
          <div>{{ userGame.nickname }} {{ userGame.region_name }}</div>
        </div>
      </NButton>
    </NInfiniteScroll>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  height: 100%;
}

.mihoyo-goods {
  .goods-btn,
  .goods-delete-btn {
    // box-shadow: var(--n-box-shadow);
    .goods-btn-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-block: 8px;
      width: 100%;
      white-space: normal; // 自动换行
    }

    &.goods1-btn {
      height: 100%;
    }

    & {
      width: 100%;
      margin-block: 4px;
    }
  }

  & {
    width: 100%;
    height: 296px;
    max-height: 296px;
  }
}
</style>
