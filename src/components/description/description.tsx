import styles from './description.module.css'

interface DescriptionProps {
  description: string
}

export const Description = (props: DescriptionProps) => {
  return (
    <div className={styles.container}>
      <h2>Description</h2>
      <p className={styles.description}>
        {props.description}
      </p>
    </div>
  )
}