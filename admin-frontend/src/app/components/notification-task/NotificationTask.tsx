'use client';
import { useRouter } from 'next/navigation';
import { useState } from "react";

const NotificationTask = ({ upcomingTasks }: { upcomingTasks: any[] }) => {
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter(); // Sửa lại đoạn này

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
    };

    const handleTaskClick = (taskId: string) => {
        localStorage.setItem("selectedTaskId", taskId); // Lưu ID task vào localStorage
        router.push(`/List/taskemployee?taskId=${taskId}`); // Sử dụng router.push()
    };

    return (
        <div className="absolute top-4 right-4 cursor-pointer ">
            <div onClick={handleNotificationClick} className="relative pt-1  ">
                <img src="/notification-task.svg" alt="Notification" className="w-7 h-7" />
                {upcomingTasks.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                        {upcomingTasks.length}
                    </span>
                )}
            </div>
            {showNotification && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 ">Deadline</h3>
                        <ul>
                            {upcomingTasks.map((task) => (
                                <li
                                    key={task._id}
                                    className="mt-2 p-2 hover:bg-gray-100 rounded-lg"
                                    onClick={() => handleTaskClick(task._id)}
                                >
                                    <p className="font-medium">{task.taskName}</p>
                                    <p className="text-sm text-red-400">
                                        Hạn chót: {new Date(task.taskEnd).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationTask;