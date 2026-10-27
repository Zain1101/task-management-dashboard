
import { Component } from "react";
import CardWrapper from "../functional/CardWrapper";

class ActivityLogger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      notification: "",
    };

    this.notificationTimer = null;
  }

  // Runs when component first mounts
  componentDidMount() {
    try {
      const savedLogs = JSON.parse(
        localStorage.getItem("taskActivityLogs") || "[]"
      );

      if (Array.isArray(savedLogs)) {
        this.setState({ logs: savedLogs });
      }
    } catch (error) {
      console.error("Failed to load activity logs:", error);
    }
  }

  // Runs when props or state change
  componentDidUpdate(prevProps, prevState) {
    // Check if a new activity has arrived
    if (
      this.props.activity &&
      this.props.activity.id !== prevProps.activity?.id
    ) {
      this.setState((previousState) => ({
        logs: [
          this.props.activity,
          ...previousState.logs,
        ].slice(0, 30),
        notification: this.props.activity.message,
      }));

      return;
    }

    // Save updated logs to localStorage
    if (prevState.logs !== this.state.logs) {
      try {
        localStorage.setItem(
          "taskActivityLogs",
          JSON.stringify(this.state.logs)
        );
      } catch (error) {
        console.error("Failed to save activity logs:", error);
      }
    }

    // Show temporary notification
    if (
      prevState.notification !== this.state.notification &&
      this.state.notification
    ) {
      clearTimeout(this.notificationTimer);

      this.notificationTimer = setTimeout(() => {
        this.setState({ notification: "" });
      }, 3000);
    }
  }

  // Runs before component is removed
  componentWillUnmount() {
    clearTimeout(this.notificationTimer);
  }

  render() {
    const { logs, notification } = this.state;

    return (
      <CardWrapper className="activity-panel">
        <h2>Activity Log</h2>

        {notification && (
          <div className="activity-toast" role="status">
            {notification}
          </div>
        )}

        {logs.length === 0 ? (
          <p className="empty-message">
            No activities recorded yet.
          </p>
        ) : (
          <div className="activity-list">
            {logs.map((log) => (
              <div className="activity-item" key={log.id}>
                <p>{log.message}</p>
                <span>{log.time}</span>
              </div>
            ))}
          </div>
        )}
      </CardWrapper>
    );
  }
}

export default ActivityLogger;
