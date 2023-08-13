import { useState, useEffect } from "react";

// interface WorkflowJob {
//   stage: {
//     name: string;
//   };
// }

const WorkflowStatus = ({ stage }) => {

  interface Commit {
    sha: string; // Add other properties as needed
  }

  const [workflowJobs, setWorkflowJobs] = useState([]);
const [commits, setCommits] = useState<Commit[]>([])

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

  const fetchCommits = async () => {
    try {
      const response = await fetch("/api/code/commits"); // Replace with your API endpoint
      const data = await response.json();
      setCommits(data);
      console.log(commits);
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
    code: {
      numberOfCommits: {
        description: "Number of commits made.",
        environment: {
          dev: 75,
          preprod: 60,
          prod: 100,
        },
      },
      recentPullRequests: {
        description: "Recent pull requests.",
        environment: {
          dev: ["Pull Request 1", "Pull Request 2"],
          preprod: ["Pull Request 3"],
          prod: [],
        },
      },
      recentCodeChanges: {
        description: "List of recent code changes.",
        environment: {
          dev: ["Change 1", "Change 2"],
          preprod: ["Change 3"],
          prod: [],
        },
      },
      numberOfMergedPullRequests: {
        description: "Number of merged pull requests.",
        environment: {
          dev: 10,
          preprod: 5,
          prod: 15,
        },
      },
      successfulCodeIntegration: {
        description: "Successful code integration status.",
        environment: {
          dev: true,
          preprod: true,
          prod: true,
        },
      },
    },
    build: {
      buildSuccessRateFailures: {
        description: "Build success rate and failures.",
        environment: {
          dev: {
            successRate: "95%",
            failures: 2,
          },
          preprod: {
            successRate: "92%",
            failures: 5,
          },
          prod: {
            successRate: "98%",
            failures: 1,
          },
        },
      },
      buildDurationTrends: {
        description: "Build duration and trends.",
        environment: {
          dev: {
            averageDuration: "5 minutes",
            trend: "Stable",
          },
          preprod: {
            averageDuration: "7 minutes",
            trend: "Increasing",
          },
          prod: {
            averageDuration: "4 minutes",
            trend: "Decreasing",
          },
        },
      },
      listArtifactsGenerated: {
        description: "List of artifacts generated.",
        environment: {
          dev: ["Artifact 1", "Artifact 2"],
          preprod: ["Artifact 3"],
          prod: [],
        },
      },
      recentBuildsWithStatus: {
        description: "Recent builds with status.",
        environment: {
          dev: [
            { buildNumber: 101, status: "Success" },
            { buildNumber: 102, status: "Failure" },
          ],
          preprod: [{ buildNumber: 103, status: "Success" }],
          prod: [],
        },
      },
      deploymentReadinessStatus: {
        description: "Deployment readiness status.",
        environment: {
          dev: "Ready",
          preprod: "Not Ready",
          prod: "Ready",
        },
      },
      recentSuccessfulBuilds: {
        description: "Recent successful builds.",
        environment: {
          dev: ["Build 101", "Build 103"],
          preprod: ["Build 105"],
          prod: [],
        },
      },
    },
    test: {
      testPassFailRatio: {
        description: "Test pass/fail ratio.",
        environment: {
          dev: {
            passRatio: "90%",
            failRatio: "10%",
          },
          preprod: {
            passRatio: "85%",
            failRatio: "15%",
          },
          prod: {
            passRatio: "95%",
            failRatio: "5%",
          },
        },
      },
      topFailingTests: {
        description: "Top failing tests.",
        environment: {
          dev: [
            { testName: "Test A", failures: 3 },
            { testName: "Test B", failures: 2 },
          ],
          preprod: [{ testName: "Test C", failures: 4 }],
          prod: [],
        },
      },
      testCoverageMetrics: {
        description: "Test coverage metrics.",
        environment: {
          dev: "75%",
          preprod: "70%",
          prod: "80%",
        },
      },
      recentTestExecutionDetails: {
        description: "Recent test execution details.",
        environment: {
          dev: [
            { testName: "Test A", status: "Passed" },
            { testName: "Test B", status: "Failed" },
          ],
          preprod: [{ testName: "Test C", status: "Passed" }],
          prod: [],
        },
      },
      summaryTestResults: {
        description: "Summary of test results.",
        environment: {
          dev: "Tests executed successfully.",
          preprod: "Some tests failed.",
          prod: "All tests passed.",
        },
      },
      successfulTestPassRate: {
        description: "Successful test pass rate.",
        environment: {
          dev: "90%",
          preprod: "85%",
          prod: "95%",
        },
      },
    },
    release: {
      numberOfReleases: {
        description: "Number of releases.",
        environment: {
          dev: 5,
          preprod: 3,
          prod: 10,
        },
      },
      recentReleasesVersionDetails: {
        description: "Recent releases with version details.",
        environment: {
          dev: [
            { version: "1.0", date: "2023-08-01" },
            { version: "1.1", date: "2023-08-10" },
          ],
          preprod: [{ version: "1.2", date: "2023-08-15" }],
          prod: [
            { version: "1.0", date: "2023-08-01" },
            { version: "1.1", date: "2023-08-10" },
            { version: "1.2", date: "2023-08-15" },
          ],
        },
      },
      changelogsReleaseNotes: {
        description: "Changelogs or release notes.",
        environment: {
          dev: "No significant changes.",
          preprod: "Bug fixes and optimizations.",
          prod: "New features and improvements.",
        },
      },
      environmentSpecificDeploymentStatus: {
        description: "Environment-specific deployment status.",
        environment: {
          dev: "Deployed and running.",
          preprod: "In progress.",
          prod: "Stable and operational.",
        },
      },
      summaryRecentReleases: {
        description: "Summary of recent releases.",
        environment: {
          dev: "Multiple releases with minor changes.",
          preprod: "Steady release cycle.",
          prod: "Major feature release.",
        },
      },
      successfulDeploymentStatus: {
        description: "Successful deployment status.",
        environment: {
          dev: "Deployments successful.",
          preprod: "Deployments in progress.",
          prod: "All deployments successful.",
        },
      },
    },
    deploy: {
      deploymentFrequency: {
        description: "Deployment frequency.",
        environment: {
          dev: "Multiple deployments per day.",
          preprod: "Frequent deployments.",
          prod: "Scheduled deployments.",
        },
      },
      deploymentHistoryTrends: {
        description: "Deployment history and trends.",
        environment: {
          dev: [
            { date: "2023-08-01", count: 5 },
            { date: "2023-08-02", count: 8 },
          ],
          preprod: [
            { date: "2023-08-01", count: 3 },
            { date: "2023-08-02", count: 6 },
          ],
          prod: [
            { date: "2023-08-01", count: 2 },
            { date: "2023-08-02", count: 4 },
          ],
        },
      },
      environmentHealthStatus: {
        description: "Environment health status.",
        environment: {
          dev: "Healthy and operational.",
          preprod: "Monitoring and optimizations.",
          prod: "Stable and well-maintained.",
        },
      },
      recentDeploymentsDetails: {
        description: "Recent deployments with details.",
        environment: {
          dev: [
            { version: "1.0", date: "2023-08-01", status: "Successful" },
            { version: "1.1", date: "2023-08-05", status: "Failed" },
          ],
          preprod: [
            { version: "1.2", date: "2023-08-10", status: "Successful" },
            { version: "1.3", date: "2023-08-15", status: "Successful" },
          ],
          prod: [
            { version: "1.0", date: "2023-08-01", status: "Successful" },
            { version: "1.1", date: "2023-08-10", status: "Successful" },
          ],
        },
      },
      summaryDeploymentActivities: {
        description: "Summary of deployment activities.",
        environment: {
          dev: "Multiple deployments for feature testing.",
          preprod: "Staging environment for final testing.",
          prod: "Regular maintenance and updates.",
        },
      },
      stableEnvironmentStatus: {
        description: "Stable environment status.",
        environment: {
          dev: "Stable for testing purposes.",
          preprod: "Stable and ready for QA.",
          prod: "Production environment stable.",
        },
      },
    },
    operate: {
      incidentsErrorsCount: {
        description: "Incidents or errors count.",
        environment: {
          dev: "Low incident count.",
          preprod: "Minimal errors reported.",
          prod: "Rare incidents and errors.",
        },
      },
      systemPerformanceMetrics: {
        description:
          "System performance metrics (e.g., response time, latency).",
        environment: {
          dev: "Optimal performance for testing.",
          preprod: "Monitoring system metrics.",
          prod: "Stable and responsive performance.",
        },
      },
      recentOperationalIncidents: {
        description: "Recent operational incidents.",
        environment: {
          dev: [
            { id: 123, description: "Service outage", date: "2023-08-01" },
            {
              id: 124,
              description: "Degraded performance",
              date: "2023-08-03",
            },
          ],
          preprod: [
            { id: 125, description: "Database failure", date: "2023-08-05" },
            { id: 126, description: "API errors", date: "2023-08-08" },
          ],
          prod: [
            { id: 127, description: "Service disruption", date: "2023-08-02" },
            { id: 128, description: "Application crash", date: "2023-08-06" },
          ],
        },
      },
      activeAlertsMonitoringStatus: {
        description: "Active alerts and monitoring status.",
        environment: {
          dev: "Monitoring for critical alerts.",
          preprod: "Proactive alerting for anomalies.",
          prod: "Constant monitoring and alerting.",
        },
      },
      incidentResolutionStatus: {
        description: "Incident resolution status.",
        environment: {
          dev: "Incidents resolved promptly.",
          preprod: "Timely incident response.",
          prod: "Swift incident resolution.",
        },
      },
      stableOperationalState: {
        description: "Stable operational state.",
        environment: {
          dev: "Operational for testing purposes.",
          preprod: "Operational for final testing.",
          prod: "Stable and reliable operation.",
        },
      },
    },
    monitor: {
      realTimeSystemMetrics: {
        description: "Real-time system metrics (e.g., CPU, memory, network).",
        environment: {
          dev: "Monitoring system performance in real-time.",
          preprod: "Real-time system metrics during testing.",
          prod: "Continuous monitoring of live metrics.",
        },
      },
      uptimeDowntimeTrends: {
        description: "Uptime and downtime trends.",
        environment: {
          dev: "Tracking uptime and downtime during development.",
          preprod: "Uptime and downtime trends in pre-production.",
          prod: "Monitoring system availability in production.",
        },
      },
      usagePatternsUserActivity: {
        description: "Usage patterns and user activity.",
        environment: {
          dev: "Monitoring usage patterns in development.",
          preprod: "User activity analysis during testing.",
          prod: "Real-time user behavior monitoring.",
        },
      },
      capacityUtilization: {
        description: "Capacity utilization.",
        environment: {
          dev: "Resource utilization during development.",
          preprod: "Capacity utilization during testing.",
          prod: "Optimal capacity utilization in production.",
        },
      },
      overallSystemHealthScore: {
        description: "Overall system health score.",
        environment: {
          dev: "Health score evaluation during development.",
          preprod: "System health assessment during testing.",
          prod: "Monitoring and maintaining system health.",
        },
      },
      historicalPerformanceTrends: {
        description: "Historical performance trends.",
        environment: {
          dev: "Recording historical metrics during development.",
          preprod: "Performance trend analysis during testing.",
          prod: "Historical performance data for production.",
        },
      },
    },
  };

  useEffect(() => {
    fetchWorkflowJobs();
    fetchCommits();
    //  const interval = setInterval(fetchWorkflowJobs, 5000);

    //  return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 w-full">
      {workflowJobs.find((obj) => obj["name"] === stage) && (
        <table className="border-collapse w-full text-black border text-xs">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="px-4 py-2 border">
                {Object.entries(
                  workflowJobs.find((obj) => obj["name"] === stage) || {}
                ).map(
                  ([key, value]) =>
                    key === "name" && <div key={key}>{value as string}</div>
                )}
              </th>
              <th className="px-4 py-2 border">Dev</th>
              <th className="px-4 py-2 border">Pre-Prod</th>
              <th className="px-4 py-2 border">Prod</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "30%", whiteSpace: "nowrap" }}>
                Pipeline Jobs
              </td>
              {/* Add your pipeline job steps here */}
              <td>
                {Object.entries(
                  workflowJobs.find((obj) => obj["name"] === stage) || {}
                ).map(
                  ([key, value]) =>
                    key === "steps" &&
                    Array.isArray(value) &&
                    value.map((step, index) => (
                      <td key={index} className="text-black border">
                        <div className="flex justify-center items-center mr-2">
                          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold w-6 h-6 rounded-full flex items-center justify-center mr-2">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </button>
                          {step.name}
                        </div>
                      </td>
                    ))
                )}
              </td>
              <td>s</td>
              <td>s</td>
            </tr>
            <tr id={`jobs-${stage}`} className="pl-6 mt-2 hidden border">
              <td style={{ width: "1%", whiteSpace: "nowrap" }}>
                {Object.entries(
                  workflowJobs.find((obj) => obj["name"] === stage) || {}
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
            </tr>
            {/* Add your dashboard rows hereh */}
            {Object.entries(dashboard[stage]).map(([key, value]) => (
              <tr key={key} className="border">
                <td>{(value as any).description}</td>
                <td>
                  <td>
                    {stage == "code" && key === 'numberOfCommits' ? (
                      <td className="flex">
                        <td>{commits.length}</td>
                        <td className="flex">{commits.length > 3 ? commits.slice(0, 3).map(commit => <div><div className="ml-3">{commit['sha'].substring(0, 6)}</div></div>) : commits.length}</td>
                      </td>
                    ) : (
                      ""
                    )}
                  </td>
                </td>
                <td>Pre-Prod data</td>
                <td>Prod data</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkflowStatus;
