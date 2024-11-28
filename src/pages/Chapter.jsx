import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [id]);

  return (
    <>
      <h1 className="text-3xl font-extrabold text-center my-8">Course Content</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            data.map((c) => <ChapterCourse key={c.ch_id} {...c} />)
          )}
        </div>
      </div>
    </>
  );
};

const ChapterCourse = (props) => {
  return (
    <div className="p-4 rounded-lg border border-gray-300 shadow-lg">
      <h2 className="text-xl font-bold mb-2">เนื้อหาในบทเรียน</h2>
      <hr className="border-gray-400 mb-4" />
      <div className="mb-4">
        <strong>เรื่อง :</strong> {props.ch_title}
      </div>
      <div
        className="relative bg-blue-100"
        style={{ aspectRatio: "16/9", width: "100%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={"https://www.youtube.com/embed/" + props.ch_url}
          title={props.ch_title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-700">
        <div>
          <strong>View:</strong> {props.ch_view}
        </div>
        <div>
          <strong>Time:</strong> {props.ch_timetotal}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
