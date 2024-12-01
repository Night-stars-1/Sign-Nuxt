/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-12-01 23:54:06
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-12-02 00:07:17
 */
declare type Theme = "light" | "dark";

export default function () {
  const osTheme = useOsTheme();
  const theme = useState<Theme>("theme", () => "dark");
  watch(osTheme, (value) => {
    theme.value = value ?? "light";
  });
  return theme;
}
