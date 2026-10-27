import CardWrapper from "./CardWrapper";

function MetricsSummary({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const metrics = [
    {
      id: 1,
      label: "Total Tasks",
      value: totalTasks,
      type: "total",
    },
    {
      id: 2,
      label: "Completed Tasks",
      value: completedTasks,
      type: "completed",
    },
    {
      id: 3,
      label: "Pending Tasks",
      value: pendingTasks,
      type: "pending",
    },
  ];

  return (
    <div className="metrics-container">
      {metrics.map((metric) => (
        <CardWrapper
          key={metric.id}
          className={`metric-card ${metric.type}`}
        >
          <p>{metric.label}</p>
          <h2>{metric.value}</h2>
        </CardWrapper>
      ))}
    </div>
  );
}

export default MetricsSummary;