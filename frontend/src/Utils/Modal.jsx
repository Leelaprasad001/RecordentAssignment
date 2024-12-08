import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { allAPIs } from '../Utils/allAPIs';
import { notifyError, notifySuccess, notifyWarn } from '../Utils/Toasts';

const Modal = ({ isOpen, closeModal, fetchEmployees }) => {
  const [formType, setFormType] = useState('manual');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('engineering');
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
        const payload = { name, department, salary };
        const response = await allAPIs.addManually(payload);
        if (response.status === 201) {
          notifySuccess('Employee data added successfully');
          clearForm();
          closeModal();
          fetchEmployees();
        }
      } catch (err) {
        notifyError('Error adding employee data');
      }
    } else if (formType === 'upload') {
      if (!file) {
        notifyWarn('Please select a file to upload');
        return;
      }
      if (file.type !== 'text/csv') {
        notifyWarn('Please upload a valid CSV file');
        return;
      }
      try {
        const formData = new FormData();
        formData.append('csv', file);

        const response = await allAPIs.addCSV(formData);
        if (response.status === 200) {
          notifySuccess('File uploaded successfully');
          clearForm();
          closeModal();
          fetchEmployees();
        }
      } catch (err) {
        notifyError('Error uploading file');
      }
    } else {
      notifyError('Please select a valid option or upload a file');
    }
  };

  const clearForm = () => {
    setName('');
    setDepartment('engineering');
    setSalary('');
    setFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-neutral-900 bg-opacity-80 z-50">
      <div className="p-6 rounded-lg max-w-md w-full relative text-center bg-neutral-100">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Add Employee Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="formType" className="block text-sm font-medium text-left">
              Select Option
            </label>
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
                <label htmlFor="name" className="block text-sm font-medium text-left">
                  Name
                </label>
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
                <label htmlFor="department" className="block text-sm font-medium text-left">
                  Department
                </label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2 mt-2 border rounded"
                >
                  <option value="engineering">Engineering</option>
                  <option value="production">Production</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR</option>
                </select>
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-left">
                  Salary
                </label>
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
              <label htmlFor="fileUpload" className="block text-sm font-medium text-left">
                Upload CSV File
              </label>
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
