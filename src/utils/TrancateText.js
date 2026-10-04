const TrancateText = (text, charLimit = 120) => {
  if (text?.length > charLimit) {
    return text.slice(0, charLimit) + "...";
  }
};
export default TrancateText;
