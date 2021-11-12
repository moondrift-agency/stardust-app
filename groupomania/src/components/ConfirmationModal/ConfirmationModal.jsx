import React from 'react';

const ConfirmationModal = ({ setOpenModal }) => {
    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmation de suppression</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Confirmez-vous la suppression ?</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;