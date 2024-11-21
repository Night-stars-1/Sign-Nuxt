/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-11-19 19:44:39
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-11-19 19:45:02
 */
export default function (src?: string) {
    const state = useState("background", () => "https://www.loliapi.com/acg/");
    if (src) state.value = src;
    return state;
}
