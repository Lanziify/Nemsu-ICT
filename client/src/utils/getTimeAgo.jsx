export default function getTimeAgo(createdAt) {
  // get the current date
  const currentTime = new Date(Date.now());
  //   convert firestore unix timestamp to milliseconds
  const createdDate = new Date(createdAt * 1000);
  const timeDifference = currentTime - createdDate;
  // conversions
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  // logic
  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return "now";
  }
}
