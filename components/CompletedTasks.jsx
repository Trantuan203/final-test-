import { List, Checkbox, Button } from 'antd';

function CompletedTasks({ tasks, toggleTask, deleteTask, deleteAllCompleted }) {
  const completedTasks = tasks.filter((task) => !task.active);

  return (
    <>
      <List
        dataSource={completedTasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => deleteTask(task.id)}
              >
                Xóa
              </Button>,
            ]}
          >
            <Checkbox
              checked={!task.active}
              onChange={() => toggleTask(task.id)}
            >
              <span style={{ textDecoration: 'line-through' }}>{task.text}</span>
            </Checkbox>
          </List.Item>
        )}
      />
      {completedTasks.length > 0 && (
        <Button
          type="dashed"
          danger
          onClick={deleteAllCompleted}
          style={{ marginTop: 16, width: '100%' }}
        >
          Xóa tất cả completed
        </Button>
      )}
    </>
  );
}

export default CompletedTasks;