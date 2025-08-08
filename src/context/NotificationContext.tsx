"use client";

import { NotificationOverlay } from "@/components/overlays/notification";
import * as React from "react";
import { useState } from "react";

interface NotificationContextType {
	createNotification: (
		title: string,
		message: string,
		closeButtonText?: string,
		closeCallback?: () => void,
		customButtonText?: string,
		customButtonCallback?: () => void
	) => void;
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
	const context = React.useContext(NotificationContext);
	if (!context) {
		throw new Error("useNotification must be used within a NotificationProvider");
	}
	return context;
};

interface Props {
	children: React.ReactNode;
}

export const NotificationProvider: React.FC<Props> = ({ children }) => {
	const [notifications, setNotifications] = useState<
		Array<{
			id: string;
			title: string;
			message: string;
			closeButtonText?: string;
			closeCallback?: () => void;
			customButtonText?: string;
			customButtonCallback?: () => void;
		}>
	>([]);

	const createNotification = (
		title: string,
		message: string,
		closeButtonText?: string,
		closeCallback?: () => void,
		customButtonText?: string,
		customButtonCallback?: () => void
	) => {
		const id = crypto.randomUUID();
		const newNotification = {
			id,
			title,
			message,
			closeButtonText,
			closeCallback,
			customButtonText,
			customButtonCallback,
		};
		setNotifications(prev => [...prev, newNotification]);
	};

	const removeNotification = (id: string) => {
		setNotifications(prev => prev.filter(notification => notification.id !== id));
	};

	return (
		<NotificationContext.Provider value={{ createNotification }}>
			{children}
			{notifications.length > 0 && (
				<NotificationOverlay
					key={notifications[0].id}
					title={notifications[0].title}
					message={notifications[0].message}
					closeButtonText={notifications[0].closeButtonText}
					customButtonText={notifications[0].customButtonText}
					closeCallback={() => {
						if (notifications[0].closeCallback) notifications[0].closeCallback();
						removeNotification(notifications[0].id);
					}}
					customButtonCallback={() => {
						if (notifications[0].customButtonCallback)
							notifications[0].customButtonCallback();
						removeNotification(notifications[0].id);
					}}
				/>
			)}
		</NotificationContext.Provider>
	);
};
