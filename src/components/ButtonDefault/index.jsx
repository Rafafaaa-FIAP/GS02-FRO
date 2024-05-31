import './styles.scss'

function ButtonDefault(props) {
  return (
    <button
      className='button-default'
      onClick={!!props.onClick ? props.onClick : (() => { })}
    >
      {props.text}
    </button>
  )
}

export default ButtonDefault