import React, { useState } from 'react';
import Modal from '../Utils/Modal';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='container'>
      <div className="max-w-full text-center mt-20">
        <p className="uppercase text-custom-blue font-semibold">Welcome to Recordent</p>
        <h2 className="text-5xl mt-5 font-bold">Indias most comprehensive credit and collection <br /> management platform</h2>
        <div className='flex justify-center mt-10 gap-4'>
          <button
            onClick={openModal}
            className="px-6 py-2 border border-custom-blue bg-custom-blue text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-blue"
          >
            Add Employee Data
          </button>
          <a href="/signup" className="px-6 py-2 border border-custom-orange bg-custom-orange text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-orange">
            View Data
          </a>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        from="add"
      />
    </div>
  );
};

export default Main;
