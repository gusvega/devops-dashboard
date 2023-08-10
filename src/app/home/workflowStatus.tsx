import { useState, useEffect } from "react";

interface WorkflowJob {
  // Define the structure of your workflow job data here
  // For example, you might have properties like id, name, status, etc.
}

const WorkflowStatus: React.FC = ({ stage }) => {
  const [workflowJobs, setWorkflowJobs] = useState<WorkflowJob[]>([]);

  const fetchWorkflowJobs = async () => {
    try {
      const response = await fetch("/api/planning/items"); // Replace with your API endpoint
      const data = await response.json();
      setWorkflowJobs(data.jobs);
      console.log(workflowJobs);
    } catch (error) {
      console.error("Error fetching workflow jobs:", error);
    }
  };

  const dashboard = {
    planning: {
      totalEpicsFeaturesBacklog: {
        description: "Total number of epics, features, and backlog items.",
        environment: {
          dev: {
            total: 10,
            completed: 3,
            milestones: ["Milestone 1", "Milestone 2"],
            goalsSummary: "Successfully achieved important goals.",
            userStories: {
              distribution: {
                storyA: 25,
                storyB: 50,
                storyC: 25,
              },
            },
          },
          preprod: {
            total: 12,
            completed: 5,
            milestones: ["Milestone 3", "Milestone 4"],
            goalsSummary: "Made significant progress towards goals.",
            userStories: {
              distribution: {
                storyA: 30,
                storyB: 40,
                storyC: 30,
              },
            },
          },
          prod: {
            total: 15,
            completed: 10,
            milestones: ["Milestone 5", "Milestone 6"],
            goalsSummary: "Achieved all primary goals for this stage.",
            userStories: {
              distribution: {
                storyA: 20,
                storyB: 30,
                storyC: 50,
              },
            },
          },
        },
      },
      userStoriesDistribution: {
        description: "Visualization of user stories distribution.",
        environment: {
          dev: {
            storyA: 25,
            storyB: 50,
            storyC: 25,
          },
          preprod: {
            storyA: 30,
            storyB: 40,
            storyC: 30,
          },
          prod: {
            storyA: 20,
            storyB: 30,
            storyC: 50,
          },
        },
      },
      progressCompletionTasks: {
        description: "Progress bar indicating completion of tasks.",
        environment: {
          dev: 75,
          preprod: 60,
          prod: 100,
        },
      },
      criticalTasksDeadlines: {
        description: "List of critical tasks or upcoming deadlines.",
        environment: {
          dev: ["Task 1", "Task 2"],
          preprod: ["Task 3", "Task 4"],
          prod: [],
        },
      },
      completedTasksMilestones: {
        description: "List of completed tasks or milestones.",
        environment: {
          dev: ["Milestone 1"],
          preprod: ["Milestone 2"],
          prod: ["Milestone 3", "Milestone 4"],
        },
      },
      summaryAchievedGoals: {
        description: "Summary of achieved goals.",
        environment: {
          dev: "Successfully achieved important goals.",
          preprod: "Made significant progress towards goals.",
          prod: "Achieved all primary goals for this stage.",
        },
      },
    },
    // ... other stages ...
  };

  useEffect(() => {
    fetchWorkflowJobs();
    //  const interval = setInterval(fetchWorkflowJobs, 5000);

    //  return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 w-full">
      {workflowJobs.find((obj) => obj.name === stage) && (
        <table className="border-collapse w-full text-black border">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="px-4 py-2 border">
                {workflowJobs.find((obj) => obj.name === stage).name}
              </th>
              <th className="px-4 py-2 border" colSpan="3">
                Dev
              </th>
              <th className="px-4 py-2 border">Pre-Prod</th>
              <th className="px-4 py-2 border">Prod</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="px-4 py-2 cursor-pointer font-semibold border"
                onClick={() => {
                  const jobsElement = document.getElementById(`jobs-${stage}`);
                  if (jobsElement) {
                    jobsElement.classList.toggle("hidden");
                  }
                }}
              >
                Pipeline Jobs
              </td>
              
            </tr>
            <tr id={`jobs-${stage}`} className="pl-6 mt-2 hidden border">
              <td colSpan="1">
                {Object.entries(
                  workflowJobs.find((obj) => obj.name === stage)
                ).map(
                  ([key, value]) =>
                    key === "steps" &&
                    Array.isArray(value) &&
                    value.map((step, index) => (
                      <div key={index} className="text-black border">
                        {step.name}
                      </div>
                    ))
                )}
              </td>
              <td>s</td>
              <td>s</td>

            </tr>
            {/* {Object.entries(dashboard[stage]).map(([key, value]) => ( */}

            {Object.entries(dashboard["planning"]).map(([key, value]) => (
                <tr className="border">{value.description}</tr>
              ))}
            <tr>

            </tr>
            {/* Add more rows of data here */}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkflowStatus;
