import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Execute shell command using a Promise to properly handle the async operation
	return new Promise(resolve => {
		exec("sh /usr/local/bin/sleep-screen-kiosk", (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing command: ${error.message}`);
				resolve(NextResponse.json({ error: "Failed to execute command" }, { status: 500 }));
				return;
			}
			if (stderr) {
				console.error(`Command stderr: ${stderr}`);
				resolve(NextResponse.json({ error: "Failed to execute command" }, { status: 500 }));
				return;
			}

			resolve(NextResponse.json({ message: "Command executed successfully", output: stdout }));
		});
	});
}
