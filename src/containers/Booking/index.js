import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

import './Booking.css'
import { TimeConvert, DateConvert } from '../../utils'
// import { DevTool } from "@hookform/devtools";

/** Components */
import { Loader, Footer } from '../../components';
import { BookingHeader } from './header'
import { Telephone, VideoCall, Onsite, Translation, Transcription } from './services';

const URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

const CreateBooking = () => {
    const [languages, setLanguages] = useState([]);
    const [files, setFiles] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const {  register, handleSubmit, watch, control, formState: { errors }, reset } = useForm({
        mode: "onChange",
        defaultValues: {
            paymentMethod: "BACS",
            location: "In London",
            policyCheckbox: false,
            urgency: 'urgent'
        }
    });

    const policyCheck = watch('policyCheckbox')
    const formatWatch = watch('formatType')
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

    const onSubmit = useCallback(async objData => {
        setIsLoader(true)
        objData.startTime = TimeConvert(objData.startTime)
        objData.endTime = TimeConvert(objData.endTime)

        if(objData.startTime === null) delete objData.startTime
        if(objData.endTime === null) delete objData.endTime
        
        objData.date = DateConvert(objData.date)
        objData.language = objData.language.value
        objData.fileList = files

        console.table(objData)
        const response = await axios.post(`${URL}/bookings`, objData)
        if(response.data.success) {
            
            reset(response)
            setIsLoader(false)
            console.log('saving response', response)
        }
    }, [reset, files])

    return (
        <>
            {/* <DevTool control={control} />  */}
            { isLoader && 
                <div className='overlay'>
                    <Loader />
                </div>}
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
                                            {(type?.serviceType === 'Telephone' && type?.businessType !== '' && type?.bookingType !== '') &&
                                                (<Telephone register={register} errors={errors} type={type} fileUploadHandler={fileUploads} />)
                                             }

                                            {(type?.serviceType === 'Video Call' && type?.businessType !== '' && type?.bookingType !== '') && 
                                            (<VideoCall register={register} errors={errors} type={type} fileUploadHandler={fileUploads}/>)
                                            }

                                            {(type?.serviceType === 'Onsite' && type?.businessType !== '' && type?.bookingType !== '') && 
                                                (<Onsite register={register} errors={errors} type={type} fileUploadHandler={fileUploads} />)
                                            }

                                            {(type?.serviceType === 'Translation' && type?.businessType !== '' && type?.bookingType !== '') && 
                                                (<Translation register={register} errors={errors} type={type} fileUploadHandler={fileUploads} />)
                                            }

                                            {(type?.serviceType === 'Transcription' && type?.businessType !== '' && type?.bookingType !== '') && 
                                                (<Transcription register={register} errors={errors} type={type} fileUploadHandler={fileUploads} formatWatch={formatWatch} />)
                                            }

                                            <button type='submit' className='btn btn-primary' disabled={!policyCheck}>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                
                </div>

            </section>
            <Footer />
        </>
    )
}

export default CreateBooking