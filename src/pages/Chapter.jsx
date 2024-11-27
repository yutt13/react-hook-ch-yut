import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Chapter = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const callApi = async () => {
    try {
      const res = await axios.get(
        `https://api.codingthailand.com/api/course/${id}`
      );
      setData(res.data.data); // เก็บข้อมูลใน state
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [id]);

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
        เนื้อหาในบทเรียน
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className="ml-4 text-gray-500">Loading...</p>
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">ไม่มีข้อมูลสำหรับบทเรียนนี้</p>
      ) : (
        data.map((chapter, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-5 mb-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
          >
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
              เรื่อง : {chapter.ch_title}
            </h3>
            <div className="bg-gray-200 h-40 rounded-md flex justify-center items-center">
              <iframe
                className="w-full h-full rounded-md bg-gray-200"
                src={`https://www.youtube.com/embed/${chapter.ch_url}`}
                title={chapter.ch_title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-between items-center text-gray-700 mt-4 text-sm">
              <p>
                <strong>View:</strong> {chapter.ch_view}
              </p>
              <p>
                <strong>Time:</strong> {chapter.ch_timetotal}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Chapter;
