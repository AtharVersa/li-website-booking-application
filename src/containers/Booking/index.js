import React, { useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

import { TimeConvert, DateConvert } from '../../utils'
// import { DevTool } from "@hookform/devtools";

/** Components */
import { BookingHeader } from './header'
import { Telephone, VideoCall } from './services';

const URL = 'https://api.language-interpreters.com/dev/api/v1';

const CreateBooking = () => {
    const [languages, setLanguages] = useState([]);
    const [files, setFiles] = useState([]);

    const {  register, handleSubmit, watch, control, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            paymentMethod: "BACS",
            location: "In London",
            policyCheckbox: false
        }
    });

    const policyCheck = watch('policyCheckbox')
    const type = {
        bookingType: watch('bookingType'),
        businessType: watch('businessType'),
        serviceType: watch('serviceType')
    }
   
    const fileUploads = (fileObj) => {        
        for(let i = 0; i < fileObj.length; i++) {
            const formData = new FormData();
            formData.append('file', fileObj[i])
            formData.append('type', 'bookingFile')
            axios.post(`${URL}/bookings/newupload`, formData).then(async (res) => {
                if(res.data.success) {
                    const result = res.data.data
                    setFiles(oldArr => [...oldArr,result]);
                }
            })
        }
    }
    
    useEffect(() => {
        const loadLanguages = async () => {
          const response = await axios.get(`${URL}/languages/web`)
          const newArrayObj = response.data.data.map(({ language: label, language: value, ...rest}) => ({  label, value, ...rest}))
          setLanguages(newArrayObj)
        }
    
        loadLanguages();
    }, []);


    const onSubmit = async objData => {
        objData.startTime = TimeConvert(objData.startTime)
        objData.endTime = TimeConvert(objData.endTime)
        objData.date = DateConvert(objData.date)
        objData.language = objData.language.value
        objData.fileList = files

        console.table(objData)
    }

    return (
        <>
            {/* <DevTool control={control} />  */}
            <section className="w3l-contact mt-2">
                <div className="contacts-9 py-4 mt-4">
                    <div className="container py-lg-2">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" autoComplete="off" noValidate>
                                    {/* Modal */}
                                    <div className="modal fade show" data-backdrop="static" data-keyboard="false" tabIndex="-1"
                                        role="dialog" aria-labelledby="bookFormDropLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title text-center" id="bookFormDropLabel">Quotation / Booking Request</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cards */}
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title text-center" id="form-title">
                                                <span id="span-form"></span>
                                            </h4>

                                            <BookingHeader register={register} errors={errors} type={type} control={control} languages={languages}/>

                                            {/* Services */}
                                            {type?.serviceType === 'Telephone' && type?.businessType !== '' && type?.bookingType !== '' &&
                                                (<Telephone register={register} errors={errors} type={type} fileUploadHandler={fileUploads} />)
                                             }

                                            {type?.serviceType === 'Video Call' && 
                                            (<VideoCall register={register} errors={errors} type={type} fileUploadHandler={fileUploads}/>)
                                            }

                                            {type?.serviceType === 'Onsite' && "Onsite"}

                                            {type?.serviceType === 'Translation' && "Translation"}

                                            {type?.serviceType === 'Transcription' && "Transcription"}

                                            <button type='submit' className='btn btn-primary' disabled={!policyCheck}>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                
                </div>

            </section>
        </>
    )
}

export default CreateBooking