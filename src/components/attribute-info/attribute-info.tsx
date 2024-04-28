import styles from './attribute.module.css'

interface AttributeProps {
  attributes: { [key: string]: string }
}

export const Attributes = (props: AttributeProps) => {
  return (
    <div className={styles.container}>
      <h2>Traits</h2>
      <div className={styles.attributes}>
        {Object.keys(props.attributes).map((key) => (
          <div key={key} className={styles.attribute}>
            <p className={styles.attributeKey}>{key}</p>
            <p className={styles.attributeValue}>
              {/* @ts-ignore */}
              {props.attributes[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}