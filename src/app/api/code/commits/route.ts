import { NextResponse } from 'next/server';

export async function GET() {
  const repoOwner = 'gusvega'; // Replace with your GitHub username or organization name
  const repoName = 'pipeline'; // Replace with your repository name

  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API}`,
    },
  });

  if (response.ok) {
    const repoData = await response.json();
    return NextResponse.json(repoData);
  } else {
    return new NextResponse('Error fetching repository data', { status: response.status });
  }
}