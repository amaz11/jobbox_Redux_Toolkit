import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobQuery } from "../feature/job/jobapi";

const Jobs = () => {
  const {data, isLoading,isError}= useGetJobQuery()
  // const {position,companyName} = data.data || {}
  // console.log(data)
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {data?.data?.map((jobData)=><JobCard key={jobData._id} jobData={jobData} />)}
      </div>
    </div>
  );
};

export default Jobs;
