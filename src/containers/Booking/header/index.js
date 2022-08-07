import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

import { Input, Select } from '../../../components/index'

const styles = {
  color: '#F00',
  fontSize: '12px'
}

const isBookings = [
  { name: 'Quotation' },
  { name: 'Booking' }
]

const isBusiness = [
  { name: 'Business' },
  { name: 'Private' }
]

const isServices = [
  { name: 'Telephone' },
  { name: 'Video Call' },
  { name: 'Onsite' },
  { name: 'Translation' },
  { name: 'Transcription' }
]

const URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

export const BookingHeader = ({ register, errors, type, languages, control }) => {
  const [isDepartment, setDepartment] = useState([])


  const getDepartment = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URL}/departments`)
      setDepartment(data.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getDepartment();
  }, [])
console.log(type)
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
            disable={type.bookingType}
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
            disable={type.businessType}
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
            disable={type.serviceType}
          />
        </div>
      </div>
      <div className="form-group row">
        {/* it shoud be hidde when Business type is private */}
        {type?.businessType !== 'Private' &&
          (<div className="col-md-6">
            <Input
              label={"Company Name"}
              placeholder="Company Name"
              name="companyName"
              type="text"
              register={register}
              required={{
                required: "Company name",
                minLength: { value: 2, message: 'Must have at least 2 letters' },
                maxLength: { value: 50, message: 'Maximum characters limit is 50' }
              }}
              error={errors?.companyName?.message}
            />
          </div>
          )}

        <div className="col-md-6 mt-md-0 mt-3">
          <Input
          label={"Name"}
            placeholder="Name"
            name="name"
            type="text"
            register={register}
            required={{
              required: "Name is required",
              minLength: { value: 2, message: 'Must have at least 2 letters' },
              maxLength: { value: 40, message: 'Maximum characters limit is 40' }
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
          label={"Telephone"}
            placeholder="Telephone"
            name="phone"
            type="text"
            register={register}
            required={{
              required: "Telephone is required",
              pattern: {
                value: /^[0-9]+$/,
                message: 'Invalid phone number',
              },
              minLength: { value: 10, message: 'Must have at least 10 digits' },
              maxLength: { value: 15, message: 'Maximum digits limit is 15' },
            }}
            error={errors?.phone?.message}
          />
        </div>

        <div className="col-md-4 mt-md-0 mt-3">
          <Input
          label={"Mobile"}
            placeholder="Mobile"
            name="mobile"
            type="text"
            register={register}
            required={{
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: 'Invalid phone number',
              },
              minLength: { value: 10, message: 'Must have at least 10 digits' },
              maxLength: { value: 15, message: 'Maximum digits limit is 15' },
            }}
            error={errors?.mobile?.message}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-md-6">
        <label htmlFor="address" className="font-weight-bold text-primary">Address</label>
          <textarea
          id='address'
            className={'form-control form-control-sm' + (!errors?.address ? '' : ' is-invalid')}
            {...register("address", { required: "Address is required" })}
            rows="3"
            placeholder="Your Address"></textarea>
          {errors?.address?.message && <span style={styles}>{errors?.address?.message}</span>}
        </div>

        <div className="col-md-6 mt-md-0 mt-3">
        <label htmlFor="invoice-address" className="font-weight-bold text-primary">Invoice Address</label>
          <textarea
          id='invoice-address'
            className={'form-control form-control-sm' + (!errors?.invoiceAddress ? '' : ' is-invalid')}
            {...register("invoiceAddress", { required: "Invoice Address is required" })}
            rows="3"
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
            <label htmlFor="input-field" className="font-weight-bold text-primary">Language</label>
            <Controller
              name="language"
              className={'form-control form-control-sm' + (!errors?.language ? '' : ' is-invalid')}
              control={control}
              rules={{
                required: "Language is required"
              }}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={languages}

                />
              )}
            />
            {errors?.language?.message && <span style={styles}>{errors?.language?.message}</span>}
          </div>
          <div className="col-md-3">
            {/* <div className="form-group">
              <label htmlFor="dialect" className="font-weight-bold text-primary">Dialect</label>
              <input type="text" className="form-control " id="dialect" name="dialect"
                placeholder="Dialect" />
              <span className="helper-text"></span>
            </div> */}

            <Input
              label={'Dialect'}
              placeholder="Dialect"
              name="dialect"
              type="text"
              register={register}
              required={{
                required: "Dialect is required",
              }}
              error={errors?.dialect?.message}
            />
          </div>

          <div className="col-md-6 mt-3">
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
