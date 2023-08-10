import { NextResponse } from 'next/server';

export async function GET() {
  const repoOwner = 'gusvega'
  const repoName = 'pipeline'
  const workflowId = process.env.NEXT_PUBLIC_GITHUB_WORKFLOW_ID
  const token = process.env.NEXT_PUBLIC_GITHUB_API

  let workflowJobs = null;

  const fetchWorkflowJobs = async () => {
    try {
      // Fetch the workflow runs
      const workflowResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowId}/runs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!workflowResponse.ok) {
        throw new Error('Error fetching workflow runs');
      }

      const workflowRuns = await workflowResponse.json();

      if (workflowRuns.workflow_runs.length === 0) {
        throw new Error('No workflow runs found');
      }

      // Get the ID of the latest workflow run
      const latestRunId = workflowRuns.workflow_runs[0].id;

      // Fetch the jobs for the latest workflow run
      const jobsResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/actions/runs/${latestRunId}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (jobsResponse.ok) {
        const jobs = await jobsResponse.json();
        workflowJobs = jobs; // Store fetched jobs
      } else {
        throw new Error('Error fetching workflow jobs');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getWorkflowJobs = async () => {
    await fetchWorkflowJobs();
  };

  // Fetch workflow jobs initially
  await getWorkflowJobs();

  // Fetch workflow jobs every 5 seconds (adjust interval as needed)
  // setInterval(getWorkflowJobs, 10000);

  // Return the stored workflow job data as part of the API response
  return new NextResponse(JSON.stringify(workflowJobs), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
