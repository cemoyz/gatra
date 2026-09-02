import contactHandler from './contact'

export default async function handler(req, res) {
  return contactHandler(req, res)
}
