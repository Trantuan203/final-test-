import { useState, useEffect } from 'react';
import { Tabs, Input, Form, Button } from 'antd';
import AllTasks from '../components/AllTasks';
import ActiveTasks from '../components/ActiveTasks';
import CompletedTasks from '../components/CompletedTasks';

function TodoApp() {
  // Khôi phục tasks từ localStorage hoặc dùng dữ liệu mẫu nếu chưa có
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, text: 'Học React', active: true },
          { id: 2, text: 'Hoàn thành bài kiểm tra', active: false },
        ];
  });
  const [currentTab, setCurrentTab] = useState('all');
  const [form] = Form.useForm();

  // Lưu tasks vào localStorage mỗi khi tasks thay đổi
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (values) => {
    const newTask = values.task;
    if (!newTask?.trim()) return;
    const task = { id: Date.now(), text: newTask, active: true };
    setTasks([...tasks, task]);
    form.resetFields();
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, active: !task.active } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteAllCompleted = () => {
    setTasks(tasks.filter((task) => task.active));
  };

  const tabItems = [
    { key: 'all', label: 'All', children: <AllTasks tasks={tasks} toggleTask={toggleTask} /> },
    { key: 'active', label: 'Active', children: <ActiveTasks tasks={tasks} toggleTask={toggleTask} /> },
    {
      key: 'completed',
      label: 'Completed',
      children: (
        <CompletedTasks
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          deleteAllCompleted={deleteAllCompleted}
        />
      ),
    },
  ];

  return (
    <div className="todo-app">
      <h1>#todo</h1>
      {(currentTab === 'all' || currentTab === 'active') && (
        <Form form={form} onFinish={handleAddTask}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Form.Item name="task" style={{ flex: 1, margin: 0 }}>
              <Input placeholder="What needs to be done?" autoComplete="off" />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button type="primary" htmlType="submit">
                add
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
      <Tabs activeKey={currentTab} onChange={setCurrentTab} items={tabItems} style={{ marginTop: 20 }} />
    </div>
  );
}

export default TodoApp;