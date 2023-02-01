import React, {useState} from 'react';
import styles from './BlockInput.module.sass';

export const BlockInput = ({saveChange, value, setValue}) => {
    const [active, setActive] = useState();

    return (
        <div className={styles.block}>
            <input style={{display: active ? 'none' : 'block'}} type="text" value={value} onChange={(e) => {
                setValue(e.target.value)
            }}/>
            <div onClick={()=>{ // @ts-ignore
                setActive(e => !e);saveChange()}} style={{display: active ? 'none' : 'block'}}
                 className={active ? '' : styles.icon}>ok
            </div>
            <h3 style={{display: active ? 'block' : 'none'}}>{value}</h3>
            <div onClick={() => {
                // @ts-ignore
                setActive(e => !e)
            }} style={{display: active ? 'block' : 'none'}} className={active ? styles.icon : ''}>repair
            </div>
        </div>
    )
}