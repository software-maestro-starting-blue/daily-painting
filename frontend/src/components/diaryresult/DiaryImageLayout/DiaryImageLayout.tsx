import { MouseEventHandler } from "react";
import "./DiaryImageLayout.css";

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
                    aspectRatio: 512 / 512,
                    objectFit: "cover"
                }}
                width={512} height={512}
                className="diaryimage"
            />
            <button className="diaryimagedownloadbutton" onClick={onImageDownloadClick}>
                Download
            </button>
        </div>
    );
}

export default DiaryImageLayout;