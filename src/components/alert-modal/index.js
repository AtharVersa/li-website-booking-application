import React from 'react'
import './AlertModal.css';

const AlertModal = ({ success, redirect }) => {
  return (
    <>
        {/* <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#success_tic">Open Modal</button> */}
            <div id="success_tic" className={"modal fade " + (success ? 'show' : '')} 
            style={{
                display: success ? 'block' : 'none',
                backgroundColor: success ? '#000000cf' : 'none'
              }}
              role="dialog">
                <div className="modal-dialog" style={{ top: '25%' }}>
                    <div className="modal-content">
                        {/* <a className="close" href="#" data-dismiss="modal">&times;</a> */}
                        <div className="page-body">
                            <div className="head my-3">  
                                <h4 className='mt-3'>Your request has been submitted</h4>
                            </div>

                            <h1 className="text-align">
                                <div className="checkmark-circle">
                                    <div className="background"></div>
                                    <div className="checkmark draw"></div>
                                </div>
                            </h1>
                        <button tyle="button" onClick={redirect} className='btn bg-primary text-white'>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AlertModal