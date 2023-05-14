import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams


function ProjectUpdate() {
  const { projectId } = useParams();
  const [newMembers, setNewMembers] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newFiles, setNewFiles] = useState(null);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('members', newMembers);
      formData.append('summary', newSummary);
      if (newFiles) {
        for (let file of newFiles) {
          formData.append('file', file);
        }
      }

      await axios.put(`http://localhost:1337/api/projects/${projectId}`, formData);

      alert("Project updated successfully!");
      setNewSummary(''); // Clear the summary field
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the project.");
    }
  };

  const handleFileChange = (e) => {
    setNewFiles(e.target.files);
  };

  return (
    <form onSubmit={handleUpdateSubmit}>
      <input
        type="text"
        value={newMembers}
        onChange={(e) => setNewMembers(e.target.value)}
        placeholder="Add members"
      />
      <input
        type="text"
        value={newSummary}
        onChange={(e) => setNewSummary(e.target.value)}
        placeholder="Add summary"
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Update project</button>
    </form>
  );
}

export default ProjectUpdate;
