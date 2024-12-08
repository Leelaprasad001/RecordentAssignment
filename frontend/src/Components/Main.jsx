import React, { useState, useEffect, useCallback } from 'react';
import { allAPIs } from '../Utils/allAPIs';
import { notifyError, notifySuccess } from '../Utils/Toasts';
import Modal from '../Utils/Modal';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    recordPerPage: 10,
    sortby: 'employee_id',
    sortorder: 'asc',
    filter: '',
  });
  const [totalRecords, setTotalRecords] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const fetchEmployees = useCallback(async () => {
    try {
      const response = await allAPIs.paginationAPI(pagination);
      if (response.status === 200) {
        setEmployees(response.data.data);
        setTotalRecords(response.data.total);
      }
    } catch (err) {
      notifyError('Failed to fetch employees');
    }
  }, [pagination]);

  const handleSearch = (e) => {
    setPagination((prev) => ({ ...prev, filter: e.target.value.toLowerCase(), page: 1 }));
  };

  const handleSort = (column) => {
    setPagination((prev) => ({
      ...prev,
      sortby: column,
      sortorder: prev.sortorder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (e) => {
    setPagination((prev) => ({ ...prev, filter: e.target.value, page: 1 }));
  };

  const handleDownload = async () => {
    try {
      const response = await allAPIs.downloadPDF();
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'employee_data.pdf';
        a.click();

        window.URL.revokeObjectURL(url);
        notifySuccess('Employee data downloaded successfully');
      }
    } catch (err) {
      notifyError('Error downloading employee data');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [pagination, fetchEmployees]);

  return (
    <div className="container">
      <div className="max-w-full text-center mt-20">
        <p className="uppercase text-custom-blue font-semibold">Welcome to Recordent</p>
        <h2 className="text-2xl md:text-4xl mt-5 font-bold">
          India's most comprehensive credit and collection <br /> management platform
        </h2>
        <div className="flex flex-col sm:flex-row justify-center mt-10 gap-4">
          <button
            onClick={openModal}
            className="px-6 py-2 border border-custom-blue bg-custom-blue text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-blue"
          >
            Add Employee Data
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2 border border-custom-orange bg-custom-orange text-neutral-100 rounded-3xl hover:bg-white hover:text-custom-orange"
          >
            Download Employee Data
          </button>
        </div>
      </div>

      <div className="mt-10 max-w-full m-20 overflow-x-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Search by name or department"
            className="border p-2 rounded w-full md:w-1/2"
            onChange={handleSearch}
          />
          <select
            value={pagination.filter}
            onChange={handleFilterChange}
            className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="">Filter by department</option>
            <option value="engineering">Engineering</option>
            <option value="production">Production</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <table className="w-full mt-5 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('employee_id')}>
                Employee ID 🔽
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('name')}>
                Name 🔽
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('department')}>
                Department 🔽
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => handleSort('salary')}>
                Salary 🔽
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.employee_id}>
                  <td className="border p-2">{emp.employee_id}</td>
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.department}</td>
                  <td className="border p-2">{emp.salary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan="4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-5 flex justify-between items-center">
          <button
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p>
            Page {pagination.page} of {Math.ceil(totalRecords / pagination.recordPerPage) || 1}
          </p>
          <button
            disabled={pagination.page >= Math.ceil(totalRecords / pagination.recordPerPage)}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal} fetchEmployees={fetchEmployees} />
    </div>
  );
};

export default Main;
