import React from 'react';
import Modal from 'react-modal';

import styles from "../style/custom.module.scss"

const ContactModal = ({ isOpen, onClose, listing, userType }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex text-white items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className={`bg-black p-6 rounded-lg shadow-xl max-w-md w-full ${styles.contact}`}>
        <h2 className="text-2xl font-bold mb-4">
          Contact {userType === 'seller' ? 'Seller' : 'Buyer'}
        </h2>
        {console.log("dcef", listing)}
        
        <div className="mb-4">
          <p className="font-semibold">Email:</p>
          <p className="text-white-600">{listing.email}</p>
        </div>
        
        <div className="mb-6">
          <p className="font-semibold">Phone:</p>
          <p className="text-white-600">{listing.contactNumber}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white text-black py-2 px-4 rounded hover:bg-grey-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ContactModal; 