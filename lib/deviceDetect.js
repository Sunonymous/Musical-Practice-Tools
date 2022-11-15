import { useEffect, useState } from "react";

export default function useDeviceDetect() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const navigatorDefined = typeof navigator !== undefined;
        const userAgent = navigatorDefined ? navigator.userAgent : '';
        const mobileDevicesRegex = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
        if (userAgent.match(mobileDevicesRegex)) setIsMobile(true);
    }, [])

    return isMobile;
}