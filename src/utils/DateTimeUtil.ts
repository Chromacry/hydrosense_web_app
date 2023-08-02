import moment from "moment";

export const convertToLocaleDate = (date: string) => {
    let dateFormat = null;
    if (date) {
        dateFormat = moment(date).format("YYYY-MM-DD");
    }
    return dateFormat;
}

export const convertToLocaleDateTime = (date: string) => {
  let dateFormat = null;
  if (date) {
      dateFormat = moment(date).format("YYYY-MM-DD hh:mm:ss");
  }
  return dateFormat;
}

export const convertToReadableDateTime = (date: string) => {
  let dateFormat = null;
  if (date) {
      dateFormat = moment(date).format("DD MMM yyyy hh:mm:ss A");
  }
  return dateFormat;
}

export const convertToReadableDate = (date: string) => {
  let dateFormat = null;
  if (date) {
      dateFormat = moment(date).format("DD MMM yyyy");
  }
  return dateFormat;
}

export const convertToReadableTime = (date: string) => {
  let dateFormat = null;
  if (date) {
      dateFormat = moment(date).format("hh:mm:ss A");
  }
  return dateFormat;
}