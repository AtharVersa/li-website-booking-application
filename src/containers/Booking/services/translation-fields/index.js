import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { Input, Select, FileUploads } from '../../../../components/index'
import { genders, purposeOfCalls } from '../dropdown-options';

const API = 'https://api.language-interpreters.com/dev'

const errorStyles = {
  color: '#F00',
  fontSize: '12px'
}

export default function Translation({ type, register, errors, fileUploadHandler }) {
  const [caseTypes, setCaseTypes] = useState([])

  const getCaseTypes = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/casemattertypes`)
      setCaseTypes(data.data)
    } catch (error) {
      console.log(error)
    }
  }, [])


  const documents = [
    { name: 'Legal', value: 'Legal' },
    { name: 'Housing', value: 'Housing' },
    { name: 'Personal documents', value: 'Personal documents' },
    { name: 'IDs', value: 'IDs' },
    { name: 'Medical', value: 'Medical' },
    { name: 'Statement', value: 'Statement' },
    { name: 'Other', value: 'Other' }
  ]

  const formats = [
    { name: 'PDF', value: 'PDF' },
    { name: 'Jpeg', value: 'JPEG' },
    { name: 'Ms-word', value: 'MS Word' },
    { name: 'Picture', value: 'Picture' },
    { name: 'Scan', value: 'Scan' },
    { name: 'Other', value: 'Other' }
  ]
  useEffect(() => {
    getCaseTypes();
  }, [])

  return (
    <>
      <div className="card-body px-0">
        <hr />
        <h5
          className={'card-title text-center text-white py-2 m-0 ' + (type?.bookingType !== "Booking" ? "bg-dark" : "bg-primary")}>
          Translation of Document(s) - ({type?.bookingType})
        </h5>

        <div className='mt-3'>
          <div className="form-group row">
            <div className="col-md-6 mt-md-0 mt-3">
              <Input
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
                label="Type of Document"
                name="documentType"
                register={register}
                required={{ required: "Document type is required" }}
                data={documents}
                error={errors?.documentType?.message}
              />
            </div>


            <div className="col-md-4 mt-3">
              <Select
                label="Format Type"
                name="formatType"
                register={register}
                required={{ required: "Format type is required" }}
                data={formats}
                error={errors?.formatType?.message}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group mt-3 mx-3">
              <FileUploads fileUploadHandler={fileUploadHandler} />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4 mt-3">
              <Input
                placeholder="Date of Return"
                name="date"
                type="date"
                register={register}
                required={{
                  required: "Date of return is required"
                }}
                error={errors?.date?.message}
              />
            </div>
          </div>

          <div className="form-group pt-2">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="urgent" className="font-weight-bold text-primary">Type of Urgency</label>
                <div className="col-md-12 px-0">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="urgent" {...register("urgency")}
                      className="custom-control-input"
                      value="urgent" />
                    <label className="custom-control-label" htmlFor="urgent">Urgent - Within 3 days</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="non-urgent" {...register("urgency")}
                      className="custom-control-input"
                      value="non-urgent" />
                    <label className="custom-control-label" htmlFor="non-urgent">
                      Non Urgent - After 5 days <small className="text-muted"> (Depending on the size of the document)</small>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-12 mt-3">
              <textarea
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
                  {...register("policyCheckbox", { required: true })}
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
      </div>
    </>
  )
}
