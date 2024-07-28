import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { Input, Select, FileUploads } from "../../../../components/index";

const API = process.env.REACT_APP_BASE_URL;

const errorStyles = {
  color: "#F00",
  fontSize: "12px",
};

export default function Transcription({
  type,
  register,
  errors,
  fileUploadHandler,
  formatWatch,
  isSplitInvoice,
}) {
  const [caseTypes, setCaseTypes] = useState([]);

  const getCaseTypes = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/casemattertypes`);
      setCaseTypes(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const transcriptions = [
    { name: "Audio / Video", value: "Audio / Video" },
    { name: "Audio", value: "Audio" },
    { name: "Video", value: "Video" },
  ];

  const formats = [
    { name: "Youtube", value: "Youtube" },
    { name: "URL link", value: "URL Link" },
    { name: "CD", value: "CD" },
    { name: "DVD", value: "DVD" },
    { name: "Mp3", value: "Mp3" },
    { name: "Mp4", value: "Mp4" },
    { name: "Wav", value: "Wav" },
    { name: "Other", value: "Other" },
  ];
  useEffect(() => {
    getCaseTypes();
  }, [getCaseTypes]);

  return (
    <>
      <div className="card-body px-0">
        <hr />
        <h5
          className={
            "card-title text-center text-white py-2 m-0 " +
            (type?.bookingType !== "Booking" ? "bg-dark" : "bg-primary")
          }
        >
          Transcription - ({type?.bookingType})
        </h5>

        <div className="mt-3">
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
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid Email",
                  },
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
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid Email",
                  },
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
                  minLength: {
                    value: 2,
                    message: "Must have at least 2 letters",
                  },
                  maxLength: {
                    value: 40,
                    message: "Maximum characters limit is 40",
                  },
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
                  minLength: {
                    value: 2,
                    message: "Must have at least 2 letters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum characters limit is 50",
                  },
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
                label="Type of Transcription"
                name="transcriptionType"
                register={register}
                required={{ required: "Format type is required" }}
                data={transcriptions}
                error={errors?.transcriptionType?.message}
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

          {(formatWatch === "URL link" || formatWatch === "Youtube") && (
            <div className="col-md-12 mt-3 px-0">
              <Input
                label={"URL Link"}
                placeholder={"URL Link"}
                name="urlLink"
                type="text"
                register={register}
                required={{
                  required: "URL link is required",
                  pattern: {
                    value:
                      /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
                    message: "Invalid url",
                  },
                  minLength: {
                    value: 2,
                    message: "Must have at least 2 letters",
                  },
                  maxLength: {
                    value: 150,
                    message: "Maximum characters limit is 150",
                  },
                }}
                error={errors?.urlLink?.message}
              />
            </div>
          )}

          <div className="form-group row">
            <div className="form-group mt-3 mx-3">
              <FileUploads
                fileUploadHandler={fileUploadHandler}
                description="upload mp3, mp4, others"
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  name="isSplitInvoice"
                  className="custom-control-input"
                  {...register("isSplitInvoice")}
                  id="split-checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="split-checkbox"
                >
                  <u>
                    Please tick this box if the request involves a split
                    transaction between two or more firms
                  </u>
                </label>
              </div>
            </div>

            {isSplitInvoice && (
              <div className="col-md-12 mt-3">
                <label
                  htmlFor="notes"
                  className="font-weight-bold text-primary"
                >
                  Please enter the split invoice details in the below box.
                </label>
              </div>
            )}
          </div>

          <div className="form-group row">
            <div className="col-md-4 ">
              <Input
                label={"Date of Return"}
                placeholder="Date of Return"
                name="date"
                type="date"
                register={register}
                required={{
                  required: "Date of return is required",
                }}
                error={errors?.date?.message}
              />
            </div>
          </div>

          <div className="form-group pt-2">
            <div className="row">
              <div className="col-md-12">
                <label
                  htmlFor="urgent"
                  className="font-weight-bold text-primary"
                >
                  Type of Urgency
                </label>
                <div className="col-md-12 px-0">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="urgent"
                      {...register("urgency")}
                      className="custom-control-input"
                      value="urgent"
                    />
                    <label className="custom-control-label" htmlFor="urgent">
                      Urgent - Within 3 days
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="non-urgent"
                      {...register("urgency")}
                      className="custom-control-input"
                      value="non-urgent"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="non-urgent"
                    >
                      Non Urgent - After 5 days{" "}
                      <small className="text-muted">
                        {" "}
                        (Depending on the size of the document)
                      </small>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-12 mt-3">
              <label htmlFor="notes" className="font-weight-bold text-primary">
                Notes / Special instructions
              </label>
              <textarea
                id="notes"
                className={
                  "form-control form-control-sm" +
                  (!errors?.notes ? "" : " is-invalid")
                }
                {...register("notes", {
                  required: "Notes / Special instructions is required",
                })}
                rows="3"
                placeholder="Notes / Special instructions"
              ></textarea>
              <small
                id="tel-inter-duration-video"
                className="form-text text-muted"
              >
                (eg. Interpreter preference.)
              </small>
              {errors?.notes?.message && (
                <span style={errorStyles}>{errors?.notes?.message}</span>
              )}
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
                <label
                  className="custom-control-label"
                  htmlFor="policy-checkbox"
                >
                  <a
                    href="https://language-interpreters.com/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <u>I agree to Language Interpreters Privacy Policy</u>
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
