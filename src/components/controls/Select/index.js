import React from 'react'

const styles = {
  color: '#F00',
  fontSize: '12px'
}

export default function Select ({ label, name, error, register, required, data }) {
  // console.log(error)
  return (
    <>
        <select
            className={'custom-select custom-select-sm' + (!error ?  '' :' is-invalid')}
            {...register(name, required)}>
              <option value="">{`-- Select ${label} --`}</option>
              {data.map((item, i) => <option value={item.name} key={i}>{item.value === undefined ? item.name : item.value }</option>)}
          </select>
        {error && <span style={styles}>{error}</span>}
    </>
  )
}
