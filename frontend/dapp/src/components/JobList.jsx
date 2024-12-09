import React from "react";
import "../styles/JobList.css";

const jobs = [
  { title: "Producer", applicants: 5 },
  { title: "Secretary", applicants: 5 },
  { title: "Manager", applicants: 5 },
  { title: "Manager", applicants: 5 },
];

const JobList = () => {
  return (
    <div className="joblist-container">
      <h2>Posted Jobs</h2>
      <button className="post-job-button">Post a new job</button>
      {jobs.map((job, index) => (
        <div className="job-card" key={index}>
          <h3>{job.title}</h3>
          <p>{job.applicants} applicants</p>
          <div className="job-actions">
            <button>Detail</button>
            <button>Edit</button>
            <button>Recommend</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
