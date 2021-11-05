require('dotenv/config')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const multerAzure = require('multer-azure')

const storageTypes = {
    local: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', 'tmp', 'avatar'))
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err)
          const filename = `${hash.toString('hex')}-avatarProfile`
          cb(null, filename)
        })
      },
    }),
    azure: multerAzure({
      connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
      account: process.env.AZURE_STORAGE_ACCOUNT,
      key: process.env.AZURE_STORAGE_ACCESS_KEY, //A key listed under Access keys in the storage account pane
      container: 'avatar',
      blobPathResolver: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err)
          const type = JSON.stringify(file.mimetype).split('/')[1].split('\"')[0]
          const filename = `${hash.toString('hex')}-avatarProfile.${type}`
          cb(null, filename)
        })
      },
    })
}

module.exports = {
  dest: path.resolve(__dirname, '..', 'tmp', 'avatar'),
  storage: storageTypes['azure'],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowdMimes = [
      'image/jpeg',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/jfif'
    ]

    if (allowdMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Formato inválido'))
    }
  }
}