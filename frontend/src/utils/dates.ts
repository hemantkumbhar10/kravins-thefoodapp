


export const dateFormatter = (date: Date) => {

	const newISODate = new Date(date);

	const currentTime = new Date();
	const day = newISODate.toLocaleDateString('en-us', { weekday: 'long' }); //Monday
	const timeDifference = currentTime.getTime() - newISODate.getTime();
	const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
	const minutesAgo = Math.floor(timeDifference / (1000 * 60));
	const secondsAgo = Math.floor(timeDifference / 1000);

	const dateOptions = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};


	const dateNormalised = newISODate.toLocaleDateString('en-us', dateOptions);  //Jun 24, 2024




	let statusString = "";

	if (minutesAgo < 1) {
		statusString = `${secondsAgo} seconds ago`
	}
	else if (hoursAgo < 1) {
		statusString = `${minutesAgo} minutes ago`;
	}
	else if (hoursAgo < 24) {
		statusString = `${hoursAgo} hours ago`;

	}
	else {
		statusString = `${dateNormalised}`
	}



	return { statusString, day };






}






