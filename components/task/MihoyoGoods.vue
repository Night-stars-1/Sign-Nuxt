<!--
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-12-01 01:33:47
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-01 17:17:58
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

const message = useMessage();
const accountData = ref<AccountData[]>([]);
var goods: Goods;
const goodsData = ref<GoodsData>();
const addressData = ref<AddressData[]>([]);
const step = ref<string>("loading"); // 账号选择->奖品选择->地址选择 特殊状态 loading
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
  )
    return;
  const { data } = await useHttp.post<GoodsData>("goods/list", {
    account_id: accountId,
    game: "",
    page: goodsPage.toString(),
  });
  if (data.list) {
    // 去除已经开售的
    data.list = data.list.filter(
      (item) =>
        timestamp < item.next_time && item.status == "online" && item.total == 0
    );
  }
  goodsPage += 1;
  if (goodsData.value) {
    if (data.list && goodsData.value.list) {
      goodsData.value.list = goodsData.value.list.concat(data.list);
    }
  } else {
    goodsData.value = data;
  }
  step.value = "奖品选择";
};
const accountSelect = (account: AccountData) => {
  step.value = "loading";
  accountId = account.account_id;
  getGoodsList();
};
const addressSelect = async (_goods: Goods) => {
  goods = _goods;
  if (_goods.type == 2) {
    addScheduled();
    return;
  }
  step.value = "loading";
  const { data } = await useHttp.get<AddressData[]>("goods/address", {
    actionId: accountId,
  });
  addressData.value = data;
  step.value = "地址选择";
};
const addScheduled = async (address_id?: string) => {
  const { message: msg } = await useHttp.post<GoodsData>("goods/add", {
    account_id: accountId,
    goods_id: goods.goods_id,
    address_id: address_id,
  });
  message.success(msg)
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
  </div>
  <div class="mihoyo-goods" v-if="step == '奖品选择' && goodsData">
    <NInfiniteScroll style="max-height: 100%" @load="getGoodsList">
      <NButton
        class="goods-btn goods1-btn"
        v-for="goods in goodsData.list"
        @click="addressSelect(goods)"
      >
        <div class="goods-btn-content">
          <div>商品: {{ goods.goods_name }}</div>
          <div>米游币: {{ goods.price }} 数量: {{ goods.next_num }}</div>
          <div>
            时间: {{ dayjs.unix(goods.next_time).format("YYYY-MM-DD HH:mm") }}
          </div>
        </div>
      </NButton>
    </NInfiniteScroll>
  </div>
  <div class="mihoyo-goods" v-if="step == '地址选择' && addressData">
    <NInfiniteScroll style="max-height: 100%" @load="getGoodsList">
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
</template>

<style lang="scss" scoped>
.loading {
  height: 100%;
}

.mihoyo-goods {
  .goods-btn {
    // box-shadow: var(--n-box-shadow);
    .goods-btn-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-block: 8px;
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
