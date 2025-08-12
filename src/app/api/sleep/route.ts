import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Execute shell command no matter the
	exec("sh /usr/local/bin/sleep-screen-kiosk", (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing command: ${error.message}`);
			return NextResponse.json({ error: "Failed to execute command" }, { status: 500 });
		}
		if (stderr) {
			console.error(`Command stderr: ${stderr}`);
			return NextResponse.json({ error: "Failed to execute command" }, { status: 500 });
		}

		return NextResponse.json({ message: "Command executed successfully", output: stdout });
	});
}
