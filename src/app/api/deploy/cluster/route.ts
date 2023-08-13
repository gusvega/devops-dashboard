import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

export async function GET() {
  const namespace = 'default';
  const apiServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL
  const accessToken = process.env.NEXT_PUBLIC_AZURE_ACCESS_TOKEN

  // Build the URL for the Kubernetes API endpoint
  const apiUrl = `${apiServerUrl}/api/v1/namespaces/${namespace}/pods`;

  // Configure Axios with headers
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`, 
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // Disable SSL validation
    }),
  });

  // Make the API request using Axios
   // Make the API request using Axios
   try {
    const response = await axiosInstance.get('');

    if (response.status === 200) {
      const podStatuses = response.data.items.map(pod => {
        return {
          name: pod.metadata.name,
          status: pod.status.phase,
        };
      });

      return new NextResponse(JSON.stringify(podStatuses), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Error fetching pod statuses:', response.statusText);
      return new NextResponse('Error fetching pod statuses', { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}