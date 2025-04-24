const APIDomain =
  process.env.REACT_APP_API_DOMAIN ||
  'https://64351490537112453fcd07e0.mockapi.io/api/v1'

const laneURL = `${APIDomain}/lane`
// const datatableURL = `${APIDomain}/datatable`;

export { APIDomain, laneURL }
