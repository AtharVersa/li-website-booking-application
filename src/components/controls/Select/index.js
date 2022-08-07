import React from 'react'

const styles = {
  color: '#F00',
  fontSize: '12px'
}

export default function Select ({ label, name, error, register, required, data, disable }) {
  // console.log(error)
  console.log(disable)
  return (
    <>
    {label && <label htmlFor="input-field" className="font-weight-bold text-primary">{label}</label>}
        <select
            className={'custom-select' + (!error ?  '' :' is-invalid')}
            {...register(name, required)}
            disabled={disable ? disable : false}
            >
              <option value="">{`-- Select ${label} --`}</option>
              {data.map((item, i) => <option value={item.name} key={i}>{item.value === undefined ? item.name : item.value }</option>)}
          </select>
        {error && <span style={styles}>{error}</span>}
    </>
  )
}
