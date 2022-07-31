import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { Input, Select } from '../../../components/index'

const styles = {
  color: '#F00',
  fontSize: '12px'
}

const isBookings = [
  { name: 'Quotation'},
  { name: 'Booking' }
]

const isBusiness = [
  { name: 'Business'},
  { name: 'Private' }
]

const isServices = [
  { name: 'Telephone'},
  { name: 'Video Call'},
  { name: 'Onsite'},
  { name: 'Translation'},
  { name: 'Transcription' }
]

const API = 'https://api.language-interpreters.com/dev'

export const BookingHeader = ({ register, errors, type }) => {
  const [isDepartment, setDepartment] = useState([])


  const getDepartment = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/departments`)
      setDepartment(data.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getDepartment();
  }, [])

  return (
    <>
      <div className="form-group row">
        <div className="col-md-4 mt-3">
          <Select
            label="Booking Type"
            name="bookingType"
            register={register}
            required={{ required: "Quotation/Booking is required" }}
            data={isBookings}
            error={errors?.bookingType?.message}
          />
        </div>

        <div className="col-md-4 mt-3">
          <Select
            label="Business Type"
            name="businessType"
            register={register}
            required={{ required: "Business/Private is required" }}
            data={isBusiness}
            error={errors?.businessType?.message}
          />
        </div>

        <div className="col-md-4 mt-3">
          <Select
            label="Service Type"
            name="serviceType"
            register={register}
            required={{ required: "Service Type is required" }}
            data={isServices}
            error={errors?.serviceType?.message}
          />
        </div>
      </div>
      <div className="form-group row">
        {/* it shoud be hidde when Business type is private */}
        {type?.businessType !== 'Private' &&
          (<div className="col-md-6">
            <Input
              placeholder="Company Name"
              name="companyName"
              type="text"
              register={register}
              required={{
                required: "Company name",
                maxLength: 5
              }}
              error={errors?.companyName?.message}
            />
          </div>
          )}

        <div className="col-md-6 mt-md-0 mt-3">
          <Input
            placeholder="Name"
            name="name"
            type="text"
            register={register}
            required={{
              required: "Name is required"
            }}
            error={errors?.name?.message}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-4">
          <Select
            label="Department"
            name="department"
            register={register}
            required={{ required: "Department is required" }}
            data={isDepartment}
            error={errors?.department?.message}
          />
        </div>
        <div className="col-md-4 mt-md-0 mt-3">
          <Input
            placeholder="Telephone"
            name="phone"
            type="number"
            register={register}
            required={{
              required: "Telephone is required"
            }}
            error={errors?.phone?.message}
          />
        </div>

        <div className="col-md-4 mt-md-0 mt-3">
          {/* <input type="text" className="form-control form-control-sm" id="mobile" name="mobile"
            placeholder="Mobile" />
          <span className="helper-text"></span> */}
          <Input
            placeholder="Mobile"
            name="mobile"
            type="number"
            register={register}
            required={{
              required: "Mobile number is required"
            }}
            error={errors?.mobile?.message}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-6">
          <textarea
            className={'form-control form-control-sm' + (!errors?.address ? '' : ' is-invalid')}
            {...register("address", { required: "Address is required" })}
            rows="2"
            placeholder="Your Address"></textarea>
          {errors?.address?.message && <span style={styles}>{errors?.address?.message}</span>}
        </div>

        <div className="col-md-6 mt-md-0 mt-3">
          <textarea
            className={'form-control form-control-sm' + (!errors?.invoiceAddress ? '' : ' is-invalid')}
            {...register("invoiceAddress", { required: "Invoice Address is required" })}
            rows="2"
            placeholder="Invoice Address"></textarea>
          {errors?.invoiceAddress?.message && <span style={styles}>{errors?.invoiceAddress?.message}</span>}
        </div>
      </div>

      <div className="dropdown-divider"></div>

      <div className="form-group pt-2">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="via-bacs" className="font-weight-bold text-primary">Payment Method</label>
            <small className="text-muted">(Charges apply for Credit Cards)</small>
            <div className="col-md-12 px-0">
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="via-bacs" {...register("paymentMethod")}
                  className="custom-control-input"
                  value="BACS" />
                <label className="custom-control-label" htmlFor="via-bacs">By BACS Transfer</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="via-card" {...register("paymentMethod")}
                  className="custom-control-input"
                  value="Card" />
                <label className="custom-control-label" htmlFor="via-card">By Debit / Credit Card</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="via-invoice" {...register("paymentMethod")}
                  className="custom-control-input"
                  value="Invoice" />
                <label className="custom-control-label" htmlFor="via-invoice">By Invoice</label>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group autocomplete">
              <label htmlFor="language" className="font-weight-bold text-primary">Language</label>
              <input type="text" className="form-control form-control-sm" id="language" name="language"
                placeholder="Language" />
              <span className="helper-text"></span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="language" className="font-weight-bold text-primary">Dialect</label>
              <input type="text" className="form-control form-control-sm" id="dialect" name="dialect"
                placeholder="Dialect" />
              <span className="helper-text"></span>
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="in-london" className="font-weight-bold text-primary">Location</label>
            <div className="col-md-12 px-0">
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="in-london" {...register("location")} className="custom-control-input"
                  value="In London" />
                <label className="custom-control-label" htmlFor="in-london">In London</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="out-of-london" {...register("location")} className="custom-control-input"
                  value="Out of London" />
                <label className="custom-control-label" htmlFor="out-of-london">Out of London</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
