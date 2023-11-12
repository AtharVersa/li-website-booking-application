import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./Booking.css";
import { TimeConvert, DateConvert } from "../../utils";
// import { DevTool } from "@hookform/devtools";

/** Components */
import { Loader, Footer, AlertModal } from "../../components";
import { BookingHeader } from "./header";
import {
  Telephone,
  VideoCall,
  Onsite,
  Translation,
  Transcription,
} from "./services";

const URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

const CreateBooking = () => {
  const [languages, setLanguages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      paymentMethod: "BACS",
      location: "In London",
      policyCheckbox: false,
      urgency: "urgent",
    },
  });

  const policyCheck = watch("policyCheckbox");
  const formatWatch = watch("formatType");
  const type = {
    bookingType: watch("bookingType"),
    businessType: watch("businessType"),
    serviceType: watch("serviceType"),
  };

  const fileUploads = (fileObj) => {
    for (let i = 0; i < fileObj.length; i++) {
      const formData = new FormData();
      formData.append("file", fileObj[i]);
      formData.append("type", "bookingFile");
      axios.post(`${URL}/bookings/newupload`, formData).then(async (res) => {
        if (res.data.success) {
          const result = res.data.data;
          setFiles((oldArr) => [...oldArr, result]);
        } else {
          setError(res.data.message);
        }
      });
    }
  };

  useEffect(() => {
    const loadLanguages = async () => {
      const response = await axios.get(`${URL}/languages/web`);
      const newArrayObj = response.data.data.map(
        ({ language: label, language: value, ...rest }) => ({
          label,
          value,
          ...rest,
        })
      );
      setLanguages(newArrayObj);
    };

    loadLanguages();
  }, []);

  // Create Booking On Submit
  const onSubmit = useCallback(
    async (objData) => {
      setIsLoader(true);
      objData.startTime = TimeConvert(objData.startTime);
      objData.endTime = TimeConvert(objData.endTime);

      if (objData.startTime === null) delete objData.startTime;
      if (objData.endTime === null) delete objData.endTime;
      if (
        objData.serviceType === "Telephone" ||
        objData.serviceType === "Video Call" ||
        objData.serviceType === "Onsite"
      ) {
        delete objData.urgency;
      }
      if (objData.businessType === "Private") {
        delete objData.companyName;
      }

      objData.date = DateConvert(objData.date);
      objData.language = objData.language.value;
      objData.fileList = files;
      try {
        // console.table(objData)
        // const response = await axios.post(`${URL}/bookings/wb`, objData);
        axios
          .post(`${URL}/bookings/wb`, objData)
          .then((response) => {
            // Handle successful response
            console.log(response.data);
            reset(response);
            setIsLoader(false);
            setFiles([]);
            setSuccess(true);
          })
          .catch((error) => {
            console.log("catch error: " + error);
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              setIsLoader(false);
              setError(error.response.data.msg);
              console.error("Server Error:", error.response.data);
              console.error("Status Code:", error.response.status);
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received:", error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error setting up the request:", error.message);
            }
          });

        // console.log("response", response);
        // if (!response.success) {
        //   return;
        // }
        // if (response.data.success) {
        //   reset(response);
        //   // setIsLoader(false)
        //   // setFiles([])
        //   // setSuccess(true)
        //   // console.log('saving response', response)
        // } else {
        //   setError(response.data.msg);
        // }
      } catch (error) {
        setError("Something went wrong!");
      }
    },
    [reset, files]
  );

  const redirectToHome = () => {
    console.log("clicked");
    window.location.href = process.env.REACT_APP_WEBSITE_URL;
    setSuccess(false);
    setIsLoader(true);
  };

  return (
    <>
      {/* <DevTool control={control} />  */}
      {isLoader && (
        <div className="overlay">
          <Loader />
        </div>
      )}
      <section className="w3l-contact mt-2">
        <div className="contacts-9 py-4 mt-4">
          <div className="container py-lg-2">
            <div className="row">
              <div className="col-md-10 mx-auto">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="needs-validation"
                  autoComplete="off"
                  noValidate
                >
                  {/* Cards */}
                  <div className="card">
                    <div className="card-body">
                      <h4
                        className="card-title text-center text-primary mb-4 text-bolder"
                        id="form-title"
                      >
                        <u>Booking/Quotation Form</u>
                        <div
                          className="text-danger mt-2"
                          style={{ fontSize: "16px" }}
                        >
                          By filling this form you are agreeing for us to use
                          the information provided, internally.
                        </div>
                      </h4>

                      <BookingHeader
                        register={register}
                        errors={errors}
                        type={type}
                        control={control}
                        languages={languages}
                      />

                      {/* Services */}
                      {type?.serviceType === "Telephone" &&
                        type?.businessType !== "" &&
                        type?.bookingType !== "" && (
                          <Telephone
                            register={register}
                            errors={errors}
                            type={type}
                            fileUploadHandler={fileUploads}
                          />
                        )}

                      {type?.serviceType === "Video Call" &&
                        type?.businessType !== "" &&
                        type?.bookingType !== "" && (
                          <VideoCall
                            register={register}
                            errors={errors}
                            type={type}
                            fileUploadHandler={fileUploads}
                          />
                        )}

                      {type?.serviceType === "Onsite" &&
                        type?.businessType !== "" &&
                        type?.bookingType !== "" && (
                          <Onsite
                            register={register}
                            errors={errors}
                            type={type}
                            fileUploadHandler={fileUploads}
                          />
                        )}

                      {type?.serviceType === "Translation" &&
                        type?.businessType !== "" &&
                        type?.bookingType !== "" && (
                          <Translation
                            register={register}
                            errors={errors}
                            type={type}
                            fileUploadHandler={fileUploads}
                          />
                        )}

                      {type?.serviceType === "Transcription" &&
                        type?.businessType !== "" &&
                        type?.bookingType !== "" && (
                          <Transcription
                            register={register}
                            errors={errors}
                            type={type}
                            fileUploadHandler={fileUploads}
                            formatWatch={formatWatch}
                          />
                        )}

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!policyCheck}
                      >
                        Submit
                      </button>
                    </div>
                    {/* {success &&
                                        <div className='col-md-6 mx-auto'>
                                        <div class="alert alert-success" role="alert">{success}</div>
                                    </div>} */}
                    {error && (
                      <div className="col-md-6 mx-auto">
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
                <AlertModal success={success} redirect={redirectToHome} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CreateBooking;
