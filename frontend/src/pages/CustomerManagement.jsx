import { useState, useEffect } from "react";
import AddCustomerModal from "../Components/Customer/AddCustomerModal";
import ViewCustomerModal from "../Components/Customer/ViewCustomerModal";
import EditCustomerModal from "../Components/Customer/EditCustomerModal";
import DeleteCustomerModal from "../Components/Customer/DeleteCustomerModal";
import { Eye, Pencil, Trash2 } from "lucide-react";
import CustomerService from "../Services/CustomerService";

function CustomerManagement() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);


  
  const fetchCustomers = async () => {
  try {
    const response = await CustomerService.getCustomers(
      currentPage,
      pageSize,
      search
    );

    setCustomers(response.customers);
    setTotalPages(response.totalPages);
    setTotalCount(response.totalCount);

  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};


  const handleAddCustomer = async (customerData) => {

    try {

      const response =
        await CustomerService.addCustomer(
          customerData
        );

      console.log(
        "Customer added:",
        response
      );

      setShowAddModal(false);

      await fetchCustomers();

    } catch (error) {

      console.error(
        "Error adding customer:",
        error.response?.data
      );

    }

  };


  const handleUpdateCustomer = async (
    customerId,
    updatedData
  ) => {

    try {

      const response =
        await CustomerService.updateCustomer(
          customerId,
          updatedData
        );

      setCustomers(
        customers.map((customer) =>
          customer.customerId === customerId
            ? response
            : customer
        )
      );

      setShowEditModal(false);

    } catch (error) {

      console.error(
        "Error updating customer:",
        error.response?.data
      );

    }

  };


  
  const handleDeleteCustomer = async (
    customerId
  ) => {

    try {

      await CustomerService.deleteCustomer(
        customerId
      );

      setShowDeleteModal(false);

      await fetchCustomers();

    } catch (error) {

      console.error(
        "Error deleting customer:",
        error.response?.data
      );

    }

  };

  useEffect(() => {

    fetchCustomers();

  }, [
    currentPage,
    pageSize,
    search
  ]);


  return (

    <div>


      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>
            Customer Management
          </h2>

          <p className="text-muted">
            Manage customer information.
          </p>

        </div>


        <button
          className="btn btn-primary"
          onClick={() =>
            setShowAddModal(true)
          }
        >
          + Add Customer
        </button>

      </div>


  

      <div className="card mb-4">

        <div className="card-body">

          <div className="row g-3">

            {/* Search */}

            <div className="col-md-9">

              <label className="form-label">
                Search Customers
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by customer name, email or phone"
                value={search}
                onChange={(e) => {

                  setSearch(e.target.value);

                  setCurrentPage(1);

                }}
              />

            </div>



            <div className="col-md-3">

              <label className="form-label">
                Show
              </label>

              <select
                className="form-select"
                value={pageSize}
                onChange={(e) => {

                  setPageSize(
                    Number(e.target.value)
                  );

                  setCurrentPage(1);

                }}
              >

                <option value={5}>
                  5
                </option>

                <option value={10}>
                  10
                </option>

                <option value={20}>
                  20
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>


    

      <div className="card">

        <div className="card-body">


          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="mb-0">
              Customer List
            </h5>

            <span className="text-muted">
              {totalCount} customers
            </span>

          </div>


          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>

                  <th>
                    Customer Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    City
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {customers.map(
                  (customer) => (

                    <tr
                      key={
                        customer.customerId
                      }
                    >

                      <td>
                        {
                          customer.customerName
                        }
                      </td>

                      <td>
                        {customer.email}
                      </td>

                      <td>
                        {customer.phone}
                      </td>

                      <td>
                        {customer.city}
                      </td>


                      <td>

                        {/* View */}

                        <div className="parcel-actions">

    {/* View */}
    <button
        type="button"
        className="parcel-icon-btn"
        onClick={() => {

            setSelectedCustomer(customer);

            setShowViewModal(true);

        }}
        title="View customer"
        aria-label="View customer"
    >
        <Eye size={17} strokeWidth={1.8} />
    </button>


    {/* Edit */}
    <button
        type="button"
        className="parcel-icon-btn"
        onClick={() => {

            setSelectedCustomer(customer);

            setShowEditModal(true);

        }}
        title="Edit customer"
        aria-label="Edit customer"
    >
        <Pencil size={17} strokeWidth={1.8} />
    </button>


    {/* Delete */}
    <button
        type="button"
        className="parcel-icon-btn delete"
        onClick={() => {

            setSelectedCustomer(customer);

            setShowDeleteModal(true);

        }}
        title="Delete customer"
        aria-label="Delete customer"
    >
        <Trash2 size={17} strokeWidth={1.8} />
    </button>

</div>
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>



          <div className="d-flex justify-content-between align-items-center mt-4">



            <div className="text-muted">

              Showing page{" "}
              {currentPage}{" "}
              of{" "}
              {totalPages}

              <span className="ms-2">
                ({totalCount} customers)
              </span>

            </div>



            <div className="d-flex gap-2">

              <button
                className="btn btn-outline-secondary"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
              >
                Previous
              </button>


              <span className="btn btn-primary">
                {currentPage}
              </span>


              <button
                className="btn btn-outline-secondary"
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>



      <AddCustomerModal
        show={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
        onSave={handleAddCustomer}
      />


      <ViewCustomerModal
        show={showViewModal}
        customer={selectedCustomer}
        onClose={() =>
          setShowViewModal(false)
        }
      />


      <EditCustomerModal
        show={showEditModal}
        customer={selectedCustomer}
        onSave={handleUpdateCustomer}
        onClose={() =>
          setShowEditModal(false)
        }
      />


      <DeleteCustomerModal
        show={showDeleteModal}
        customer={selectedCustomer}
        onDelete={handleDeleteCustomer}
        onClose={() =>
          setShowDeleteModal(false)
        }
      />

    </div>

  );

}

export default CustomerManagement;