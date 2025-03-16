import { List, Checkbox } from 'antd';

function AllTasks({ tasks, toggleTask }) {
  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <Checkbox
            checked={!task.active}
            onChange={() => toggleTask(task.id)}
          >
            <span style={{ textDecoration: !task.active ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </Checkbox>
        </List.Item>
      )}
    />
  );
}

export default AllTasks;