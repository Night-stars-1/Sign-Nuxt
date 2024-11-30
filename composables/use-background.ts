/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-19 19:44:39
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-21 22:31:44
 */
export default function (src?: string) {
    const state = useState("background", () => "https://t.alcy.cc/ycy");
    if (src) state.value = src;
    return state;
}
