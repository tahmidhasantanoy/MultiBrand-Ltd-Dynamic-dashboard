import React from "react";
import { useGetUsersInfoQuery } from "../../Redux/api/manageUsersApi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis as BarXAxis,
  YAxis as BarYAxis,
  CartesianGrid as BarGrid,
  Tooltip as BarTooltip,
} from "recharts";

const DashboardHome = () => {
  const { data, isLoading, isError } = useGetUsersInfoQuery();
  const users = data?.data;

  if (isLoading || isError) return <p>Loading ...</p>;

  const statusCount = {};

  for (let i = 0; i < users.length; i++) {
    const status = users[i].status;
    if (statusCount[status] === undefined) {
      statusCount[status] = 1;
    } else {
      statusCount[status] = statusCount[status] + 1;
    }
  }

  const statusDataArr = [];

  for (const key in statusCount) {
    statusDataArr.push({
      status: key,
      value: statusCount[key],
    });
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const barData = months.map((month) => ({
    month,
    count: 0,
  }));

  users.forEach((user) => {
    if (user.dob) {
      const date = new Date(user.dob);
      const monthIndex = date.getMonth();
      barData[monthIndex].count += 1;
    }
  });

  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const counts = {};

  users.forEach((user) => {
    const dobMonth = getMonthYear(user.dob);
    const createdMonth = getMonthYear(user.createdAt);
    if (!counts[dobMonth]) {
      counts[dobMonth] = { month: dobMonth, dob: 0, created: 0 };
    }
    if (!counts[createdMonth]) {
      counts[createdMonth] = { month: createdMonth, dob: 0, created: 0 };
    }
    counts[dobMonth].dob += 1;
    counts[createdMonth].created += 1;
  });

  const dobCreatedData = Object.values(counts).sort(
    (a, b) => new Date(a.month) - new Date(b.month)
  );

  return (
    <div className="bg-gray-200 min-h-screen p-4 sm:p-6 md:p-10 lg:p-16 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-12">
        User Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col items-center bg-white rounded-lg p-6 sm:p-8">
          <PieChart width={200} height={200}>
            <Pie
              data={statusDataArr}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              nameKey="status"
            >
              {statusDataArr.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? "#4ca736"
                      : index === 1
                      ? "#d11600"
                      : "#f2b700"
                  }
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="flex items-center justify-center space-x-3 mt-4">
            <div className="flex items-center">
              <span className="bg-green-500 h-3 w-3 rounded-full mr-2"></span>
              <p>Active</p>
            </div>
            <div className="flex items-center">
              <span className="bg-yellow-500 h-3 w-3 rounded-full mr-2"></span>
              <p>Inactive</p>
            </div>
            <div className="flex items-center">
              <span className="bg-red-500 h-3 w-3 rounded-full mr-2"></span>
              <p>Failed</p>
            </div>
          </div>
          <figcaption className="text-center mt-2 text-lg">
            User Status Distribution (Active vs Failed vs Inactive)
          </figcaption>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg p-6 sm:p-8">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <BarXAxis dataKey="month" />
              <BarYAxis />
              <Bar dataKey="count" fill="#e2cd00" />
              <BarGrid strokeDasharray="3 3" />
              <BarTooltip />
            </BarChart>
          </ResponsiveContainer>
          <figcaption className="text-center mt-2 text-lg">
            Number of Users by Birth Month
          </figcaption>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white rounded-lg mt-8 p-6 sm:p-8">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Users by DOB vs Account Creation (Monthly)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dobCreatedData}>
            <defs>
              <linearGradient id="dobColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#43bc3f" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#43bc3f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="createdColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff794f" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff794f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="dob"
              stroke="#34d399"
              fill="url(#dobColor)"
              name="DOB Count"
            />
            <Area
              type="monotone"
              dataKey="created"
              stroke="#43bc3f"
              fill="url(#createdColor)"
              name="Created Count"
            />
          </AreaChart>
        </ResponsiveContainer>
        <figcaption className="text-center mt-4 text-lg text-gray-700">
          Monthly Comparison of Users by DOB and Account Creation
        </figcaption>
      </div>

      <div className="bg-white rounded-lg mt-10 p-6 overflow-auto max-h-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          User Index Table
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full table-auto text-sm text-left border">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3">Serial</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Authority</th>
                <th className="p-3">DOB</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.userEmail}</td>
                  <td className="p-3">{user.authority}</td>
                  <td className="p-3">{user.dob}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3 capitalize">{user.status}</td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {new Date(user.updatedAt).toLocaleString() ===
                    "Invalid Date"
                      ? "N/A"
                      : new Date(user.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
