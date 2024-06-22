import { MouseEventHandler } from "react";
import "./DiaryImageLayout.css";

// TODO: 추후에는 상수로 분리하여 관리할 수 있도록 수정
const ImageWidth = 512;
const ImageHeight = 512;


export interface DiaryImageLayoutProps {
    imageUrl: string,
    onImageDownloadClick: MouseEventHandler<HTMLButtonElement>
}

const DiaryImageLayout = (props: DiaryImageLayoutProps) => {
    const {imageUrl, onImageDownloadClick, ...rest} = props;
    
    return (
        <div className="DiaryImageLayout">
            <img
                src={imageUrl}
                style={{
                    aspectRatio: ImageWidth / ImageHeight,
                    objectFit: "cover"
                }}
                width={ImageWidth} height={ImageHeight}
                className="diaryimage"
            />
            <button className="diaryimagedownloadbutton" onClick={onImageDownloadClick}>
                Download
            </button>
        </div>
    );
}

export default DiaryImageLayout;