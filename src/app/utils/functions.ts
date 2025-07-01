export const handlePriorityColor = (arg: string) =>{
    let priorityColor =  '';

    switch(arg){
        case 'high':
            priorityColor = 'text-red-500';
        break;
        case 'moderate':
            priorityColor = 'text-blue-300';
        break;
        case 'low':
            priorityColor = 'text-yellow-300';
        break;
        default:
            priorityColor = 'text-gray-500';
    }

    return priorityColor;
}

export const handleStatusColor = (arg: string) => {
    let statusColor =  '';

    switch(arg){
        case 'not started':
            statusColor = 'text-red-500';
        break;
        case 'in progress':
            statusColor = 'text-blue-600';
        break;
        case 'completed':
            statusColor = 'text-green-500';
        break;
        default:
            statusColor = 'text-gray-500';
    }

    return statusColor;

}