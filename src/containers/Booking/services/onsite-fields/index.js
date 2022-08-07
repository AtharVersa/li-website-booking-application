import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'


import { Input, Select, FileUploads } from '../../../../components/index'

const API = 'https://api.language-interpreters.com/dev'

const errorStyles = {
  color: '#F00',
  fontSize: '12px'
}

const genders = [
  { name: 'male', value: 'Male' },
  { name: 'female', value: 'Female' },
  { name: 'any', value: 'Any' }
]

const places = [
  { name: 'Cetention Centre', value: 'etention Centre' },
  { name: 'Prison Centre', value: 'Prison Centre' },
  { name: 'Ukba Offices', value: 'Take a statement' },
  { name: 'Office', value: 'Office' },
  { name: 'Hospital', value: 'Hospital' },
  { name: 'Private Residence', value: 'Private Residence' },
  { name: 'School', value: 'School' },
  { name: 'GP Surgery', value: 'GP Surgery' },
  { name: 'Chambers', value: 'Chambers' },
  { name: 'Police station', value: 'Police station' },
  { name: 'Other', value: 'Other' }
]

export default function Onsite({ type, register, errors, fileUploadHandler }) {
  const [caseTypes, setCaseTypes] = useState([])


  const getCaseTypes = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/casemattertypes`)
      setCaseTypes(data.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getCaseTypes();
  }, [])

  return (
    <>
      <div className="card-body px-0">
        <hr />
        <h5
          className={'card-title text-center text-white py-2 m-0 ' + (type?.bookingType !== "Booking" ? "bg-dark" : "bg-primary")}>
          Face To Face / Onsite Interpretation - ({type?.bookingType})
        </h5>

        <div className='mt-3'>
          <div className="form-group row">
            <div className="col-md-6 mt-md-0 mt-3">
              <Input
              label={"Email To"}
                placeholder="Email To"
                name="email"
                type="text"
                register={register}
                required={{
                  required: "Email is required",
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid Email',
                  }
                }}
                error={errors?.email?.message}
              />
            </div>

            <div className="col-md-6 mt-md-0 mt-3">
              <Input
              label={"Invoice To"}
                placeholder="Invoice To"
                name="invoiceTo"
                type="text"
                register={register}
                required={{
                  required: "Invoice Email is required",
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid Email',
                  }
                }}
                error={errors?.invoiceTo?.message}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6 mt-md-0 mt-3">
              <Input
              label={"Your Client Name"}
                placeholder="Your Client Name"
                name="clientName"
                type="text"
                register={register}
                required={{
                  required: "Client Name is required",
                  minLength: { value: 2, message: 'Must have at least 2 letters' },
                  maxLength: { value: 40, message: 'Maximum characters limit is 40' }
                }}
                error={errors?.clientName?.message}
              />
            </div>

            <div className="col-md-6 mt-md-0 mt-3">
              <Input
              label={"File / Invoice Reference"}
                placeholder="File / Invoice Reference"
                name="fileRef"
                type="text"
                register={register}
                required={{
                  required: "File/Invoice Reference is required",
                  minLength: { value: 2, message: 'Must have at least 2 letters' },
                  maxLength: { value: 50, message: 'Maximum characters limit is 50' }
                }}
                error={errors?.fileRef?.message}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4 mt-3">
              <Select
                label="Interpreter Gender"
                name="gender"
                register={register}
                required={{ required: "Interpreter gender is required" }}
                data={genders}
                error={errors?.gender?.message}
                
              />
            </div>

            <div className="col-md-4 mt-3">
              <Select
                label="Case/Matter Type"
                name="caseType"
                register={register}
                required={{ required: "Case/Matter type is required" }}
                data={caseTypes}
                error={errors?.caseType?.message}
              />
            </div>

            <div className="col-md-4 mt-3">
              <Select
                label="Place of Attendance"
                name="place"
                register={register}
                required={{ required: "Place of attendance is required" }}
                data={places}
                error={errors?.place?.message}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4 mt-3">
              <Input
              label={"Date of Attendance"}
                placeholder="Date of Attendance"
                name="date"
                type="date"
                register={register}
                required={{
                  required: "Date of Attendance is required"
                }}
                error={errors?.date?.message}
              />
            </div>

            <div className="col-md-4 mt-3">
              <Input
              label={"Start Time"}
                placeholder="Start Time"
                name="startTime"
                type="time"
                register={register}
                required={{
                  required: "Start time is required"
                }}
                error={errors?.startTime?.message}
              />
            </div>

            <div className="col-md-4 mt-3">
              <Input
              label={"End Time"}
                placeholder="End Time"
                name="endTime"
                type="time"
                register={register}
                required={{
                  required: "End time is required"
                }}
                error={errors?.endTime?.message}
              />
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6 mt-md-0 mt-3">
            <Input
            label={"Person Attending"}
              placeholder="Person Attending"
              name="personAttending"
              type="text"
              register={register}
              required={{
                required: "Person attending is required",
                minLength: { value: 2, message: 'Must have at least 2 letters' },
                maxLength: { value: 40, message: 'Maximum characters limit is 40' }
              }}
              error={errors?.personAttending?.message}
            />
          </div>

          <div className="col-md-6 mt-md-0 mt-3">
            <Input
            label={"Attendance Postcode"}
              placeholder="Attendance Postcode"
              name="postcode"
              type="text"
              register={register}
              required={{
                required: "Attendance postcode is required",
                pattern: {
                  value: /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
                  message: 'Invalid postcode',
                }
              }}
              error={errors?.postcode?.message}
            />
          </div>
          </div>

        <div className="form-group row">
          <div className="col-md-12">
          <label htmlFor="onsite-address" className="font-weight-bold text-primary">Address</label>
            <textarea
            id='onsite-address'
              className={'form-control form-control-sm' + (!errors?.placeOfAttendance ? '' : ' is-invalid')}
              {...register("placeOfAttendance", { required: "Address is required" })}
              rows="2"
              placeholder="Address"></textarea>
            {errors?.placeOfAttendance?.message && <span style={errorStyles}>{errors?.placeOfAttendance?.message}</span>}
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group mt-3 mx-3">
            <FileUploads fileUploadHandler={fileUploadHandler} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-12 mt-3">
          <label htmlFor="notes" className="font-weight-bold text-primary">Notes / Special instructions</label>
            <textarea
            id='notes'
              className={'form-control form-control-sm' + (!errors?.notes ? '' : ' is-invalid')}
              {...register("notes", { required: "Notes / Special instructions is required" })}
              rows="3"
              placeholder="Notes / Special instructions">
            </textarea>
            <small id="tel-inter-duration-video" className="form-text text-muted">
              (eg. Interpreter preference.)
            </small>
            {errors?.notes?.message && <span style={errorStyles}>{errors?.notes?.message}</span>}
          </div>

          <div className="col-md-12 mt-3">
            <div className="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                name="policyCheckbox"
                className="custom-control-input"
                {...register("policyCheckbox")}
                id="policy-checkbox"
              />
              <label className="custom-control-label" htmlFor="policy-checkbox">
                <a href="https://language-interpreters.com/privacy-policy/" target="_blank">
                  <u>I agree to Language Interpreters Privacy Policy</u></a>
              </label>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
