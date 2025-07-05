import React, { useState } from 'react';
import axios from 'axios';

const AttendanceViewer = () => {
  const [uid, setUid] = useState('');
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!uid) return;

    setLoading(true);
    setError('');
    setRecords([]);

    try {
      const response = await axios.get(`http://localhost:4000/attendance/${uid}`);
      setRecords(response.data);
    } catch (err) {
      setError('Error fetching records. Please check the UID or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Attendance Viewer</h1>
      
      <input
        type="text"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        placeholder="Enter UID (e.g., employee123)"
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {records.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Attendance Records:</h2>
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{rec.time}</td>
                  <td className="border px-4 py-2">{rec.date}</td>
                  <td className="border px-4 py-2">{rec.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceViewer;
