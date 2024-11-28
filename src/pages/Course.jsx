import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Course = () => {
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course");
    const data_format = await res.data.data;
    setData(data_format);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-teal-300 p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Course List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

const CourseCard = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="h-48 w-full rounded overflow-hidden">
        <img
          src={props.picture}
          alt={props.title}
          className="w-full h-full object-cover flex justify-center"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mt-4">{props.title}</h2>
      <p className="text-gray-600 mt-2">{props.detail}</p>
      <NavLink
        to={`/course/${props.id}`}
        className="inline-block mt-4 px-6 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 text-center"
      >
        ดูรายละเอียดเพิ่มเติม
      </NavLink>
    </div>
  );
};

export default Course;
