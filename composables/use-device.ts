import { DeviceType } from "~/types/device";

const WIDTH = 600;
const device = ref(DeviceType.Desktop);

export default function () {
    // 判断是否是移动设备
    const _isMobile = () => {
        const rect = document.body.getBoundingClientRect();
        return rect.width - 1 < WIDTH;
    };

    // 处理窗口大小变化
    const _resizeHandler = () => {
        if (!document.hidden) {
            const isMobile = _isMobile();
            device.value = isMobile ? DeviceType.Mobile : DeviceType.Desktop;
        }
    };

    onBeforeMount(() => {
        window.addEventListener("resize", _resizeHandler);
    });

    onMounted(() => {
        if (_isMobile()) {
            device.value = DeviceType.Mobile;
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener("resize", _resizeHandler);
    });

    return device;
}
