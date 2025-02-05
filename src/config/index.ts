const { GATEWAY_HOST, UPLOAD_DIRECTORY_PATH } = process.env

const GATEWAY_ENDPOINT = `${GATEWAY_HOST || 'http://localhost:8080'}/graphql`
const UPLOAD_DIRECTORY_URL = new URL(UPLOAD_DIRECTORY_PATH || '../uploads/', import.meta.url)

export {
  GATEWAY_ENDPOINT,
  UPLOAD_DIRECTORY_URL,
}
