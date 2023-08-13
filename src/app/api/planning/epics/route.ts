// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET() {
//   const orgName = 'gusvega'; // Replace with your Azure DevOps organization name
//   const project = 'pipeline'; // Replace with your Azure DevOps project name
//   const username = 'hola@gusvega.dev'; // Replace with your Azure DevOps username
//   const pat = process.env.NEXT_PUBLIC_AZURE_DEVOPS_PAT; // Replace with your Azure DevOps PAT

//   // Define the Azure DevOps API base URL
//   const baseUrl = `https://dev.azure.com/${orgName}/_apis/projects?api-version=6.1-preview.4`;

//   // Create a Basic Authentication token using username and PAT
//   const basicAuthToken = btoa(`${username}:${pat}`);

//   // Configure Axios with headers
//   const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     headers: {
//       Authorization: `Basic ${basicAuthToken}`, 
//     },
//   });

//   // Make the API request using Axios
//   try {
//     const response = await axiosInstance.get('');

//     if (response.status === 200) {
//       console.log('List of Projects:', response.data.value);
//     } else {
//       console.error('Error fetching projects:', response.statusText);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// import { NextResponse } from 'next/server';

// export async function GET() {
//   const repoOwner = 'gusvega'; // Replace with your GitHub username or organization name
//   const repoName = 'pipeline'; // Replace with your repository name

//   const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API}`,
//     },
//   });

//   if (response.ok) {
//     const repoData = await response.json();
//     return NextResponse.json(repoData);
//   } else {
//     return new NextResponse('Error fetching repository data', { status: response.status });
//   }
// }
