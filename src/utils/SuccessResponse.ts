const Success = (success: boolean, data: any, message: string): SuccessResponse => {
    return {
        success,
        data,
        message,
    };
};

export default Success;
