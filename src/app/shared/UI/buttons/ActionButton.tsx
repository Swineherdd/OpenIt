import React from 'react'
import styles from './ActionButton.module.scss'

type Props = {
  children: string,
}

const ActionButton = ({children}: Props) => {
	return (
  <button  className={styles.actionButton} >
    {children}
  </button>
  )
}

export default ActionButton