import React, {FC} from "react";
import axios from "axios";

export const UploadOrViewImageChildren: FC<{ id: string, src: string }> = ({id, src}) => {
    return (
        <div>
            {
                src != 'null'
                    ? <img
                        width={'300px'}
                        height={'300px'}
                        src={`http://localhost:6789/uploads/${src}`}
                        alt="titleImg"/> :
                    <img src="#" alt="image"/>
            }
        </div>
    )
}
