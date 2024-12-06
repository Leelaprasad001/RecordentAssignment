import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { notifyError, notifySuccess, notifyWarn } from '../Utils/Toasts';

const Modal = ({ isOpen, closeModal }) => {
  const [formType, setFormType] = useState('manual');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === 'manual') {
      if (!name || !department || !salary) {
        notifyWarn('Please fill out all fields');
        return;
      }
      try {
        await submitManualData();
        notifySuccess('Employee data added successfully');
        clearForm();
      } catch (err) {
        notifyError('Error adding employee data');
      }
    } else if (formType === 'upload' && file) {
      if (file.type !== 'text/csv') {
        notifyWarn('Please upload a valid CSV file');
        return;
      }
      try {
        await uploadFile();
        notifySuccess('File uploaded successfully');
        clearForm();
      } catch (err) {
        notifyError('Error uploading file');
      }
    } else {
      notifyError('Please select a valid option or upload a file');
    }
  };

  const submitManualData = async () => {
    console.log('Submitting manual data:', { name, department, salary });
    return Promise.resolve();
  };

  const uploadFile = async () => {
    console.log('Uploading file:', file);
    return Promise.resolve();
  };

  const clearForm = () => {
    setName('');
    setDepartment('');
    setSalary('');
    setFile(null);
  };

  if (!isOpen) return null;  // Don't render modal if isOpen is false

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-neutral-900 bg-opacity-80 z-50">
      <div className="p-6 rounded-lg max-w-md w-full relative text-center bg-neutral-100">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Add Employee Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="formType" className="block text-sm font-medium text-left">Select Option</label>
            <select
              id="formType"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            >
              <option value="manual">Add Manually</option>
              <option value="upload">Upload File</option>
            </select>
          </div>

          {formType === 'manual' && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-left">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full p-2 mt-2 border rounded"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-left">Department</label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2 mt-2 border rounded"
                >
                  <option value="">Select Department</option>
                  <option value="development">Development</option>
                  <option value="devops">DevOps</option>
                  <option value="production">Production</option>
                  <option value="hr">HR</option>
                </select>
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-left">Salary</label>
                <input
                  type="number"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Enter salary"
                  className="w-full p-2 mt-2 border rounded"
                />
              </div>
            </>
          )}

          {formType === 'upload' && (
            <div>
              <label htmlFor="fileUpload" className="block text-sm font-medium text-left">Upload CSV File</label>
              <input
                type="file"
                id="fileUpload"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 mt-2 border rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2 border border-custom-blue bg-custom-blue text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-blue"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
