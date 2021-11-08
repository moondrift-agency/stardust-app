import React from 'react';

const Notification = (props) => {
    return (
        <div>
            <div className="toast-container position-absolute p-3 bottom-0 start-50 translate-middle-x"
                 id="toastPlacement" data-original-class="toast-container position-absolute p-3">
                <div className="toast fade show">
                    <div className="toast-header">
                        <svg className="bd-placeholder-img rounded me-2" width="20" height="20"
                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice"
                             focusable="false">
                            <rect width="100%" height="100%" fill="#007aff"></rect>
                        </svg>

                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </div>
                    <div className="toast-body">
                        {props.message}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;