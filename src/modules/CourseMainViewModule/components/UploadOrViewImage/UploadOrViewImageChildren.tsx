import React, {FC} from "react";
import Stub from './Stub.png';
import Api from '@api/index';
export const UploadOrViewImageChildren: FC<{ id: string, src: string }> = ({id, src}) => {
    return (
        <div>
            {
                src != null
                    ? <img
                        width={'300px'}
                        height={'300px'}
                        src={`${Api.defaults.baseURL}uploads/${src}`}
                        alt="titleImg"/> :
                    <img width={'300px'}
                         height={'300px'}
                         src={Stub} alt="image"/>
            }
        </div>
    )
}
