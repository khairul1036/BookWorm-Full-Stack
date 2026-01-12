const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { UPLOADER_API } = require("./env");

const uploadFile = async (filePath) => {
    try {
        const form = new FormData();
        form.append("file", fs.createReadStream(filePath));

        const response = await axios.post(UPLOADER_API, form, {
            headers: form.getHeaders(),
        });

        if (!response.data.success) throw new Error("File upload failed");

        return response.data;
    } catch (err) {
        throw err;
    }
};

const deleteFile = async (fileId) => {
    try {
        const response = await axios.delete(UPLOADER_API, {
            data: { id: fileId },
        });

        if (!response.data.success) throw new Error("File deletion failed");

        return response.data.message;
    } catch (err) {
        throw err;
    }
};

module.exports = { uploadFile, deleteFile };
