import { useState, useEffect } from "react";
import HubService from "../Services/HubService";
import AddHubModal from "../Components/Hub/AddHubModal";
import ViewHubModal from "../Components/Hub/ViewHubModal";
import EditHubModal from "../Components/Hub/EditHubModal";
import { Eye, Pencil, Trash2 } from "lucide-react";



function HubManagement() {

    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedHub, setSelectedHub] = useState(null);
    const [search, setSearch] = useState("");
    const [hubs, setHubs] = useState([]);

     
    
  const handleDeleteHub = async (hubId) => {
    try {
      await HubService.deleteHub(hubId);

      loadHubs();
    } catch (error) {
      console.error(error);
    }
  };


    const handleViewHub = async (hubId) => {
      try {
        const data = await HubService.getHubById(hubId);

        setSelectedHub(data);
        setShowViewModal(true);

      } catch (error) {
        console.error("Error loading hub:", error);
      }
    };

    const handleEditHub = (hub) => {
    setSelectedHub(hub);
    setShowEditModal(true);
  };

  const handleUpdateHub = async (hubId, hubData) => {
  try {
    await HubService.updateHub(hubId, hubData);

    setShowEditModal(false);

  } catch (error) {
    console.error(
      "Error updating hub:",
      error.response?.data
    );
  }
};
    
    
    const handleAddHub = async (hubData) => {
      try {
        const response = await HubService.addHub(hubData);

        console.log("Hub added:", response);

        setShowModal(false);
        loadHubs();

      } catch (error) {
        console.error(
          "Error adding hub:",
          error.response?.data
        );
      }
    };
     

      
      const loadHubs = async () => {
        try {
          const data = await HubService.getHubs(search);

          setHubs(data);
        } catch (error) {
          console.error("Error loading hubs:", error);
        }
        
      };

      

    useEffect(() => {
          loadHubs();
        }, [search]);

    
  

  return (
    <div>
      
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Hub Management</h2>
          <p className="text-muted">
            Manage courier hubs and their information.
          </p>
        </div>

        <button
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        + Add Hub
      </button>
      </div>

      {/* Search Section */}
      <div className="card mb-4">
        <div className="card-body">
          <label className="form-label">Search Hubs</label>

          <input
        type="text"
        className="form-control"
        placeholder="Search by hub name or city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        </div>
      </div>

      {/* Hub List */}
<div className="card">
  <div className="card-body">

    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0">Hub List</h5>
      <span className="text-muted">
        {hubs.length} hubs
      </span>
    </div>

    <div className="table-responsive">
      <table className="table align-middle">

        <thead>
          <tr>
            <th>Hub Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {hubs.map((hub) => (
    <tr key={hub.hubId}>
      <td>{hub.hubName}</td>

      <td>{hub.city}</td>

      <td>{hub.address}</td>

      <td>{hub.phone}</td>

      <td>
     <div className="parcel-actions">

    {/* View */}
    <button
        type="button"
        className="parcel-icon-btn"
        onClick={() => handleViewHub(hub.hubId)}
        title="View hub"
        aria-label="View hub"
    >
        <Eye size={17} strokeWidth={1.8} />
    </button>

    {/* Edit */}
    <button
        type="button"
        className="parcel-icon-btn"
        onClick={() => handleEditHub(hub)}
        title="Edit hub"
        aria-label="Edit hub"
    >
        <Pencil size={17} strokeWidth={1.8} />
    </button>

    {/* Delete */}
    <button
        type="button"
        className="parcel-icon-btn delete"
        onClick={() => handleDeleteHub(hub.hubId)}
        title="Delete hub"
        aria-label="Delete hub"
    >
        <Trash2 size={17} strokeWidth={1.8} />
    </button>

</div>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>

  </div>
</div>

<AddHubModal show={showModal} onClose={() => setShowModal(false)} onSave={handleAddHub}
/><ViewHubModal show={showViewModal} onClose={() => setShowViewModal(false)} hub={selectedHub}/>
<EditHubModal show={showEditModal} onClose={() => setShowEditModal(false)} hub={selectedHub}  onUpdate={handleUpdateHub}/>    </div>
  );
}

export default HubManagement;