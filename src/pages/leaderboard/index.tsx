import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { getLeaderBoard } from "../../api/leaderboard";
import { Loader } from "../../components/ui/loader";

export default function LeaderBoard() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["leader-board"],
    queryFn: getLeaderBoard,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Fragment>
      <div className="w-full max-w-2xl mx-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.leaderboard?.map((user) => (
              <tr key={user.githubUsername} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={`${user.githubUsername}'s avatar`} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.githubUsername}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                    View Profile
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
