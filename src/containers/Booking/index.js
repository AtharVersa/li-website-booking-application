import React from 'react'
import { useForm } from "react-hook-form";

import { TimeConvert, DateConvert } from '../../utils'
// import { DevTool } from "@hookform/devtools";

/** Components */
import { BookingHeader } from './header'
import { Telephone } from './services';

const CreateBooking = () => {
    const {  register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            paymentMethod: "BACS",
            location: "In London",
            policyCheckbox: false
        }
    });

    const type = {
        bookingType: watch('bookingType'),
        businessType: watch('businessType'),
        serviceType: watch('serviceType')
    }

    const onSubmit = async objData => {
        objData.startTime = TimeConvert(objData.startTime)
        objData.endTime = TimeConvert(objData.endTime)
        objData.date = DateConvert(objData.date)
        
        console.log(objData)
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

                                            <BookingHeader register={register} errors={errors} type={type} />

                                            {/* Services */}
                                            {/* {type?.serviceType === 'Telephone' && type?.businessType !== '' && type?.bookingType !== '' && */}
                                                (<Telephone register={register} errors={errors} type={type} />)
                                            {/* } */}

                                            {type?.serviceType === 'Video Call' && "Video Call"}

                                            {type?.serviceType === 'Onsite' && "Onsite"}

                                            {type?.serviceType === 'Translation' && "Translation"}

                                            {type?.serviceType === 'Transcription' && "Transcription"}

                                            <button type='submit' className='btn btn-primary' disabled={!isValid}>Submit</button>
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