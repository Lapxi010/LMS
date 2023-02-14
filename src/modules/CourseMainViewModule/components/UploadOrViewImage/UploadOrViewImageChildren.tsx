import React, {FC} from "react";
import Stub from './Stub.png';

export const UploadOrViewImageChildren: FC<{ id: string, src: string }> = ({id, src}) => {
    return (
        <div>
            {
                src != null
                    ? <img
                        width={'300px'}
                        height={'300px'}
                        src={`http://localhost:6789/uploads/${src}`}
                        alt="titleImg"/> :
                    <img width={'300px'}
                         height={'300px'}
                         src={Stub} alt="image"/>
            }
        </div>
    )
}
