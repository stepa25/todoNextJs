import { Iprops } from "@/types"
import Image from "next/image"
import styles from "./styles.module.scss"
import icon from "../../assets/trash.svg"
import classNames from "classnames"

export const Task: React.FC<Iprops> = ({text, onDelete,onToggle, completed}) => {
    return (
        <div onClick={onToggle} className={classNames(styles.item, {[styles.completed]: completed})}>
            <input className={styles.checkbox} type="checkbox" readOnly checked={completed}/>
            <p className={styles.text}>{text}</p>
            <button onClick={onDelete}><Image className={styles.delete} src={icon} alt="trash"/></button>
        </div>
    )
}

