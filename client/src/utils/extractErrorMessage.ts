export default function extractErrorMessage(error: unknown): string | null {
	if (typeof error === "object" && error !== null && "data" in error) {
		const errorData = (error as { data: any }).data;

		if ("detail" in errorData && typeof errorData.detail === "string") {
			return errorData.detail;
		}

		const messages: string[] = [];

		Object.keys(errorData).forEach((key) => {
			if (key !== "status_code") {
				const fieldError = errorData[key];
				if (Array.isArray(fieldError)) {
					messages.push(...fieldError);
				} else if (typeof fieldError === "object" && fieldError !== null) {
					Object.values(fieldError).forEach((errorMessages: any) => {
						if (Array.isArray(errorMessages)) {
							messages.push(...errorMessages);
						}
					});
				}
			}
		});
		return messages.length > 0 ? messages.join(", ") : null;
	}
	return null;
}


// import axios from "axios";


// export default function extractErrorMessage(error: unknown): string | null {
// 	if (axios.isAxiosError(error)) {
// 		const data = error.response?.data;

// 		// HTML response instead of JSON
// 		if (typeof data === "string" && data.trim().startsWith("<")) {
// 			return "Server responded with an unexpected error page.";
// 		}

// 		if (typeof data === "object" && data !== null) {
// 			if ("detail" in data && typeof data.detail === "string") {
// 				return data.detail;
// 			}

// 			const messages: string[] = [];

// 			Object.entries(data).forEach(([key, value]) => {
// 				if (Array.isArray(value)) {
// 					messages.push(...value);
// 				} else if (typeof value === "string") {
// 					messages.push(value);
// 				}
// 			});

// 			if (messages.length > 0) return messages.join(", ");
// 		}
// 	}

// 	return "An unexpected error occurred.";
// };
