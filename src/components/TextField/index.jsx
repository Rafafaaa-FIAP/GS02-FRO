import './styles.scss';

function TextField(props) {
  return (
    <div className='text-field' style={{ width: props.width }}>
      <fieldset>
        <input
          required
          type={!!props.type ? props.type : 'text'}
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          style={{ width: props.width }}
          onChange={!!props.onChange ? props.onChange : (() => { })}
          className={!!props.className ? props.className : ''}
        />
        <legend>
          <span>{props.placeholder}</span>
        </legend>
        <label htmlFor={props.id} className='placeholder'>{props.placeholder}</label>
      </fieldset>
    </div>
  )
}

export default TextField