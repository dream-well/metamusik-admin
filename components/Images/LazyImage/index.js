import { useEffect, useState } from "react";

export default function LazyImage({ src, className, width, height, placeholder }) {
    const [imageSrc, setImageSrc] = useState(placeholder);
    useEffect(() => {
        if(src)
            setImageSrc(src);
        else   
            setImageSrc(placeholder);
    }, [src]);
    return (
        <img className={className} width={width} height={height} src={imageSrc} onError={() => setImageSrc(placeholder)}/>
    )
}
