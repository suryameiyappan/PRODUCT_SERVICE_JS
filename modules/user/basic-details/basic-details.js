const 
  fs = require('fs'),
  path = require('path'),
  { SUCCESS } = require("../../../constants/error.constant"),
  userRepository = require("../../../repositories/user.repositories"),
  { SUCCESS_MSG } = require("../../../constants/error-message.constant");
  

class BasicDetails {
  /*
  |------------------------------------------
  | Constructor
  |------------------------------------------
  */
  constructor() {
    this.rootDir = path.resolve(__dirname, '../../../');
    this.uploadsPath = path.join(this.rootDir, 'public');
  }
  /*
  |------------------------------------------
  | Function to get organization
  |------------------------------------------
  */
  async profileUpload(request, response, next) {
    try {
      if (!request.file) {
        return response.status(400).send('No file uploaded.');
      }
      const folderPath = path.join(this.uploadsPath, 'uploads', 'user', 'profile', request.user.user_id.toString());
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
          next(new Error('Failed to create directory.'));
        }
        const filePath = path.join(folderPath, request.file.originalname);
        fs.writeFile(filePath, request.file.buffer, (err) => {
          if (err) {
            next(new Error('Failed to save file.'));
          }
          return response.json({ 
            code: SUCCESS, 
            message: "Uploaded the file successfully", 
            data: []
          });
        });
      });
    } catch (err) {
      next(new Error(`BasicDetails : profileUpload Method : ${error}`));
    }
  }
  /*
  |------------------------------------------
  | Function to get user details
  |------------------------------------------
  */
  async getUserDetails(request, response, next) {
    userRepository.getUser(request.user.user_id).then(async (data) => {
      return response.json({ 
        code: SUCCESS,
        message: SUCCESS_MSG, 
        data: {
          profile_data: await this.getUserImage(request),
          ...data
        }
      });
    }).catch((error) => {
      next(new Error(`BasicDetails : getUserDetails Method : ${error}`));
    });
  }
  /*
  |------------------------------------------
  | Function to get user image
  |------------------------------------------
  */
  async getUserImage(request) {
    try {
      const folderPath = path.join(this.uploadsPath, 'uploads', 'user', 'profile', request.user.user_id.toString());
      const files = await fs.promises.readdir(folderPath);
      return { user_id: request.user.user_id, url: files.length > 0 ? files[0] : '' };
    } catch (err) {
      console.error('Error reading directory:', err);
      return { url: '' };
    }
  }
}
module.exports = BasicDetails;