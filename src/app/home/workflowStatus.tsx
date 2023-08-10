import { useState, useEffect } from 'react';

interface WorkflowJob {
  // Define the structure of your workflow job data here
  // For example, you might have properties like id, name, status, etc.
}

const WorkflowStatus: React.FC = ({stage}) => {
  const [workflowJobs, setWorkflowJobs] = useState<WorkflowJob[]>([]);

  const fetchWorkflowJobs = async () => {
    try {
      const response = await fetch('/api/planning/items'); // Replace with your API endpoint
      const data = await response.json();
      setWorkflowJobs(data.jobs);
      console.log(workflowJobs)
    } catch (error) {
      console.error('Error fetching workflow jobs:', error);
    }
  };

  useEffect(() => {
    fetchWorkflowJobs();
   //  const interval = setInterval(fetchWorkflowJobs, 5000);

   //  return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Workflow Status</h1>
      <ul>
        {console.log(workflowJobs)}
        {workflowJobs.map(el => (
         <>{stage}</>
        ))}
      </ul>
    </div>
  );
};

export default WorkflowStatus;
