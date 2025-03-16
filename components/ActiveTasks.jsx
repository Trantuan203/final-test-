import { List, Checkbox } from 'antd';

function ActiveTasks({ tasks, toggleTask }) {
  const activeTasks = tasks.filter((task) => task.active);

  return (
    <List
      dataSource={activeTasks}
      renderItem={(task) => (
        <List.Item>
          <Checkbox
            checked={!task.active}
            onChange={() => toggleTask(task.id)}
          >
            {task.text}
          </Checkbox>
        </List.Item>
      )}
    />
  );
}

export default ActiveTasks;