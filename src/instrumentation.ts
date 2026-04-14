export async function register() {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		const { execSync } = await import('child_process');

		console.log('Preparing app...');
		const errors: string[] = [];

		//////////////////////////////////////////////////////
		// Verify environment variables
		const requiredEnvVars = ['RELAY_SERVER_IP'];
		for (const envVar of requiredEnvVars) {
			if (!process.env[envVar]) {
				errors.push(
					`Environment variable ${envVar} is not set`,
				);
			}
		}

		//////////////////////////////////////////////////////
		// Security audit
		try {
			execSync('npm audit', { stdio: 'ignore' });
		} catch {
			errors.push(
				'npm audit returned with errors. Please fix the vulnerabilities before running the app.',
			);
		}

		//////////////////////////////////////////////////////
		// Finalize
		if (errors.length > 0) {
			console.error(
				`Preparation completed with ${errors.length} error(s). Please fix the following issues before trying again:`,
			);
			errors.forEach((error) => console.error(error));
			process.exit(1);
		}

		console.log('App prepared with 0 errors.');
	}
}
