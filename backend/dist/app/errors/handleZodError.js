const handleZodError = (error) => {
    return {
        statusCode: 400,
        message: "Validation Error",
        errorDetails: error.issues.map((issue) => {
            if (issue.code === "unrecognized_keys") {
                return {
                    field: issue.keys.join(", "),
                    message: "Field is not allowed.",
                };
            }
            return {
                field: issue.path.join("."),
                message: issue.message,
            };
        }),
    };
};
export default handleZodError;
