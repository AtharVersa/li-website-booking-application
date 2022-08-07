import React from 'react'

const styles = {
    color: '#F00',
    fontSize: '12px'
}

export default function Input ({ label, type, register, placeholder, name, error, required }) {
    return (
        <>
        {label && <label htmlFor="input-field" className="font-weight-bold text-primary">{label}</label>}
            <input type={type} className={'form-control' + (!error ?  '' :' is-invalid')}
                placeholder={placeholder}
                name={name}
                {...register(name, required )}
                />
            {error && <span style={styles}>{error}</span>}
        </>
    )
}
